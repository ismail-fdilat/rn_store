import * as React from 'react';
import {useTheme} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {
  View,
  StyleSheet,
  I18nManager,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import {Avatar} from 'react-native-elements';
import Header from 'src/components/Header';
import Text from 'src/components/Text';
import Icon from 'src/components/Icon';
import Search from 'src/containers/Search';
import ActivityIndicator from 'src/containers/ActivityIndicator';
import ShimmerLoading from 'src/containers/ShimmerLoading';
import ItemProduct from './product/ItemProduct';
import ShimmerItemProduct, {height} from './product/ShimmerItemProduct';
import FilterProduct from './product/FilterProduct';

import {AuthContext} from 'src/utils/auth-context';
import {showMessage} from 'src/utils/message';

import {white, darkOrange} from 'src/configs/colors';

import services from 'src/services/index';

const widthOpen = 68;

class Product extends React.Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      products: [],
      page: 1,
      loading: true,
      loadingMore: false,
      refreshing: false,
      type: '',
      search: '',
      visitModal: false,
    };
  }

  componentDidMount() {
    this.fetchProducts();
  }

  fetchProducts = async () => {
    try {
      const {page, type, search} = this.state;
      const query = {
        type,
        search,
        page,
        per_page: 5,
        status: 'any',
      };
      const userToken = this?.context?.userToken ?? '';
      const data = await services.getProducts(query, userToken);
      if (data.length <= 5 && data.length > 0) {
        this.setState((prevState) => ({
          products:
            page === 1 ? Array.from(data) : [...prevState.products, ...data],
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
        this.fetchProducts();
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
        this.fetchProducts,
      );
    }
  };

  handleLoad = () => {
    this.setState(
      {
        products: [],
        page: 1,
        loading: true,
        loadingMore: false,
        refreshing: false,
      },
      () => {
        this.fetchProducts();
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

  clickDelete = async (productId) => {
    Alert.alert(
      'Delete product',
      'Are you sure ?',
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => this.handleDeleteProduct(productId),
        },
      ],
      {cancelable: true},
    );
  };

  handleDeleteProduct = async (productId) => {
    try {
      const userToken = this?.context?.userToken ?? '';
      await services.deleteProduct(productId, userToken);
      showMessage({
        message: 'Delete',
        description: 'Delete product success',
        type: 'success',
      });
      this.handleLoad();
    } catch (e) {
      showMessage({
        message: 'Delete',
        description: e.message,
        type: 'danger',
      });
    }
  };

  handleGoFormProduct = (item) => {
    const {navigation} = this.props;
    if (item.type === 'simple') {
      navigation.navigate('FormProductScreen', {
        data: item,
        goBack: this.handleLoad,
      });
    } else {
      showMessage({
        message: 'Warning',
        description: `You only edit simple products. \nPlease edit other products on the website`,
        type: 'warning',
      });
    }
  };

  render() {
    const {t, theme, navigation} = this.props;
    const {
      products,
      type,
      search,
      visitModal,
      loading,
      refreshing,
    } = this.state;
    const {colors} = theme;

    const filters = [
      {
        name: t('product:text_products'),
        status: '',
      },
      {
        name: t('product:text_simple'),
        status: 'simple',
      },
      {
        name: t('product:text_variable'),
        status: 'variable',
      },
      {
        name: t('product:text_group'),
        status: 'grouped',
      },
      {
        name: t('product:text_external'),
        status: 'external',
      },
    ];

    return (
      <View style={styles.container}>
        <Header
          leftComponent={
            <Text h2 medium>
              {t('product:text_products')}
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
        <View style={styles.viewSearch}>
          <Search
            placeholder={t('product:text_search')}
            value={search}
            onChangeText={(value) => this.handleFilter('search', value)}
          />
        </View>
        {loading ? (
          <ShimmerLoading
            style={styles.item}
            Component={ShimmerItemProduct}
            height={height}
          />
        ) : (
          <SwipeListView
            useFlatList
            showsVerticalScrollIndicator={false}
            removeClippedSubviews={false}
            keyExtractor={(item, index) => index.toString()}
            data={products}
            renderItem={({item}) => (
              <ItemProduct
                item={item}
                containerStyle={[
                  styles.item,
                  {backgroundColor: colors.background},
                ]}
                goEditProduct={() => this.handleGoFormProduct(item)}
              />
            )}
            leftOpenValue={widthOpen}
            rightOpenValue={-widthOpen}
            renderHiddenItem={({item}) => {
              return (
                <View style={styles.viewHiddenItem}>
                  <TouchableOpacity
                    style={[
                      styles.touchDelete,
                      {backgroundColor: colors.secondaryCard},
                    ]}
                    onPress={() => this.clickDelete(item.id)}>
                    <Icon name="delete-outline" color={darkOrange} />
                  </TouchableOpacity>
                </View>
              );
            }}
            disableLeftSwipe={I18nManager.isRTL}
            disableRightSwipe={!I18nManager.isRTL}
            onEndReached={this.handleLoadMore}
            onEndReachedThreshold={0.5}
            ListFooterComponent={this.renderFooter}
            refreshing={refreshing}
            onRefresh={this.handleRefresh}
          />
        )}
        <View style={styles.viewIconAdd}>
          <Avatar
            icon={{
              name: 'plus',
              type: 'material-community',
              size: 16,
              color: white,
            }}
            size={40}
            rounded
            containerStyle={[
              styles.iconAdd,
              {backgroundColor: colors.primary, shadowColor: colors.primary},
            ]}
            onPress={() =>
              navigation.navigate('FormProductScreen', {
                goBack: this.handleLoad,
              })
            }
            activeOpacity={0.9}
          />
        </View>
        <FilterProduct
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
  headerCenter: {
    flex: 0,
  },
  header: {
    paddingHorizontal: 25,
  },
  viewSearch: {
    paddingHorizontal: 25,
    marginTop: 13,
    marginBottom: 11,
  },
  viewLoading: {
    marginVertical: 20,
  },
  item: {
    paddingHorizontal: 25,
  },
  viewHiddenItem: {
    alignItems: 'flex-end',
  },
  touchDelete: {
    width: 68,
    height: '100%',
    justifyContent: 'center',
  },
  viewIconAdd: {
    position: 'absolute',
    bottom: 25,
    right: 25,
  },
  iconAdd: {
    elevation: 4,
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.25,
    shadowRadius: 9,
  },
  footerEmpty: {
    height: 20,
  },
  footerLoading: {
    marginVertical: 20,
  },
});

export default function ProductScreen(props) {
  const {t} = useTranslation();
  const theme = useTheme();
  return <Product {...props} theme={theme} t={t} />;
}
