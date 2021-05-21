import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {View, StyleSheet, FlatList} from 'react-native';
import Header from 'src/components/Header';
import Text from 'src/components/Text';
import Icon from 'src/components/Icon';
import Search from 'src/containers/Search';
import ActivityIndicator from 'src/containers/ActivityIndicator';
import ShimmerLoading from 'src/containers/ShimmerLoading';
import ItemOrder from './order/ItemOrder';
import ShimmerItemOrder, {height} from './order/ShimmerItemOrder';
import FilterOrder from './order/FilterOrder';

import {AuthContext} from 'src/utils/auth-context';
import {showMessage} from 'src/utils/message';

import services from 'src/services/index';

class Order extends React.Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      page: 1,
      search: '',
      loading: true,
      loadingMore: false,
      refreshing: false,
      visitModal: false,
      type: 'any',
    };
  }

  componentDidMount() {
    this.fetchOrders();
  }

  fetchOrders = async () => {
    try {
      const {page, search, type} = this.state;
      const query = {
        page,
        per_page: 5,
        search,
        status: type,
      };
      const userToken = this?.context?.userToken ?? '';
      const data = await services.getOrders(query, userToken);

      if (data.length <= 5 && data.length > 0) {
        this.setState((prevState) => ({
          orders:
            page === 1 ? Array.from(data) : [...prevState.orders, ...data],
          loading: false,
          loadingMore: data.length === 5,
          refreshing: false,
        }));
      } else {
        this.setState({
          loadingMore: false,
          loading: false,
          refreshing: false,
        });
      }
    } catch (e) {
      showMessage({
        message: 'Get data',
        description: e.message,
        type: 'danger',
      });
      this.setState({
        loading: false,
        loadingMore: false,
        refreshing: false,
      });
    }
  };
  renderFooter = () => {
    if (!this.state.loadingMore) {
      return <View style={styles.footerEmpty} />;
    }

    return (
      <View style={styles.footerLoading}>
        <ActivityIndicator animating size="small" />
      </View>
    );
  };

  handleRefresh = () => {
    this.setState(
      {
        page: 1,
        refreshing: true,
      },
      () => {
        this.fetchOrders();
      },
    );
  };

  handleLoadMore = () => {
    const {loadingMore} = this.state;

    if (loadingMore) {
      this.setState(
        (prevState) => ({
          page: prevState.page + 1,
          loadingMore: true,
        }),
        this.fetchOrders,
      );
    }
  };

  handleLoad = () => {
    this.setState(
      {
        orders: [],
        page: 1,
        loading: true,
        loadingMore: false,
        refreshing: false,
      },
      () => {
        this.fetchOrders();
      },
    );
  };
  setModalVisible = (value) => {
    this.setState({
      visitModal: value,
    });
  };
  handleFilter = (key, value) => {
    this.setState({[key]: value, visitModal: false}, this.handleLoad);
  };

  render() {
    const {t} = this.props;
    const {orders, search, loading, refreshing, visitModal, type} = this.state;

    const filters = [
      {
        name: t('order:text_all_order'),
        status: 'any',
      },
      {
        name: t('order:text_completed'),
        status: 'completed',
      },
      {
        name: t('order:text_pending'),
        status: 'pending',
      },
      {
        name: t('order:text_processing'),
        status: 'processing',
      },
      {
        name: t('order:text_on_hold'),
        status: 'on-hold',
      },
      {
        name: t('order:text_cancelled'),
        status: 'cancelled',
      },
      {
        name: t('order:text_refunded'),
        status: 'refunded',
      },
    ];

    return (
      <View style={styles.container}>
        <Header
          leftComponent={
            <Text h2 medium>
              {t('order:text_orders')}
            </Text>
          }
          rightComponent={
            <Icon
              name="tune"
              size={20}
              onPress={() => this.setModalVisible(true)}
            />
          }
          centerContainerStyle={styles.headerCenter}
          containerStyle={styles.header}
        />
        <Search
          containerStyle={styles.search}
          placeholder={t('order:text_search')}
          value={search}
          onChangeText={(value) => this.handleFilter('search', value)}
        />
        {loading ? (
          <ShimmerLoading
            style={styles.item}
            Component={ShimmerItemOrder}
            height={height}
          />
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            data={orders}
            renderItem={({item}) => (
              <ItemOrder
                item={item}
                containerStyle={styles.item}
                goBack={this.handleLoad}
              />
            )}
            onEndReached={this.handleLoadMore}
            onEndReachedThreshold={0.5}
            ListFooterComponent={this.renderFooter}
            refreshing={refreshing}
            onRefresh={this.handleRefresh}
          />
        )}
        <FilterOrder
          visitModal={visitModal}
          setModalVisible={this.setModalVisible}
          filters={filters}
          valueSelect={type}
          clickFilter={(value) => this.handleFilter('type', value)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  search: {
    marginHorizontal: 25,
    marginTop: 13,
    marginBottom: 7,
  },
  headerCenter: {
    flex: 0,
  },
  header: {
    paddingHorizontal: 25,
  },
  item: {
    marginHorizontal: 25,
  },
  footerEmpty: {
    height: 20,
  },
  footerLoading: {
    marginVertical: 20,
  },
});

export default function OrderScreen(props) {
  const {t} = useTranslation();
  return <Order {...props} t={t} />;
}
