import * as React from 'react';
import {useTheme} from '@react-navigation/native';
import {StyleSheet, View} from 'react-native';
import ListItem from 'src/components/ListItem';
import Icon from 'src/components/Icon';
import {fonts, lineHeights, sizes} from 'src/configs/fonts';

function Item(props) {
  const {colors} = useTheme();
  const {category, handleClick, handleSelect, isSelect, isShowSub} = props;
  return (
    <ListItem
      title={category.name}
      bottomDivider
      leftElement={
        <Icon
          name={isSelect ? 'checkbox-marked' : 'checkbox-blank-outline'}
          size={22}
          iconStyle={[styles.icon, isSelect && {color: colors.primary}]}
          activeOpacity={1}
          underlayColor={'transparent'}
          onPress={() => handleSelect(category)}
        />
      }
      rightElement={
        category?.categories?.length > 0 && (
          <Icon
            name={isShowSub ? 'chevron-down' : 'chevron-right'}
            size={22}
            iconStyle={styles.icon}
            activeOpacity={1}
            underlayColor={'transparent'}
          />
        )
      }
      titleStyle={[styles.itemTitle, isSelect && {color: colors.primary}]}
      onPress={category?.categories?.length ? handleClick : null}
      type="underline"
      small
    />
  );
}

function ItemCategory(props) {
  const {category, selectCategory, handleSelect} = props;
  const [isShowSub, setIsShowSub] = React.useState(false);
  const isSelect = selectCategory.find((a) => a.id === category.id);
  return (
    <>
      <Item
        category={category}
        handleClick={() => {
          setIsShowSub(!isShowSub);
        }}
        handleSelect={handleSelect}
        isSelect={isSelect}
        isShowSub={isShowSub}
      />
      {category?.categories?.length > 0 && isShowSub && (
        <View style={styles.viewSubs}>
          {category.categories.map((subC) => (
            <ItemCategory
              key={subC.id}
              category={subC}
              selectCategory={selectCategory}
              handleSelect={handleSelect}
            />
          ))}
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  itemTitle: {
    fontFamily: fonts.regular,
    fontSize: sizes.h5,
    lineHeight: lineHeights.h5,
  },
  viewSubs: {
    paddingLeft: 15,
  },
  icon: {
    color: '#80879A',
  },
});
export default ItemCategory;
