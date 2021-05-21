import * as React from 'react';
import PropTypes from 'prop-types';
import {useTheme} from '@react-navigation/native';
import {View, Text as TextRN, StyleSheet, ViewPropTypes} from 'react-native';
import Text from './Text';
import Icon from './Icon';
import {white} from 'src/configs/colors';
import nodeType from 'src/helpers/nodeType';
import renderNode from 'src/helpers/renderNode';

function Badge(props) {
  const {colors} = useTheme();
  const {
    value,
    size,
    type,
    icon,
    viewIconStyle,
    containerStyle,
    textStyle,
  } = props;
  return (
    <View
      style={[
        styles.container,
        {
          height: size,
          minWidth: size,
          borderRadius: size / 2,
          backgroundColor: colors[type] || colors.primary,
        },
        containerStyle,
      ]}>
      {icon ? (
        <View style={[styles.icon, viewIconStyle]}>
          {renderNode(Icon, icon, {
            name: 'star',
            size: 12,
            color: white,
          })}
        </View>
      ) : null}
      <Text h6 h6Style={[styles.text, textStyle]}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 7,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginRight: 3,
  },
  text: {
    color: white,
  },
});

Badge.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  size: PropTypes.number,
  type: PropTypes.oneOf(['primary', 'error', 'warning', 'success', 'waiting']),
  containerStyle: ViewPropTypes.style,
  textStyle: TextRN.propTypes.style,
  icon: nodeType,
  viewIconStyle: ViewPropTypes.style,
};

Badge.defaultProps = {
  value: '',
  size: 20,
  type: 'primary',
  containerStyle: {},
  textStyle: {},
  viewIconStyle: {},
};

export default Badge;
