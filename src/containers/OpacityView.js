import * as React from 'react';
import PropTypes from 'prop-types';
import {useTheme} from '@react-navigation/native';
import {StyleSheet, View} from 'react-native';

function OpacityView(props) {
  const {colors} = useTheme();
  const {opacity, bgColor, children, style} = props;
  const color = bgColor || colors.background;

  return (
    <View style={[styles.container, style && style, styles.containerView]}>
      <View
        style={[
          styles.boxOpacity,
          {
            opacity: opacity,
            backgroundColor: color,
          },
        ]}
      />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  containerView: {
    backgroundColor: 'transparent',
  },
  boxOpacity: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

OpacityView.propTypes = {
  opacity: PropTypes.number,
  bgColor: PropTypes.string,
  children: PropTypes.node,
};

OpacityView.defaultProps = {
  opacity: 0.5,
};

export default OpacityView;
