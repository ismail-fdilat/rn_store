import * as React from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import Header from 'src/components/Header';
import Icon from 'src/components/Icon';
import Text from 'src/components/Text';
import ActivityIndicator from 'src/containers/ActivityIndicator';
import ShimmerLoading from 'src/containers/ShimmerLoading';
import ItemNotification from './notification/ItemNotification';
import ShimmerItemNotification, {
  height,
} from './notification/ShimmerItemNotification';

import {getNotifications} from 'src/services/notification-service';
import {AuthContext} from 'src/utils/auth-context';

class NotificationScreen extends React.Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      notifications: [],
      page: 1,
      loading: true,
      loadingMore: false,
      refreshing: false,
      filter: {
        isRead: false,
        status: '',
      },
      visitModal: false,
    };
  }

  componentDidMount() {
    this.fetchNotifications();
  }

  fetchNotifications = async () => {
    try {
      const {page} = this.state;
      const query = {
        page: page,
        per_page: 3,
      };
      const userToken = this?.context?.userToken ?? '';
      const data = await getNotifications(query, userToken);
      if (data.length <= 3 && data.length > 0) {
        this.setState((prevState) => ({
          notifications:
            page === 1
              ? Array.from(data)
              : [...prevState.notifications, ...data],
          loading: false,
          loadingMore: data.length === 3,
          refreshing: false,
        }));
      } else {
        this.setState({
          loadingMore: false,
          loading: false,
        });
      }
    } catch (e) {
      this.setState({
        loading: false,
        loadingMore: false,
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
      this.fetchNotifications,
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
        this.fetchNotifications,
      );
    }
  };

  render() {
    const {navigation} = this.props;
    const {notifications, refreshing, loading} = this.state;
    return (
      <View style={styles.container}>
        <Header
          leftComponent={
            <Icon
              name="arrow-left"
              onPress={() => navigation.goBack()}
              isRotateRTL
            />
          }
          centerComponent={
            <Text h4 medium>
              Notifications
            </Text>
          }
        />
        {loading ? (
          <ShimmerLoading
            Component={ShimmerItemNotification}
            style={styles.item}
            height={height}
          />
        ) : (
          <FlatList
            data={notifications}
            keyExtractor={(item) => item.ID}
            renderItem={({item}) => (
              <ItemNotification item={item} containerStyle={styles.item} />
            )}
            onEndReached={this.handleLoadMore}
            onEndReachedThreshold={0.5}
            ListFooterComponent={this.renderFooter}
            refreshing={refreshing}
            onRefresh={this.handleRefresh}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

export default NotificationScreen;
