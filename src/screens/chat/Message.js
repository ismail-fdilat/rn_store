import * as React from 'react';
import PropTypes from 'prop-types';
import {useTheme} from '@react-navigation/native';
import {StyleSheet, View} from 'react-native';
import {Avatar} from 'react-native-elements';
import Text from 'src/components/Text';
import Bubble from './Bubble';
import Time from './Time';
import {isSameUser} from 'react-native-gifted-chat/lib/utils';
import {checkHour, checkMinute, getTimeRound, getDate2} from 'src/utils/time';

const styleTime = {
  marginBottom: 10,
};

const styleView = {
  paddingHorizontal: 25,
};

const styles = {
  left: StyleSheet.create({
    time: {
      marginLeft: 40,
      ...styleTime,
    },
  }),
  right: StyleSheet.create({
    time: {
      ...styleTime,
    },
  }),
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 6,
  },
  textDay: {
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  avatar: {
    marginRight: 10,
  },
  viewAvatar: {
    width: 40,
  },
};

function Message(props) {
  const {colors} = useTheme();
  const {
    currentMessage,
    nextMessage,
    previousMessage,
    position,
    timeFormat,
  } = props;

  const renderDay = () => {
    if (
      !previousMessage.createdAt ||
      !checkHour(currentMessage.createdAt, previousMessage.createdAt)
    ) {
      return (
        <Text style={styles.textDay}>
          {getDate2(currentMessage.createdAt)}{' '}
          <Text third>{getTimeRound(currentMessage.createdAt)}</Text>
        </Text>
      );
    }
    return null;
  };

  const renderBubble = () => {
    return <Bubble {...props} />;
  };
  const renderAvatar = () => {
    if (
      isSameUser(currentMessage, nextMessage) &&
      checkMinute(currentMessage.createdAt, nextMessage.createdAt)
    ) {
      return <View style={styles.viewAvatar} />;
    }
    const propAvatar = currentMessage?.user?.avatar
      ? {
          source: {uri: currentMessage.user.avatar},
        }
      : {};
    return (
      <Avatar
        size={30}
        rounded
        icon={{
          name: 'account-circle',
          size: 16,
          type: 'material-community',
          color: colors.secondaryText,
        }}
        overlayContainerStyle={{backgroundColor: colors.secondaryCard}}
        containerStyle={styles.avatar}
        {...propAvatar}
      />
    );
  };

  const renderTime = () => {
    if (
      currentMessage &&
      nextMessage &&
      position &&
      (!isSameUser(currentMessage, nextMessage) ||
        (isSameUser(currentMessage, nextMessage) &&
          !checkMinute(currentMessage.createdAt, nextMessage.createdAt)))
    ) {
      return (
        <View style={styles[position].time}>
          <Time
            currentMessage={currentMessage}
            position={position}
            timeFormat={timeFormat}
          />
        </View>
      );
    }
    return null;
  };

  if (currentMessage) {
    return (
      <View style={styleView}>
        {renderDay()}
        <View>
          <View style={styles.container}>
            {position === 'left' ? renderAvatar() : null}
            {renderBubble()}
          </View>
          {renderTime()}
        </View>
      </View>
    );
  }
  return null;
}
Message.defaultProps = {
  renderAvatar: undefined,
  renderBubble: null,
  renderDay: null,
  renderSystemMessage: null,
  position: 'left',
  currentMessage: {},
  nextMessage: {},
  previousMessage: {},
  user: {},
  shouldUpdateMessage: undefined,
};
Message.propTypes = {
  renderAvatar: PropTypes.func,
  renderBubble: PropTypes.func,
  renderDay: PropTypes.func,
  renderSystemMessage: PropTypes.func,
  position: PropTypes.oneOf(['left', 'right']),
  currentMessage: PropTypes.object,
  nextMessage: PropTypes.object,
  previousMessage: PropTypes.object,
  user: PropTypes.object,
  shouldUpdateMessage: PropTypes.func,
};

export default Message;
