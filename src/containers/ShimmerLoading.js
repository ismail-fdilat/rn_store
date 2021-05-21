import * as React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, ViewPropTypes, Dimensions} from 'react-native';
const SCREEN = Dimensions.get('window');

function ShimmerLoading(props) {
  const {Component, height, style} = props;
  const count = parseInt(SCREEN.height / height, 10) + 1;
  const listData = Array.from(Array(count)).map((arg, index) => index);

  return (
    <View style={[styles.container, style]}>
      {listData.map((value) => (
        <Component key={value} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: SCREEN.height,
  },
});

ShimmerLoading.propTypes = {
  Component: PropTypes.elementType.isRequired,
  height: PropTypes.number,
  style: ViewPropTypes.style,
};

ShimmerLoading.defaultProps = {
  style: {},
  height: 120,
};

export default ShimmerLoading;
