import * as React from 'react';
import PropTypes from 'prop-types';
import {useTheme} from '@react-navigation/native';
import {StyleSheet, Text, ViewPropTypes} from 'react-native';
import {Button as ButtonRNE} from 'react-native-elements';
import {white} from 'src/configs/colors';
import {fonts, lineHeights, sizes} from 'src/configs/fonts';

function Button(props) {
  const {
    secondary,
    size,
    buttonStyle,
    titleStyle,
    loadingProps,
    ...rest
  } = props;
  const {colors} = useTheme();
  const height = size === 'small' ? 41 : 51;
  const bgColor = secondary ? colors.secondaryCard : colors.primary;
  const textColor = secondary ? colors.text : white;

  return (
    <ButtonRNE
      {...rest}
      buttonStyle={[
        styles.button,
        {
          height: height,
          backgroundColor: bgColor,
        },
        buttonStyle,
      ]}
      titleStyle={[
        styles.title,
        {
          color: textColor,
        },
        size === 'small' && styles.titleSmall,
        titleStyle,
      ]}
      disabledStyle={{
        backgroundColor: colors.disable,
      }}
      disabledTitleStyle={{
        color: colors.secondaryText,
      }}
      loadingProps={{
        color: textColor,
        ...loadingProps,
      }}
    />
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
  },
  title: {
    fontFamily: fonts.medium,
    fontSize: sizes.h4,
    lineHeight: lineHeights.h4,
  },
  titleSmall: {
    fontSize: sizes.h5,
    lineHeight: 17,
  },
});

Button.propTypes = {
  secondary: PropTypes.bool,
  buttonStyle: ViewPropTypes.style,
  titleStyle: Text.propTypes.style,
  size: PropTypes.oneOf(['normal', 'small']),
  loadingProps: PropTypes.object,
};

Button.defaultProps = {
  secondary: false,
  buttonStyle: {},
  titleStyle: {},
  size: 'normal',
  loadingProps: {},
};

export default Button;
