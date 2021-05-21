import * as React from 'react';
import PropTypes from 'prop-types';
import {useTheme} from '@react-navigation/native';
import {StyleSheet, View, Text as TextRN, ViewPropTypes} from 'react-native';
import Text from './Text';

function ViewLabel(props) {
  const {colors} = useTheme();
  const {
    type,
    label,
    error,
    children,
    containerStyle,
    style,
    labelStyle,
    errorStyle,
    isRequired,
    labelRight,
  } = props;
  const borderColor = error ? colors.error : colors.border;

  if (type === 'underline') {
    return (
      <View style={[styles.containerUnderLine, containerStyle]}>
        <View
          style={[
            styles.content,
            styles.contentUnderline,
            {borderColor: borderColor},
            style,
          ]}>
          {children}
        </View>
        {error ? (
          <Text h6 h6Style={[styles.error, {color: colors.error}, errorStyle]}>
            {error}
          </Text>
        ) : null}
      </View>
    );
  }
  return (
    <View style={[styles.container, containerStyle]}>
      {label || labelRight ? (
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text secondary style={[styles.label, labelStyle]}>
            {label}
            {isRequired && <Text style={{color: colors.error}}> *</Text>}
          </Text>
          {labelRight}
        </View>
      ) : null}
      <View
        style={[
          styles.content,
          styles.contentSolid,
          {borderColor: borderColor},
          style,
        ]}>
        {children}
      </View>
      {error ? (
        <Text h6 h6Style={[styles.error, {color: colors.error}, errorStyle]}>
          {error}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 11,
  },
  containerUnderLine: {
    marginBottom: 19,
  },
  label: {
    marginBottom: 4,
  },
  error: {
    marginBottom: 4,
  },
  content: {
    marginBottom: 4,
  },
  contentSolid: {
    borderWidth: 1,
    borderRadius: 10,
  },
  contentUnderline: {
    borderBottomWidth: 1,
  },
});

ViewLabel.propTypes = {
  type: PropTypes.oneOf(['solid', 'underline']),
  label: PropTypes.string,
  error: PropTypes.string,
  children: PropTypes.node,
  containerStyle: ViewPropTypes.style,
  style: ViewPropTypes.style,
  labelStyle: TextRN.propTypes.style,
  errorStyle: TextRN.propTypes.style,
  isRequired: PropTypes.bool,
  labelRight: PropTypes.node,
};

ViewLabel.defaultProps = {
  type: 'solid',
  containerStyle: {},
  style: {},
  labelStyle: {},
  errorStyle: {},
  isRequired: false,
};
export default ViewLabel;
