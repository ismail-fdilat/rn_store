import React from 'react';
import PropTypes from 'prop-types';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import {Platform, StyleSheet, ActivityIndicator} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {
  actions,
  defaultActions,
  RichEditor,
  RichToolbar,
} from 'react-native-pell-rich-editor';
import Text from 'src/components/Text';
import Icon from 'src/components/Icon';
import ViewLabel from 'src/components/ViewLabel';
import InsertLink from './InsertLink';
import ModalImage from '../ModalImage';
import {updateImages} from 'src/services/media_service';
import {showMessage} from 'src/utils/message';
import {AuthContext} from 'src/utils/auth-context';

const options = {
  customButtons: [{name: 'media_library', title: 'Choose from media library'}],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

class InputRichText extends React.Component {
  static contextType = AuthContext;
  richText = React.createRef();
  linkModal = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      modalImage: false,
      loadingImage: false,
    };
    this.onPressAddImage = this.onPressAddImage.bind(this);
    this.onInsertLink = this.onInsertLink.bind(this);
    this.onLinkDone = this.onLinkDone.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.editorInitializedCallback = this.editorInitializedCallback.bind(this);
  }

  editorInitializedCallback() {
    this.richText.current?.registerToolbar(function (items) {
      console.log(
        'Toolbar click, selected items (insert end callback):',
        items,
      );
    });
  }

  /**
   * editor change data
   * @param {string} html
   */
  handleChange(html) {
    this?.props?.onChangeText(html);
  }

  onPressAddImage() {
    const userToken = this?.context?.userToken ?? '';
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        this.setState({modalImage: true});
        console.log('User tapped custom button: ', response.customButton);
      } else {
        this.setState({loadingImage: true});
        const data = new FormData();
        let mime = response.type || 'image/jpeg';
        data.append('file', {
          name:
            response.fileName ||
            `${Math.random().toString(36).substring(7)}.${mime.split('/')[1]}`,
          type: response.type,
          uri:
            Platform.OS === 'android'
              ? response.uri
              : response.uri.replace('file://', ''),
        });
        updateImages(data, userToken)
          .then((dataApi) => {
            this.setState({loadingImage: false});
            // insert URL
            this.richText.current?.insertImage(dataApi.source_url);
          })
          .catch((error) => {
            this.setState({loadingImage: false});
            showMessage({
              message: 'Add Image',
              description: error.message,
              type: 'danger',
            });
          });
      }
    });
  }

  onInsertLink() {
    this.linkModal.current?.setModal(true);
  }

  onLinkDone({title, url}) {
    this.richText.current?.insertLink(title, url);
  }

  render() {
    const {
      label,
      error,
      containerStyle,
      style,
      errorStyle,
      labelStyle,
      isRequired,
      value,
      disabled,
      theme,
      t,
    } = this.props;
    const {modalImage, loadingImage} = this.state;
    const {colors} = theme;
    const contentStyle = {
      backgroundColor: 'transparent',
      color: colors.text,
      placeholderColor: colors.secondaryText,
      contentCSSText: 'font-size: 14px; min-height: 200px; height: 100%;', // initia
    };
    const {backgroundColor, color} = contentStyle;
    const themeBg = {backgroundColor};

    return (
      <ViewLabel
        label={label}
        containerStyle={containerStyle}
        style={style}
        errorStyle={errorStyle}
        labelStyle={labelStyle}
        isRequired={isRequired}
        error={error}>
        <RichEditor
          disabled={disabled}
          editorStyle={contentStyle}
          containerStyle={themeBg}
          ref={this.richText}
          style={[styles.rich, themeBg]}
          initialContentHTML={value}
          editorInitializedCallback={this.editorInitializedCallback}
          onChange={this.handleChange}
        />
        <RichToolbar
          style={[styles.richBar, themeBg]}
          editor={this.richText}
          disabled={disabled}
          iconTint={color}
          selectedIconTint={colors.primary}
          disabledIconTint={colors.disable}
          onPressAddImage={this.onPressAddImage}
          onInsertLink={this.onInsertLink}
          iconSize={40}
          actions={[...defaultActions, actions.heading1, actions.heading4]}
          iconMap={{
            [actions.insertImage]: ({tintColor}) =>
              loadingImage ? (
                <ActivityIndicator size="small" />
              ) : (
                <Icon
                  size={19}
                  name="picture"
                  type="simple-line-icon"
                  color={tintColor}
                />
              ),
            [actions.heading1]: ({tintColor}) => (
              <Text style={[styles.tib, {color: tintColor}]}>H1</Text>
            ),
            [actions.heading4]: ({tintColor}) => (
              <Text style={[styles.tib, {color: tintColor}]}>H4</Text>
            ),
          }}
        />
        <InsertLink onDone={this.onLinkDone} ref={this.linkModal} t={t} />
        <ModalImage
          visible={modalImage}
          setModalVisible={(v) => this.setState({modalImage: v})}
          onChange={(v) => this.richText.current?.insertImage(v)}
        />
      </ViewLabel>
    );
  }
}

const styles = StyleSheet.create({
  rich: {},
  richBar: {
    height: 50,
  },
  tib: {
    textAlign: 'center',
  },
});

InputRichText.propTypes = {
  disabled: PropTypes.bool,
};

InputRichText.defaultProps = {
  disabled: false,
};

export default function InputRichTextClass(props) {
  const theme = useTheme();
  const {t} = useTranslation();
  return <InputRichText theme={theme} t={t} {...props} />;
}
