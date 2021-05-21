import * as React from 'react';
import PropTypes from 'prop-types';
import {useTheme} from '@react-navigation/native';
import {
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ViewPropTypes,
} from 'react-native';
import ViewLabel from 'src/components/ViewLabel';
import Modal from 'src/components/Modal';
import SelectSolid from './SelectSolid';
import SelectUnderline from './SelectUnderline';
import ListItem from 'src/components/ListItem';
import {fonts, lineHeights, sizes} from 'src/configs/fonts';

function Select(props) {
  const {colors} = useTheme();
  const [visible, setVisible] = React.useState(false);
  const {
    type,
    label,
    error,
    containerStyle,
    contentStyle,
    labelStyle,
    errorStyle,
    isRequired,
    valueSelect,
    options,
    onSelect,
    textEmpty,
    style,
    touchStyle,
  } = props;
  const ComponentInput = type === 'underline' ? SelectUnderline : SelectSolid;
  const optionSelect = options.find((option) => option.value === valueSelect);
  const clickSelect = (value) => {
    onSelect(value);
    setVisible(false);
  };
  return (
    <>
      <ViewLabel
        type={type}
        label={label}
        error={error}
        containerStyle={containerStyle}
        style={contentStyle}
        labelStyle={labelStyle}
        errorStyle={errorStyle}
        isRequired={isRequired}>
        <TouchableOpacity style={touchStyle} onPress={() => setVisible(true)}>
          <ComponentInput
            name={optionSelect?.name}
            label={label}
            textEmpty={textEmpty}
            style={style}
          />
        </TouchableOpacity>
      </ViewLabel>
      <Modal visible={visible} setModalVisible={(value) => setVisible(value)}>
        {options && options.length > 0 ? (
          <FlatList
            data={options}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <ListItem
                title={item.name}
                onPress={() => clickSelect(item.value)}
                titleStyle={[
                  styles.text,
                  item.value === valueSelect && {color: colors.primary},
                ]}
                bottomDivider
                rightIcon={
                  item.value === valueSelect
                    ? {name: 'check', size: 20, color: colors.primary}
                    : null
                }
                containerStyle={styles.item}
              />
            )}
            initialNumToRender={15}
            keyExtractor={(item) => item.value}
          />
        ) : null}
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  item: {
    marginHorizontal: 25,
  },
  text: {
    fontFamily: fonts.regular,
    fontSize: sizes.h5,
    lineHeight: lineHeights.h5,
  },
});

Select.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
    }),
  ).isRequired,
  valueSelect: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onSelect: PropTypes.func,
  textEmpty: PropTypes.string,
  style: ViewPropTypes.style,
  touchStyle: ViewPropTypes.style,
};

Select.defaultProps = {
  options: [],
  valueSelect: null,
  onSelect: () => {},
  textEmpty: '',
  style: {},
  touchStyle: {},
};

export default Select;
