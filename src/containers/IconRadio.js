import React from 'react';
import PropTypes from 'prop-types';
import {useTheme} from '@react-navigation/native';
import {StyleSheet, View, ViewPropTypes} from 'react-native';

function IconRadio(props) {
  const {colors} = useTheme();
  const {isSelected, containerStyle} = props;

  return (
    <View style={containerStyle}>
      <View
        style={[
          styles.dot,
          {borderColor: colors.thirdText},
          isSelected && {borderColor: colors.primary},
        ]}>
        {isSelected ? (
          <View style={[styles.dotSelect, {backgroundColor: colors.primary}]} />
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dot: {
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
  },
  dotSelect: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
});

IconRadio.propTypes = {
  isSelected: PropTypes.bool,
  containerStyle: ViewPropTypes.style,
};

IconRadio.defaultProps = {
  isSelected: false,
  containerStyle: {},
};

export default IconRadio;
