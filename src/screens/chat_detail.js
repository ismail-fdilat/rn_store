import * as React from 'react';

import sortBy from 'lodash/sortBy';

import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import {StyleSheet, View} from 'react-native';
import {Avatar} from 'react-native-elements';
import Text from 'src/components/Text';
import Icon from 'src/components/Icon';
import Header from 'src/components/Header';
import Dot from 'src/containers/Dot';
import FlatListChat from './chat/FlatListChat';

import {colorStatus} from './chat/config';
import database from '@react-native-firebase/database';

class ChatVendorDetailScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    const {route} = this.props;
    const user = route?.params?.user ?? null;
    // Get list message for vendor
    this.messageRef = database()
      .ref('chat_messages')
      .orderByChild('conversation_id')
      .equalTo(user.conversation_id);

    this.messageRef.on('value', (snapshot) => {
      let chats = [];
      snapshot.forEach((snap, k) => {
        const val = snap.val();
        chats.push({
          _id: k,
          text: val.msg,
          createdAt: new Date(val.msg_time),
          user: {
            _id: val.user_id,
            name: val.user_name,
            avatar: val.avatar_image,
          },
        });
      });
      this.setState({
        data: sortBy(chats, ['createdAt']).reverse(),
      });
    });
  }

  componentWillUnmount() {
    if (this.messageRef) {
      this.messageRef.off();
    }
  }

  render() {
    const {navigation, route, theme, t} = this.props;
    const {data} = this.state;
    const user = route?.params?.user ?? null;
    const {colors} = theme;

    if (!user) {
      return (
        <View style={styles.flex}>
          <Header
            leftComponent={
              <Icon name="arrow-left" onPress={() => navigation.goBack()} />
            }
          />
          <View style={[styles.flex, styles.center]}>
            <Text>Empty</Text>
          </View>
        </View>
      );
    }
    const nameColorStatus = colorStatus[user.status] || colorStatus.offline;

    return (
      <View style={[styles.flex, {backgroundColor: colors.forthBackground}]}>
        <Header
          centerComponent={
            <View style={styles.rowCenter}>
              <Icon name="arrow-left" onPress={() => navigation.goBack()} />
              <View style={styles.user}>
                <Avatar
                  source={{uri: user.gravatar}}
                  size={60}
                  rounded
                  icon={{
                    name: 'account-circle',
                    size: 40,
                    type: 'material-community',
                    color: colors.secondaryText,
                  }}
                  overlayContainerStyle={{
                    backgroundColor: colors.secondaryCard,
                  }}
                />
                <Dot
                  color={colors[nameColorStatus]}
                  size={12}
                  style={styles.dotLeft}
                />
              </View>
              <View style={[styles.flex, styles.viewUser]}>
                <Text h3 medium>
                  {user.user_name}
                </Text>
                <Text secondary>{t(`chat:text_${user.status}`)}</Text>
              </View>
            </View>
          }
          leftContainerStyle={styles.flexNull}
          rightContainerStyle={styles.flexNull}
          containerStyle={styles.header}
        />
        <View
          style={[
            styles.flex,
            styles.viewFlat,
            {
              backgroundColor: colors.background,
            },
          ]}>
          <FlatListChat data={data} conversationId={user.conversation_id} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  flexNull: {
    flex: 0,
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    marginVertical: 19,
  },
  user: {
    marginLeft: 20,
  },
  viewUser: {
    marginLeft: 20,
  },
  dotLeft: {
    position: 'absolute',
    top: 12,
    right: -4,
  },
  viewFlat: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
});

export default function ChatVendorDetailScreenComponent(props) {
  const theme = useTheme();
  const {t} = useTranslation();
  return <ChatVendorDetailScreen t={t} theme={theme} {...props} />;
}
