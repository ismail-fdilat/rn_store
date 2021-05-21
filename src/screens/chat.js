import * as React from 'react';

import database from '@react-native-firebase/database';

import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import {View, ScrollView, FlatList, StyleSheet, Image} from 'react-native';
import {Avatar} from 'react-native-elements';
import Icon from 'src/components/Icon';
import Text from 'src/components/Text';
import Header from 'src/components/Header';
import OpacityView from 'src/containers/OpacityView';
import Search from 'src/containers/Search';
import Dot from 'src/containers/Dot';
import ItemChat from './chat/ItemChat';
import {isEmpty} from 'lodash';
import {colorStatus} from './chat/config';
import {listChats} from 'src/mock/chat';
import {AuthContext} from '../utils/auth-context';

function ChatScreen() {
  const {user} = React.useContext(AuthContext);
  const {colors} = useTheme();
  const {t} = useTranslation();

  let [contacts, setContacts] = React.useState([]);
  let [countRead, setCountRead] = React.useState(0);
  // Get list contact for vendor
  const contactRef = database()
    .ref('chat_users')
    .orderByChild('vendor_id')
    .equalTo(parseInt(user.ID, 10));

  const countReadRef = database()
    .ref('chat_messages')
    .orderByChild('vendor_id')
    .equalTo(parseInt(user.ID));

  React.useEffect(() => {
    // prepare contact list
    countReadRef.on('value', (snapshot) => {
      if (snapshot.exists()) {
        const dataCount = snapshot.val();
        setCountRead(
          dataCount
            ? Object.values(dataCount).filter((count) => count.read === false)
                .length
            : 0,
        );
      }
    });

    contactRef.on('value', (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setContacts(
          Object.keys(data)
            .map((k) => ({
              id: k,
              user_id: data[k].vendor_id,
              gravatar: data[k].avatar_image,
              user_name: data[k].user_name,
              user_type: data[k].user_type,
              status: data[k].status,
              conversation_id: data[k].conversation_id,
              chat_with: data[k].chat_with,
            }))
            .filter((o) => o.user_type !== 'operator'),
        );
      }
    });
    return function cleanup() {
      contactRef.off();
    };
  }, [contactRef, countReadRef]);
  return (
    <View style={[styles.container, {backgroundColor: colors.thirdBackground}]}>
      <Header
        leftComponent={
          <Text h2 medium>
            {t('chat:text_chat')}
          </Text>
        }
        rightComponent={
          <View style={styles.headerRight}>
            <Icon
              name="email-outline"
              color={colors.primary}
              size={22}
              containerStyle={styles.iconHeaderRight}
            />
            <OpacityView
              bgColor={colors.primary}
              opacity={0.1}
              style={styles.viewCountMail}>
              <Text
                h6
                bold
                h6Style={[styles.textCountMail, {color: colors.primary}]}>
                {countRead}
              </Text>
            </OpacityView>
          </View>
        }
        centerContainerStyle={styles.headerCenter}
        containerStyle={styles.header}
      />
      {!isEmpty(contacts) && (
        <View style={styles.viewInfo}>
          <Search
            placeholder={t('chat:text_search')}
            containerStyle={styles.search}
          />
          <Text h4 medium h4Style={styles.textRecent}>
            {t('chat:text_recent')}
          </Text>
        </View>
      )}
      {!isEmpty(contacts) && (
        <View style={styles.listRecent}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.viewRowRecent}>
              {contacts.map((item, index) => {
                const nameColorStatus =
                  colorStatus[item.status] || colorStatus.offline;
                return (
                  <View
                    key={item.id}
                    style={[
                      styles.itemRecent,
                      index === listChats.length - 1 && styles.lastItemRecent,
                    ]}>
                    <Avatar
                      source={
                        item.gravatar
                          ? {uri: item.avatar_image}
                          : require('src/assets/images/avaChat.png')
                      }
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
                      style={styles.dot}
                    />
                  </View>
                );
              })}
            </View>
          </ScrollView>
        </View>
      )}
      {!isEmpty(contacts) && (
        <View style={[styles.viewList, {backgroundColor: colors.background}]}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={contacts}
            renderItem={({item, index}) => (
              <ItemChat
                item={item}
                containerStyle={[styles.item, index === 0 && styles.itemFirst]}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      )}
      {isEmpty(contacts) && (
        <View style={styles.viewNoList}>
          <Image
            source={require('../assets/images/mess.png')}
            style={styles.imgNoList}
          />
          <Text
            h3
            medium
            secondary
            h3Style={[{width: 220, textAlign: 'center'}]}>
            No customers chat with you yet
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 25,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerCenter: {
    flex: 0,
  },
  iconHeaderRight: {
    marginRight: 3,
  },
  viewCountMail: {
    borderRadius: 8,
  },
  textCountMail: {
    marginHorizontal: 6.8,
  },
  viewInfo: {
    marginHorizontal: 25,
  },
  search: {
    marginBottom: 30,
    marginTop: 13,
  },
  textRecent: {
    marginBottom: 20,
  },
  listRecent: {
    marginBottom: 30,
  },
  viewRowRecent: {
    flexDirection: 'row',
    marginHorizontal: 25,
  },
  itemRecent: {
    marginRight: 20,
  },
  lastItemRecent: {
    marginRight: 0,
  },
  dot: {
    position: 'absolute',
    top: 12,
    right: -4,
  },
  item: {
    marginHorizontal: 25,
  },
  itemFirst: {
    paddingTop: 8,
  },
  viewList: {
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  viewNoList: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  imgNoList: {
    width: 65,
    height: 50,
    marginBottom: 10,
  },
});
export default ChatScreen;
