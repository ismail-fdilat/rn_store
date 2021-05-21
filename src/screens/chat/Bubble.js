import PropTypes from 'prop-types';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import {
  Clipboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Dimensions,
} from 'react-native';
import {MessageImage} from 'react-native-gifted-chat';
import MessageText from './MessageText';

const {width} = Dimensions.get('window');
const widthBubble = (width * 200) / 375;
const radius = 20;

const styleWrapper = {
  borderRadius: radius,
  paddingVertical: 15,
  paddingHorizontal: 15,
  justifyContent: 'flex-end',
  minHeight: 54,
  width: widthBubble,
};

const DEFAULT_OPTION_TITLES = ['Copy Text', 'Cancel'];

function Bubble(props, context) {
  const {colors} = useTheme();
  const {currentMessage, position, onLongPress, optionTitles} = props;
  const Color = {
    leftBubbleBackground: colors.secondaryCard,
    defaultBlue: colors.primary,
  };

  const styles = {
    left: StyleSheet.create({
      container: {
        flex: 1,
        alignItems: 'flex-start',
      },
      wrapper: {
        backgroundColor: Color.leftBubbleBackground,
        ...styleWrapper,
        borderBottomLeftRadius: 0,
      },
    }),
    right: StyleSheet.create({
      container: {
        flex: 1,
        alignItems: 'flex-end',
      },
      wrapper: {
        backgroundColor: Color.defaultBlue,
        ...styleWrapper,
        borderBottomRightRadius: 0,
      },
    }),
  };
  const handleLongPress = () => {
    if (onLongPress) {
      onLongPress(context, currentMessage);
    } else if (currentMessage && currentMessage.text) {
      const options =
        optionTitles && optionTitles.length > 0
          ? optionTitles.slice(0, 2)
          : DEFAULT_OPTION_TITLES;
      const cancelButtonIndex = options.length - 1;
      context.actionSheet().showActionSheetWithOptions(
        {
          options,
          cancelButtonIndex,
        },
        (buttonIndex) => {
          switch (buttonIndex) {
            case 0:
              Clipboard.setString(currentMessage.text);
              break;
            default:
              break;
          }
        },
      );
    }
  };

  const renderMessageText = () => {
    if (currentMessage && currentMessage.text) {
      return (
        <MessageText currentMessage={currentMessage} position={position} />
      );
    }
    return null;
  };

  const renderMessageImage = () => {
    if (currentMessage && currentMessage.image) {
      return <MessageImage {...this.props} />;
    }
    return null;
  };

  const renderMessageVideo = () => {
    if (currentMessage && currentMessage.video) {
      return null;
    }
    return null;
  };

  const renderBubbleContent = () => {
    return (
      <View>
        {renderMessageImage()}
        {renderMessageVideo()}
        {renderMessageText()}
      </View>
    );
  };

  return (
    <View style={styles[position].container}>
      <View style={styles[position].wrapper}>
        <TouchableWithoutFeedback
          onLongPress={handleLongPress}
          accessibilityTraits="text">
          {renderBubbleContent()}
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}

Bubble.contextTypes = {
  actionSheet: PropTypes.func,
};
Bubble.defaultProps = {
  onLongPress: null,
  position: 'left',
  optionTitles: DEFAULT_OPTION_TITLES,
  currentMessage: {
    text: null,
    createdAt: null,
    image: null,
  },
};
Bubble.propTypes = {
  user: PropTypes.object.isRequired,
  onLongPress: PropTypes.func,
  position: PropTypes.oneOf(['left', 'right']),
  optionTitles: PropTypes.arrayOf(PropTypes.string),
  currentMessage: PropTypes.object,
};

export default Bubble;
