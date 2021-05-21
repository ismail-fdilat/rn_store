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

class FilterProduct extends React.Component {
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
      filters,
      clickFilter,
      theme,
      t,
    } = this.props;
    const {valueSelect} = this.state;
    const {colors} = theme;
    return (
      <Modal visible={visitModal} setModalVisible={setModalVisible}>
        <View style={styles.content}>
          {filters.map((filter) => (
            <ListItem
              key={filter.status}
              title={filter.name}
              bottomDivider
              rightElement={
                filter.status === valueSelect && (
                  <Icon name="check" color={colors.primary} />
                )
              }
              titleStyle={[
                styles.itemTitle,
                filter.status === valueSelect && {color: colors.primary},
              ]}
              onPress={() => this.changeSelect(filter.status)}
            />
          ))}
          <Button
            title={t('common:text_apply')}
            onPress={() => clickFilter(valueSelect)}
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

FilterProduct.propTypes = {
  visitModal: PropTypes.bool,
  setModalVisible: PropTypes.func,
  filters: PropTypes.array,
  valueSelect: PropTypes.string,
  clickFilter: PropTypes.func,
};
FilterProduct.defaultProps = {
  visitModal: false,
  filters: [],
};
export default function FilterProductComponent(props) {
  const theme = useTheme();
  const {t} = useTranslation();
  return <FilterProduct {...props} theme={theme} t={t} />;
}
