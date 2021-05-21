import * as React from 'react';
import PropTypes from 'prop-types';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import {StyleSheet, TouchableOpacity, View, ViewPropTypes} from 'react-native';
import {Avatar} from 'react-native-elements';
import Text from 'src/components/Text';
import Dot from 'src/containers/Dot';

import {getTimeDate} from 'src/utils/time';
import {white} from 'src/configs/colors';

function ItemNotification(props) {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const {item, containerStyle} = props;
  if (!item) {
    return null;
  }

  const dataType = {
    'state-update': {
      icon: 'rotate-3d-variant',
      name: 'account:text_status_update',
      color: 'success',
    },
    'product-lowstock': {
      icon: 'cart',
      name: 'account:text_product_lowstock',
      color: 'error',
    },
    'new-follow': {
      icon: 'account-plus',
      name: 'account:text_new_follower',
      color: 'primary',
    },
  };

  const getDataType = dataType?.[item.status] ?? dataType['state-update'];
  const textStyle = {
    textTransform: 'uppercase',
    color: colors[getDataType.color],
  };
  return (
    <TouchableOpacity style={[styles.container, containerStyle]}>
      <Avatar
        size={50}
        rounded
        icon={{
          name: getDataType.icon,
          size: 20,
          type: 'material-community',
          color: white,
        }}
        overlayContainerStyle={{backgroundColor: colors.primary}}
      />
      <View style={[styles.right, {borderColor: colors.border}]}>
        <View style={styles.viewDate}>
          <Text h6 third>
            {getTimeDate(item.created)}
          </Text>
          <Dot color={colors.success} borderWidth={0} size={8} />
        </View>
        <Text h4 medium h4Style={styles.message} numberOfLines={2}>
          {item.message}
        </Text>
        <Text h6 style={textStyle}>
          {t(getDataType.name)}
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
    flex: 1,
    marginLeft: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
  },
  viewDate: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  message: {
    marginBottom: 11,
  },
});
ItemNotification.propTypes = {
  item: PropTypes.object.isRequired,
  containerStyle: ViewPropTypes.style,
};

ItemNotification.defaultProps = {
  containerStyle: {},
};

export default ItemNotification;
