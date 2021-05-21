import React from 'react';
import PropTypes from 'prop-types';
import {useTheme} from '@react-navigation/native';
import Text from 'src/components/Text';

import {white} from 'src/configs/colors';

function MessageText(props) {
  const {colors} = useTheme();
  const {currentMessage, position} = props;
  const styles = {
    left: {
      color: colors.text,
    },
    right: {
      color: white,
    },
  };
  if (currentMessage && currentMessage.text) {
    return (
      <Text medium h5 style={styles[position]}>
        {currentMessage.text}
      </Text>
    );
  }
  return null;
}

MessageText.propTypes = {
  position: PropTypes.oneOf(['left', 'right']),
  currentMessage: PropTypes.object,
};

MessageText.defaultProps = {
  position: 'left',
  currentMessage: {},
};

export default MessageText;
