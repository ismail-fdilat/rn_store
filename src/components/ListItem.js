import * as React from 'react';
import PropTypes from 'prop-types';
import {useTheme} from '@react-navigation/native';
import {StyleSheet, Text, ViewPropTypes} from 'react-native';
import {ListItem as ListItemRNE} from 'react-native-elements';
import {fonts, sizes, lineHeights} from 'src/configs/fonts';

function ListItem(props) {
  const {colors} = useTheme();
  const {
    containerStyle,
    titleStyle,
    subtitleStyle,
    bottomDivider,
    ...rest
  } = props;
  return (
    <ListItemRNE
      underlayColor={'transparent'}
      activeOpacity={0.5}
      {...rest}
      bottomDivider={bottomDivider}
      containerStyle={[
        styles.container,
        {backgroundColor: colors.card},
        {borderColor: colors.border},
        bottomDivider && styles.containerUnderLine,
        containerStyle,
      ]}
      titleStyle={[styles.title, {color: colors.text}, titleStyle]}
      subtitleStyle={[
        styles.subTitle,
        {color: colors.thirdText},
        subtitleStyle,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 0,
    minHeight: 52,
  },
  containerUnderLine: {
    backgroundColor: 'transparent',
    paddingHorizontal: 0,
    borderBottomWidth: 1,
  },
  title: {
    fontFamily: fonts.medium,
    fontSize: sizes.h4,
    lineHeight: lineHeights.h4,
  },
  subTitle: {
    fontFamily: fonts.regular,
    fontSize: sizes.h6,
    lineHeight: lineHeights.h6,
  },
});

ListItem.propTypes = {
  containerStyle: ViewPropTypes.style,
  titleStyle: Text.propTypes.style,
  subtitleStyle: Text.propTypes.style,
  bottomDivider: PropTypes.bool,
};
ListItem.defaultProps = {
  containerStyle: {},
  bottomDivider: false,
};

export default ListItem;
