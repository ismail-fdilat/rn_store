import * as React from 'react';
import PropTypes from 'prop-types';
import {useTheme} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View} from 'react-native';
import Button from 'src/components/Button';
import Modal from 'src/components/Modal';
import ListItem from 'src/components/ListItem';
import Icon from 'src/components/Icon';
import {fonts, lineHeights, sizes} from 'src/configs/fonts';

class ModalLanguage extends React.Component {
  constructor(props) {
    super(props);
    const {valueSelect} = props;
    this.state = {
      valueSelect: valueSelect,
    };
  }
  componentDidUpdate(prevProps, prevState) {
    const {visitModal, valueSelect} = this.props;
    if (
      visitModal !== prevProps.visitModal &&
      valueSelect !== this.state.valueSelect
    ) {
      this.changeSelect(valueSelect);
    }
  }

  changeSelect = (value) => {
    this.setState({
      valueSelect: value,
    });
  };
  render() {
    const {
      visitModal,
      setModalVisible,
      languages,
      clickShow,
      theme,
      t,
    } = this.props;
    const {valueSelect} = this.state;
    const {colors} = theme;
    const types = Object.values(languages).map((lang) => ({
      name: lang.translated_name || lang.native_name,
      status: lang.code,
    }));
    return (
      <Modal visible={visitModal} setModalVisible={setModalVisible}>
        <View style={styles.content}>
          {types.map((lang) => (
            <ListItem
              key={lang.status}
              title={lang.name}
              bottomDivider
              rightElement={
                lang.status === valueSelect && (
                  <Icon name="check" color={colors.primary} />
                )
              }
              titleStyle={[
                styles.itemTitle,
                lang.status === valueSelect && {color: colors.primary},
              ]}
              onPress={() => this.changeSelect(lang.status)}
            />
          ))}
          <Button
            title={t('common:text_select')}
            onPress={() => clickShow(valueSelect)}
            containerStyle={styles.button}
          />
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 25,
  },
  itemTitle: {
    fontFamily: fonts.regular,
    fontSize: sizes.h5,
    lineHeight: lineHeights.h5,
  },
  button: {
    marginVertical: 28,
  },
});

ModalLanguage.propTypes = {
  visitModal: PropTypes.bool,
  setModalVisible: PropTypes.func,
  languages: PropTypes.object,
  valueSelect: PropTypes.string,
  clickShow: PropTypes.func,
};
ModalLanguage.defaultProps = {
  visitModal: false,
  languages: {},
};
export default function ModalLanguageComponent(props) {
  const theme = useTheme();
  const {t} = useTranslation();
  return <ModalLanguage {...props} theme={theme} t={t} />;
}
