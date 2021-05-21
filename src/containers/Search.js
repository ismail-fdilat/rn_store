import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {useTheme} from '@react-navigation/native';
import {
  TouchableOpacity,
  LayoutAnimation,
  UIManager,
  StyleSheet,
  View,
  TextInput,
} from 'react-native';

import Text from 'src/components/Text';
import Icon from 'src/components/Icon';
import Card from 'src/components/Card';
import ActivityIndicator from './ActivityIndicator';

import nodeType from 'src/helpers/nodeType';
import renderNode from 'src/helpers/renderNode';
import {fonts, sizes} from 'src/configs/fonts';

const defaultSearchIcon = {
  size: 20,
  name: 'search',
  type: 'material',
};
const defaultClearIcon = {
  name: 'close-circle',
  size: 20,
};

class SearchBar extends Component {
  constructor(props) {
    super(props);
    const {value} = props;

    this.state = {
      hasFocus: false,
      isEmpty: value ? value === '' : true,
    };
  }

  focus = () => {
    this.input.focus();
  };

  blur = () => {
    this.input.blur();
  };

  clear = () => {
    this.input.clear();
    this.onChangeText('');
    this.props.onClear();
  };

  cancel = () => {
    const {value} = this.props;
    if (value !== '') {
      this.onChangeText('');
    }
    if (this.props.showCancel !== 'hidden') {
      UIManager.configureNextLayoutAnimation && LayoutAnimation.easeInEaseOut();
      this.setState({hasFocus: false});
    }

    setTimeout(() => {
      this.blur();
      this.props.onCancel();
    }, 0);
  };

  onFocus = (event) => {
    this.props.onFocus(event);
    UIManager.configureNextLayoutAnimation && LayoutAnimation.easeInEaseOut();

    this.setState({
      hasFocus: true,
      isEmpty: this.props.value === '',
    });
  };

  onBlur = (event) => {
    this.props.onBlur(event);

    if (this.props.showCancel !== 'allways') {
      UIManager.configureNextLayoutAnimation && LayoutAnimation.easeInEaseOut();
      this.setState({
        hasFocus: false,
      });
    }
  };

  onChangeText = (text) => {
    this.props.onChangeText(text);
    this.setState({isEmpty: text === ''});
  };

  render() {
    const {
      cancelButtonProps,
      cancelButtonTitle,
      clearIcon,
      containerStyle,
      inputContainerStyle,
      inputContentStyle,
      inputStyle,
      showLoading,
      loadingProps,
      searchIcon,
      showCancel,
      cancelComponent,
      theme,
      ...attributes
    } = this.props;
    const {hasFocus, isEmpty} = this.state;

    const {style: loadingStyle, ...otherLoadingProps} = loadingProps;
    const {colors} = theme;
    const {
      style: buttonStyle,
      disabled: buttonDisabled,
      ...otherCancelButtonProps
    } = cancelButtonProps;

    return (
      <View style={StyleSheet.flatten([styles.container, containerStyle])}>
        <Card secondary style={[styles.inputContainer, inputContainerStyle]}>
          {searchIcon
            ? renderNode(Icon, searchIcon, {
                color: colors.secondaryText,
                containerStyle: styles.searchIcon,
                ...defaultSearchIcon,
              })
            : null}
          <View style={[styles.inputContent, inputContentStyle]}>
            <TextInput
              testID="searchInput"
              placeholderTextColor={colors.secondaryText}
              {...attributes}
              ref={(input) => {
                this.input = input;
              }}
              onFocus={this.onFocus}
              onBlur={this.onBlur}
              style={[styles.input, inputStyle]}
              onChangeText={this.onChangeText}
            />
          </View>
          <View style={styles.viewIconRight}>
            {showLoading ? (
              <ActivityIndicator
                key="loading"
                size="small"
                style={StyleSheet.flatten([styles.iconRight, loadingStyle])}
                {...otherLoadingProps}
              />
            ) : null}
            {!isEmpty
              ? renderNode(Icon, clearIcon, {
                  color: colors.secondaryText,
                  containerStyle: styles.iconRight,
                  ...defaultClearIcon,
                  key: 'cancel',
                  onPress: this.clear,
                })
              : null}
          </View>
        </Card>
        {showCancel === 'allways' || (showCancel === 'focus' && hasFocus) ? (
          <TouchableOpacity
            accessibilityRole="button"
            onPress={buttonDisabled ? null : this.cancel}
            style={[styles.buttonCancel, buttonStyle]}
            {...otherCancelButtonProps}>
            {cancelComponent ? (
              cancelComponent
            ) : (
              <Text medium>{cancelButtonTitle}</Text>
            )}
          </TouchableOpacity>
        ) : null}
      </View>
    );
  }
}

SearchBar.propTypes = {
  value: PropTypes.string,
  cancelButtonProps: PropTypes.object,
  cancelButtonTitle: PropTypes.string,
  clearIcon: nodeType,
  searchIcon: nodeType,
  loadingProps: PropTypes.object,
  showLoading: PropTypes.bool,
  onClear: PropTypes.func,
  onCancel: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onChangeText: PropTypes.func,
  containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  inputContainerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  inputContentStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  inputStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  showCancel: PropTypes.oneOf(['always', 'focus', 'hidden']),
  cancelComponent: PropTypes.node,
};

SearchBar.defaultProps = {
  value: '',
  cancelButtonTitle: 'Cancel',
  loadingProps: {},
  cancelButtonProps: {},
  showLoading: false,
  onClear: () => null,
  onCancel: () => null,
  onFocus: () => null,
  onBlur: () => null,
  onChangeText: () => null,
  searchIcon: defaultSearchIcon,
  clearIcon: defaultClearIcon,
  showCancel: 'focus',
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    overflow: 'hidden',
    alignItems: 'center',
  },
  input: {
    height: 46,
    paddingHorizontal: 11,
    fontFamily: fonts.regular,
    fontSize: sizes.h5,
  },
  inputContainer: {
    flex: 1,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputContent: {
    flex: 1,
  },
  viewIconRight: {
    flexDirection: 'row',
  },
  iconRight: {
    marginRight: 11,
  },
  searchIcon: {
    marginLeft: 11,
  },
  buttonCancel: {
    marginLeft: 10,
    height: 46,
    justifyContent: 'center',
  },
});

export default function Search(props) {
  const theme = useTheme();
  return <SearchBar {...props} theme={theme} />;
}
