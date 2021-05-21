import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, TouchableOpacity, View, ViewPropTypes} from 'react-native';

import sortBy from 'lodash/sortBy';
import filter from 'lodash/filter';
import reverse from 'lodash/reverse';
import head from 'lodash/head';
import {useTheme, useNavigation} from '@react-navigation/native';
import database from '@react-native-firebase/database';

import {Avatar} from 'react-native-elements';
import Text from 'src/components/Text';
import Badge from 'src/components/Badge';
import Dot from 'src/containers/Dot';

import {getTime} from 'src/utils/time';
import {colorStatus} from './config';
import {AuthContext} from 'src/utils/auth-context';

function ItemChat(props) {
  const {colors} = useTheme();
  const navigation = useNavigation();
  const {item, containerStyle} = props;
  const {user} = React.useContext(AuthContext);

  let [mess, setMess] = React.useState('');
  let [count, setUnCountMess] = React.useState(0);

  const nameColorStatus = colorStatus[item.status] || colorStatus.offline;

  const messageRef = database()
    .ref('chat_messages')
    .orderByChild('conversation_id')
    .equalTo(item.conversation_id);

  React.useEffect(() => {
    messageRef.on('value', (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const unReadMessage = filter(
          data,
          (o) => o.user_id !== `fbc-op-${user.ID}` && !o.read,
        );
        const lastMess = head(reverse(sortBy(data, ['msg_time'])));
        if (lastMess) {
          setMess(lastMess.msg);
        }
        setUnCountMess(unReadMessage?.length ?? 0);
      }
    });
    return function cleanup() {
      messageRef.off();
    };
  }, [messageRef, user]);

  return (
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      onPress={() =>
        `fbc-op-${user.ID}` === item.id
          ? {}
          : navigation.navigate('ChatVendorDetailScreen', {user: item})
      }>
      <View style={styles.left}>
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
          overlayContainerStyle={{backgroundColor: colors.secondaryCard}}
        />
        <Dot color={colors[nameColorStatus]} size={12} style={styles.dotLeft} />
      </View>
      <View style={[styles.right, {borderColor: colors.border}]}>
        <View style={styles.viewUser}>
          <Text h4 medium numberOfLines={1} h4Style={styles.user}>
            {item.user_name}
          </Text>
          <Text h6 secondary>
            {getTime(item.date_last_message)}
          </Text>
        </View>
        <View style={styles.viewChat}>
          <Text secondary numberOfLines={1} style={styles.textChat}>
            {mess}
          </Text>
          {count ? (
            <Badge value={count} type="error" containerStyle={styles.badge} />
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  left: {
    marginVertical: 20,
  },
  dotLeft: {
    position: 'absolute',
    top: 12,
    right: -4,
  },
  right: {
    paddingVertical: 20,
    flex: 1,
    marginLeft: 20,
    borderBottomWidth: 1,
  },
  viewUser: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 9,
    marginBottom: 10,
  },
  user: {
    flex: 1,
    marginRight: 12,
  },
  viewChat: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textChat: {
    flex: 1,
  },
  badge: {
    marginLeft: 16,
  },
});

ItemChat.propTypes = {
  item: PropTypes.object.isRequired,
  containerStyle: ViewPropTypes.style,
};

ItemChat.defaultProps = {
  containerStyle: {},
};

export default ItemChat;
