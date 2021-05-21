import * as React from 'react';
import PropTypes from 'prop-types';
import {useTheme} from '@react-navigation/native';
import {StyleSheet, View, TextInput, Text, ViewPropTypes} from 'react-native';
import Icon from '../Icon';
import nodeType from 'src/helpers/nodeType';
import renderNode from 'src/helpers/renderNode';
import {fonts, sizes, lineHeights} from 'src/configs/fonts';

function InputSolid(props) {
  const {colors} = useTheme();
  const {icon, viewIcon, style, multiline, secureTextEntry, ...rest} = props;
  const [secure, setSecure] = React.useState(secureTextEntry);

  const renderIcon = (content) =>
    renderNode(Icon, content, {
      size: 20,
      color: colors.thirdText,
    });
  return (
    <View style={styles.viewRow}>
      {icon ? (
        <View style={[styles.viewIcon, viewIcon]}>{renderIcon(icon)}</View>
      ) : null}
      <View style={styles.viewInput}>
        <TextInput
          {...rest}
          multiline={multiline}
          placeholder={null}
          secureTextEntry={secure}
          style={[
            styles.input,
            {
              color: colors.text,
            },
            multiline && styles.inputMultiline,
            style,
          ]}
        />
      </View>
      {!multiline && secureTextEntry ? (
        <View style={styles.iconSecure}>
          <Icon
            name={secure ? 'eye' : 'eye-off'}
            size={20}
            color={colors.thirdText}
            onPress={() => setSecure(!secure)}
          />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    paddingHorizontal: 7,
    fontFamily: fonts.regular,
    height: 46,
    fontSize: sizes.h5,
  },
  inputMultiline: {
    height: 122,
    textAlignVertical: 'top',
    paddingTop: 14,
    paddingBottom: 14,
    lineHeight: lineHeights.h5,
  },
  viewRow: {
    flexDirection: 'row',
    paddingHorizontal: 7,
  },
  viewIcon: {
    height: 46,
    width: 36,
    justifyContent: 'center',
  },
  viewInput: {
    flex: 1,
  },
  iconSecure: {
    paddingHorizontal: 7,
    justifyContent: 'center',
  },
});

InputSolid.propTypes = {
  multiline: PropTypes.bool,
  secureTextEntry: PropTypes.bool,
  style: Text.propTypes.style,
  icon: nodeType,
  viewIcon: ViewPropTypes.style,
};

InputSolid.defaultProps = {
  multiline: false,
  secureTextEntry: false,
  autoCapitalize: 'none',
  style: {},
  viewIcon: {},
};

export default InputSolid;
