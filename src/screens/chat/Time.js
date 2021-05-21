import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
import Text from 'src/components/Text';
import moment from 'moment';

const styles = {
  left: StyleSheet.create({
    text: {
      textAlign: 'left',
      textTransform: 'lowercase',
    },
  }),
  right: StyleSheet.create({
    text: {
      textAlign: 'right',
      textTransform: 'lowercase',
    },
  }),
};
function Time(props) {
  const {position, currentMessage, timeFormat} = props;
  if (currentMessage) {
    return (
      <Text third h6 h6Style={styles[position].text}>
        {moment(currentMessage.createdAt).format(timeFormat)}
      </Text>
    );
  }
  return null;
}
Time.defaultProps = {
  position: 'left',
  currentMessage: {
    createdAt: null,
  },
  timeFormat: 'lt',
};
Time.propTypes = {
  position: PropTypes.oneOf(['left', 'right']),
  currentMessage: PropTypes.object,
  timeFormat: PropTypes.string,
};

export default Time;
