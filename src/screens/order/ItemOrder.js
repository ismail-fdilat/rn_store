import * as React from 'react';
import PropTypes from 'prop-types';
import {useTranslation} from 'react-i18next';
import {useNavigation, useTheme} from '@react-navigation/native';
import {StyleSheet, View, TouchableOpacity, ViewPropTypes} from 'react-native';
import Text from 'src/components/Text';
import Badge from 'src/components/Badge';
import Icon from 'src/components/Icon';
import Dot from 'src/containers/Dot';

import {getTimeDate} from 'src/utils/time';
import {listStatus} from './configs';

function ItemOrder(props) {
  const {colors} = useTheme();
  const navigation = useNavigation();
  const {t} = useTranslation();

  const {item, goBack, containerStyle} = props;
  if (!item) {
    return null;
  }
  const {number, status, date_created, line_items} = item;
  const getStatus =
    listStatus.find((dataStatus) => dataStatus.value === status) ??
    listStatus[0];
  let nameProducts = line_items
    .map((product) => {
      return `${product.name} x${product.quantity}`;
    })
    .join(', ');

  return (
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      onPress={() =>
        navigation.navigate('OrderDetailScreen', {data: item, goBack})
      }>
      <Icon name="receipt" color={colors.primary} />
      <View style={[styles.right, {borderColor: colors.border}]}>
        <View style={styles.viewNumber}>
          <Text h3 bold>
            #{number}
          </Text>
          <Badge
            value={t(getStatus.name)}
            type={getStatus.type}
            containerStyle={styles.badge}
          />
        </View>
        <View style={styles.time}>
          <Text h6 third>
            {getTimeDate(date_created)}{' '}
            {t('order:text_by', {name: 'John Smart'})}
          </Text>
        </View>
        <View style={styles.viewProduct}>
          <Dot
            color={colors.border}
            size={8}
            borderWidth={0}
            style={styles.dot}
          />
          <Text secondary style={styles.textProduct} numberOfLines={1}>
            {nameProducts}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: 15,
  },
  right: {
    flex: 1,
    marginLeft: 25,
    paddingBottom: 15,
    borderBottomWidth: 1,
  },
  viewNumber: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 13,
  },
  badge: {
    paddingHorizontal: 12,
  },
  time: {
    marginBottom: 5,
  },
  viewProduct: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    marginRight: 8,
  },
  textProduct: {
    flex: 1,
  },
});

ItemOrder.propTypes = {
  item: PropTypes.object.isRequired,
  containerStyle: ViewPropTypes.style,
};

ItemOrder.defaultProps = {
  containerStyle: {},
};

export default ItemOrder;
