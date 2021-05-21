import * as React from 'react';
import PropTypes from 'prop-types';
import {useTranslation} from 'react-i18next';
import {useTheme, useNavigation} from '@react-navigation/native';
import {StyleSheet, TouchableOpacity, View, ViewPropTypes} from 'react-native';
import {Avatar} from 'react-native-elements';
import Text from 'src/components/Text';
import Badge from 'src/components/Badge';
import {getTimeDate} from 'src/utils/time';

function ItemReview(props) {
  const {colors} = useTheme();
  const navigation = useNavigation();
  const {t} = useTranslation();

  const {item, containerStyle} = props;
  if (!item) {
    return null;
  }
  const textType =
    item.type === 'apply' ? t('common:text_apply') : t('account:text_pending');

  return (
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      onPress={() => navigation.navigate('ReviewDetailScreen', {data: item})}>
      <Avatar
        source={{uri: item.author_image}}
        size={60}
        rounded
        icon={{
          name: 'account-circle',
          size: 40,
          type: 'material-community',
          color: colors.secondaryText,
        }}
        overlayContainerStyle={{backgroundColor: colors.secondaryCard}}
      />
      <View style={[styles.right, {borderColor: colors.border}]}>
        <View style={styles.viewName}>
          <Text h4 medium h4Style={styles.name}>
            {item.author_name}
          </Text>
          <Badge
            value={item.review_rating}
            icon
            type={parseInt(item.rating, 10) === 5 ? 'success' : 'warning'}
          />
        </View>
        <View style={styles.viewRating}>
          <Text h6 third style={styles.date}>
            {getTimeDate(item.created)}
          </Text>
          <Text h6 third>
            {textType}
          </Text>
        </View>
        <Text secondary numberOfLines={1}>
          {item.review_description}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  right: {
    paddingVertical: 20,
    flex: 1,
    marginLeft: 20,
    borderBottomWidth: 1,
  },
  viewName: {
    flexDirection: 'row',
    marginBottom: 7,
  },
  name: {
    flex: 1,
    marginRight: 12,
  },
  viewRating: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  date: {
    flex: 1,
    marginRight: 12,
  },
});

ItemReview.propTypes = {
  item: PropTypes.object.isRequired,
  containerStyle: ViewPropTypes.style,
};

ItemReview.defaultProps = {
  containerStyle: {},
};

export default ItemReview;
