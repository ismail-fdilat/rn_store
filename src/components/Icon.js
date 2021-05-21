import * as React from 'react';
import PropTypes from 'prop-types';
import {useTheme} from '@react-navigation/native';
import {Text, I18nManager} from 'react-native';
import {Icon as IconRNE} from 'react-native-elements';

function Icon(props) {
  const {colors} = useTheme();
  const {isRotateRTL, iconStyle, ...rest} = props;

  return (
    <IconRNE
      color={colors.text}
      {...rest}
      iconStyle={[
        isRotateRTL &&
          I18nManager.isRTL && {
            transform: [{scaleX: -1}],
          },
        iconStyle && iconStyle,
      ]}
    />
  );
}

Icon.propTypes = {
  isRotateRTL: PropTypes.bool,
  iconStyle: Text.propTypes.style,
};

Icon.defaultProps = {
  type: 'material-community',
  isRotateRTL: false,
};

export default Icon;
