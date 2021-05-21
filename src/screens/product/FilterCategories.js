import * as React from 'react';
import PropTypes from 'prop-types';
import {useTheme} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {StyleSheet, ScrollView, View} from 'react-native';
import Button from 'src/components/Button';
import Modal from 'src/components/Modal';
import isEqual from 'lodash/isEqual';
import concat from 'lodash/concat';
import filter from 'lodash/filter';
import ItemCategories from './ItemCategories';

class FilterCategories extends React.Component {
  constructor(props) {
    super(props);
    const {selectCategory} = props;
    this.state = {
      selectCategory,
    };
  }
  componentDidUpdate(prevProps, prevState) {
    const {visitModal, selectCategory} = this.props;
    if (
      visitModal !== prevProps.visitModal &&
      !isEqual(selectCategory, this.state.selectCategory)
    ) {
      this.setState({
        selectCategory,
      });
    }
  }

  handleSelect = (category) => {
    const {selectCategory} = this.state;
    const findSelect = selectCategory.find((s) => s.id === category.id);
    if (findSelect) {
      this.setState({
        selectCategory: filter(selectCategory, (s) => s.id !== category.id),
      });
    } else {
      this.setState({
        selectCategory: concat(selectCategory, {
          id: category.id,
          name: category.name,
          // slug: category.slug,
        }),
      });
    }
  };
  render() {
    const {
      visitModal,
      setModalVisible,
      categories,
      clickFilter,
      t,
    } = this.props;
    const {selectCategory} = this.state;
    return (
      <Modal
        visible={visitModal}
        setModalVisible={setModalVisible}
        maxRatio={0.85}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            {categories.map((category) => (
              <ItemCategories
                key={category.id}
                category={category}
                selectCategory={selectCategory}
                handleSelect={this.handleSelect}
              />
            ))}
          </View>
        </ScrollView>
        <Button
          title={t('common:text_apply')}
          onPress={() => {
            clickFilter(selectCategory);
            setModalVisible(false);
          }}
          containerStyle={styles.button}
        />
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 25,
  },
  button: {
    marginVertical: 28,
    marginHorizontal: 25,
  },
  viewSubs: {
    paddingLeft: 15,
  },
});

FilterCategories.propTypes = {
  visitModal: PropTypes.bool,
  setModalVisible: PropTypes.func,
  categories: PropTypes.array,
  selectCategory: PropTypes.array,
  clickFilter: PropTypes.func,
};
FilterCategories.defaultProps = {
  visitModal: false,
  isOpen: false,
  categories: [],
  selectCategory: [],
};
export default function FilterProductComponent(props) {
  const theme = useTheme();
  const {t} = useTranslation();
  return <FilterCategories {...props} theme={theme} t={t} />;
}
