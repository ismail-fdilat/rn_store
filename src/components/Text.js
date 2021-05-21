import React from 'react';
import PropTypes from 'prop-types';
import {useTheme} from '@react-navigation/native';
import {StyleSheet, Text} from 'react-native';
import {sizes, lineHeights, fonts} from 'src/configs/fonts';

const TextElement = (props) => {
  const {colors} = useTheme();
  const {
    style,
    children,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    h1Style,
    h2Style,
    h3Style,
    h4Style,
    h5Style,
    h6Style,
    medium,
    bold,
    secondary,
    third,
    ...rest
  } = props;
  return (
    <Text
      {...rest}
      style={StyleSheet.flatten([
        StyleSheet.flatten([styles.text(colors.text), style]),
        medium && styles.medium,
        bold && styles.bold,
        secondary && styles.color(colors.secondaryText),
        third && styles.color(colors.thirdText),
        h5 && StyleSheet.flatten([styles.h5, style, h5Style]),
        h1 && StyleSheet.flatten([styles.h1, h1Style]),
        h2 && StyleSheet.flatten([styles.h2, h2Style]),
        h3 && StyleSheet.flatten([styles.h3, h3Style]),
        h4 && StyleSheet.flatten([styles.h4, h4Style]),
        h6 && StyleSheet.flatten([styles.h6, h6Style]),
      ])}>
      {children}
    </Text>
  );
};

const styles = {
  text: (color) => ({
    fontSize: sizes.base,
    textAlign: 'left',
    color,
    fontFamily: fonts.regular,
  }),
  medium: {
    fontFamily: fonts.medium,
  },
  bold: {
    fontFamily: fonts.bold,
  },
  color: (color) => ({
    color,
  }),
  h1: {
    fontSize: sizes.h1,
    lineHeight: lineHeights.h1,
  },
  h2: {
    fontSize: sizes.h2,
    lineHeight: lineHeights.h2,
  },
  h3: {
    fontSize: sizes.h3,
    lineHeight: lineHeights.h3,
  },
  h4: {
    fontSize: sizes.h4,
    lineHeight: lineHeights.h4,
  },
  h5: {
    fontSize: sizes.h5,
    lineHeight: lineHeights.h5,
  },
  h6: {
    fontSize: sizes.h6,
    lineHeight: lineHeights.h6,
  },
};

TextElement.propTypes = {
  style: Text.propTypes.style,
  medium: PropTypes.bool,
  bold: PropTypes.bool,
  secondary: PropTypes.bool,
  third: PropTypes.bool,
  h1: PropTypes.bool,
  h2: PropTypes.bool,
  h3: PropTypes.bool,
  h4: PropTypes.bool,
  h5: PropTypes.bool,
  h6: PropTypes.bool,
  h1Style: Text.propTypes.style,
  h2Style: Text.propTypes.style,
  h3Style: Text.propTypes.style,
  h4Style: Text.propTypes.style,
  h5Style: Text.propTypes.style,
  h6Style: Text.propTypes.style,
  children: PropTypes.node,
};

TextElement.defaultProps = {
  medium: false,
  bold: false,
  secondary: false,
  third: false,
  h1: false,
  h2: false,
  h3: false,
  h4: false,
  h5: true,
  h6: false,
  style: {},
  h1Style: {},
  h2Style: {},
  h3Style: {},
  h4Style: {},
  h5Style: {},
  h6Style: {},
  children: '',
};

export default TextElement;
