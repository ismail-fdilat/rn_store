import * as React from 'react';
import PropTypes from 'prop-types';
import {useTheme} from '@react-navigation/native';
import {Text, ViewPropTypes} from 'react-native';
import ViewLabel from '../ViewLabel';
import InputSolid from './InputSolid';
import InputUnderline from './InputUnderline';

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: {
        value: 'default', // ['focus', 'error', 'success', 'default']
        pre: 'default',
      },
    };
  }

  componentDidUpdate(prevProps) {
    const {value, error} = this.props;
    if (prevProps.error !== error && value) {
      this.setValueStatus(error ? 'error' : 'success');
    }
  }

  setValueStatus = (value) => {
    const {status} = this.state;
    if (value !== status.value) {
      this.setState({
        status: {
          value,
          pre: status.value,
        },
      });
    }
  };

  render() {
    const {
      type,
      label,
      error,
      containerStyle,
      contentStyle,
      labelStyle,
      errorStyle,
      isRequired,
      labelRight,
      onFocus,
      onBlur,
      theme: {colors},
      ...rest
    } = this.props;
    const {status} = this.state;
    const ComponentInput = type === 'underline' ? InputUnderline : InputSolid;
    const border =
      status.value === 'success'
        ? colors.success
        : status.value === 'focus'
        ? colors.primary
        : null;
    return (
      <ViewLabel
        type={type}
        label={label}
        error={error}
        containerStyle={containerStyle}
        style={[contentStyle, border && {borderColor: border}]}
        labelStyle={labelStyle}
        errorStyle={errorStyle}
        isRequired={isRequired}
        labelRight={labelRight}>
        <ComponentInput
          {...rest}
          placeholder={label}
          onFocus={(value) => {
            this.setValueStatus('focus');
            if (onFocus) {
              onFocus(value);
            }
          }}
          onBlur={(value) => {
            this.setValueStatus(
              status.value === 'focus' ? status.pre : status.value,
            );
            if (onBlur) {
              onBlur(value);
            }
          }}
        />
      </ViewLabel>
    );
  }
}

Input.propTypes = {
  type: PropTypes.oneOf(['solid', 'underline']),
  label: PropTypes.string,
  error: PropTypes.string,
  containerStyle: ViewPropTypes.style,
  contentStyle: ViewPropTypes.style,
  labelStyle: Text.propTypes.style,
  errorStyle: Text.propTypes.style,
  isRequired: PropTypes.bool,
  labelRight: PropTypes.node,
};
Input.defaultProps = {
  type: 'solid',
  containerStyle: {},
  contentStyle: {},
  labelStyle: {},
  errorStyle: {},
  isRequired: false,
};
export default function InputComponent(props) {
  const theme = useTheme();
  return <Input theme={theme} {...props} />;
}
