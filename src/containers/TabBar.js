import * as React from 'react';
import {useTheme} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {StyleSheet, TouchableOpacity, Platform} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'src/components/Icon';
import Card from 'src/components/Card';
import Text from 'src/components/Text';

function TabBar(props) {
  const insets = useSafeAreaInsets();
  const {t} = useTranslation();
  const {colors} = useTheme();
  const {navigation, state} = props;

  const visit = state.index;

  const lists = [
    {
      icon: 'store',
      name: t('tabbar:text_home'),
      router: 'HomeScreen',
    },
    {
      icon: 'cube',
      name: t('tabbar:text_product'),
      router: 'ProductScreen',
    },
    {
      icon: 'receipt',
      name: t('tabbar:text_order'),
      router: 'OrderScreen',
    },
    {
      icon: 'chat-processing',
      name: t('tabbar:text_chat'),
      router: 'ChatScreen',
    },
    {
      icon: 'account-circle',
      name: t('tabbar:text_account'),
      router: 'AccountStack',
      params: {
        screen: 'AccountScreen',
      },
    },
  ];

  const clickPage = (router, params = {}) => {
    navigation.navigate(router, params);
  };

  return (
    <Card
      style={[
        styles.container,
        {
          paddingBottom: insets.bottom,
        },
      ]}>
      {lists.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.item}
          onPress={() => clickPage(item.router, item.params)}>
          <Icon
            name={item.icon}
            size={24}
            color={visit === index ? colors.primary : colors.secondaryText}
            containerStyle={styles.icon}
          />
          <Text
            secondary
            bold
            h6
            h6Style={[styles.text, visit === index && {color: colors.primary}]}>
            {item.name}
          </Text>
        </TouchableOpacity>
      ))}
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    ...Platform.select({
      android: {
        elevation: 10,
      },
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: -1,
        },
        shadowOpacity: 0.03,
        shadowRadius: 0,
      },
    }),
  },
  item: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 7,
  },
  icon: {
    marginBottom: 3,
  },
  text: {
    fontSize: 11,
    lineHeight: 13,
    textAlign: 'center',
  },
});

export default TabBar;
