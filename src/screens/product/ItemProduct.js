import * as React from 'react';
import PropTypes from 'prop-types';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import {StyleSheet, TouchableOpacity, View, ViewPropTypes} from 'react-native';
import Text from 'src/components/Text';
import Image from 'src/components/Image';
import ActivityIndicator from 'src/containers/ActivityIndicator';
import Price from './Price';

export function priceFormatData(item) {
  let regular_price =
    parseFloat(item.regular_price) > 0 ? parseFloat(item.regular_price) : 0;
  let sale_price =
    parseFloat(item.sale_price) > 0 ? parseFloat(item.sale_price) : null;

  let priceFormat = {
    regular_price: `$${regular_price.toFixed(2)}`,
    sale_price: sale_price !== null ? `$${sale_price.toFixed(2)}` : '',
  };

  if (item.type === 'variable' || item.type === 'grouped') {
    let price = parseFloat(item.price) > 0 ? parseFloat(item.price) : 0;
    priceFormat = {
      regular_price: `$${price.toFixed(2)}`,
      sale_price: '',
    };
  }
  return priceFormat;
}

function ItemProduct(props) {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const {item, containerStyle, goEditProduct} = props;
  if (!item) {
    return null;
  }
  const {name, images, type} = item;
  const textType =
    type === 'external'
      ? t('product:text_external_sub')
      : type === 'grouped'
      ? t('product:text_group_sub')
      : type === 'variable'
      ? t('product:text_variable_sub')
      : t('product:text_simple_sub');
  return (
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      onPress={goEditProduct}
      activeOpacity={1}>
      <Image
        source={
          images[0] && images[0]?.src
            ? {uri: images[0].src}
            : require('src/assets/images/pDefault.png')
        }
        style={styles.image}
        containerStyle={styles.containerImage}
        PlaceholderContent={<ActivityIndicator size="small" />}
      />
      <View style={[styles.right, {borderColor: colors.border}]}>
        <Text h4 medium style={styles.name} numberOfLines={2}>
          {name}
        </Text>
        <View style={styles.viewPrice}>
          <Price priceFormat={priceFormatData(item)} />
          <Text h6 third>
            {textType}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerImage: {
    borderRadius: 10,
  },
  image: {
    width: 80,
    height: 80,
  },
  right: {
    flex: 1,
    minHeight: 120,
    marginLeft: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
  },
  name: {
    marginTop: 12,
    marginBottom: 10,
  },
  viewPrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

ItemProduct.propTypes = {
  item: PropTypes.object.isRequired,
  containerStyle: ViewPropTypes.style,
  goEditProduct: PropTypes.func.isRequired,
};

ItemProduct.defaultProps = {
  containerStyle: {},
};

export default ItemProduct;
