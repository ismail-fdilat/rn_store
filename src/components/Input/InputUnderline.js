import * as React from 'react';
import PropTypes from 'prop-types';
import {useTheme} from '@react-navigation/native';
import {StyleSheet, View, TextInput, Text, ViewPropTypes} from 'react-native';
import Icon from '../Icon';
import nodeType from 'src/helpers/nodeType';
import renderNode from 'src/helpers/renderNode';
import {fonts, sizes, lineHeights} from 'src/configs/fonts';

function InputUnderline(props) {
  const {colors} = useTheme();
  const {icon, viewIcon, style, multiline, ...rest} = props;
  const componentInput = (
    <TextInput
      placeholderTextColor={colors.thirdText}
      {...rest}
      multiline={multiline}
      style={[
        styles.input,
        {
          color: colors.text,
        },
        multiline && styles.inputMultiline,
        icon && styles.inputIcon,
        style,
      ]}
    />
  );
  const renderIcon = (content) =>
    renderNode(Icon, content, {
      size: 20,
      color: colors.thirdText,
    });
  if (icon) {
    return (
      <View style={styles.viewRow}>
        <View style={[styles.viewIcon, viewIcon]}>{renderIcon(icon)}</View>
        <View style={styles.viewInput}>{componentInput}</View>
      </View>
    );
  }
  return componentInput;
}

const styles = StyleSheet.create({
  input: {
    fontFamily: fonts.regular,
    height: 44,
    fontSize: sizes.h5,
    lineHeight: lineHeights.h5,
    paddingHorizontal: 0,
  },
  inputIcon: {
    paddingLeft: 7,
  },
  inputMultiline: {
    height: 122,
    textAlignVertical: 'top',
    paddingVertical: 10.5,
  },
  viewRow: {
    flexDirection: 'row',
  },
  viewIcon: {
    height: 38,
    width: 28,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  viewInput: {
    flex: 1,
  },
});

InputUnderline.propTypes = {
  multiline: PropTypes.bool,
  style: Text.propTypes.style,
  icon: nodeType,
  viewIcon: ViewPropTypes.style,
};

InputUnderline.defaultProps = {
  multiline: false,
  autoCapitalize: 'none',
  style: {},
  viewIcon: {},
};

export default InputUnderline;
