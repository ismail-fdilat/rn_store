import * as React from 'react';
import PropTypes from 'prop-types';
import {useTheme} from '@react-navigation/native';
import {View, ViewPropTypes} from 'react-native';

function Dot(props) {
  const {colors} = useTheme();
  const {color, size, borderWidth, style, ...rest} = props;
  return (
    <View
      {...rest}
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth: borderWidth,
          backgroundColor: color,
          borderColor: colors.background,
        },
        style,
      ]}
    />
  );
}

Dot.propTypes = {
  color: PropTypes.string.isRequired,
  size: PropTypes.number,
  borderWidth: PropTypes.number,
  style: ViewPropTypes.style,
};

Dot.defaultProps = {
  size: 15,
  borderWidth: 2,
  style: {},
};
export default Dot;
