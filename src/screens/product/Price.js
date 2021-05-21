import * as React from 'react';
import PropTypes from 'prop-types';
import {useTheme} from '@react-navigation/native';
import {StyleSheet, View, ViewPropTypes} from 'react-native';
import Text from 'src/components/Text';

function Price(props) {
  const {colors} = useTheme();
  const {priceFormat, containerStyle} = props;
  const {regular_price, sale_price} = priceFormat;

  if (!regular_price && !sale_price) {
    return (
      <View style={containerStyle}>
        <Text>Update...</Text>
      </View>
    );
  }
  if (sale_price) {
    return (
      <View style={[styles.viewSale, containerStyle]}>
        <Text style={[styles.priceSale, {color: colors.error}]}>
          {sale_price}
        </Text>
        <Text secondary style={styles.regularSale}>
          {regular_price}
        </Text>
      </View>
    );
  }
  return (
    <View style={containerStyle}>
      <Text>{regular_price}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  viewSale: {
    flexDirection: 'row',
  },
  priceSale: {
    marginRight: 12,
  },
  regularSale: {
    textDecorationLine: 'line-through',
  },
});

Price.propTypes = {
  priceFormat: PropTypes.object,
  containerStyle: ViewPropTypes.style,
};

Price.defaultProps = {
  priceFormat: {},
  containerStyle: {},
};

export default Price;
