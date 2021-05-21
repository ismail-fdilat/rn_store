import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import {StyleSheet, View, ScrollView, TouchableOpacity} from 'react-native';
import Text from 'src/components/Text';
import Icon from 'src/components/Icon';
import Header from 'src/components/Header';
import ListItem from 'src/components/ListItem';
import {fonts, lineHeights, sizes} from 'src/configs/fonts';

function SettingStoreScreen(props) {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const {navigation} = props;

  return (
    <View style={styles.container}>
      <Header
        leftComponent={
          <Icon
            name="arrow-left"
            onPress={() => navigation.goBack()}
            isRotateRTL
          />
        }
        centerComponent={
          <Text h4 medium>
            {t('account:text_setting_store')}
          </Text>
        }
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text h4 medium secondary h4Style={styles.title}>
            {t('account:text_profile_manager')}
          </Text>
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('UpdatePersonScreen')}>
            <View style={styles.leftItem}>
              <Icon name="account" color={colors.thirdText} size={24} />
            </View>
            <View style={styles.rightItem}>
              <ListItem
                title={t('account:text_personal')}
                bottomDivider
                containerStyle={styles.viewItemRight}
                titleStyle={styles.textItem}
                rightElement={
                  <Icon name="chevron-right" size={22} isRotateRTL />
                }
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('UpdateAddressScreen')}>
            <View style={styles.leftItem}>
              <Icon name="map-marker" color={colors.thirdText} size={24} />
            </View>
            <View style={styles.rightItem}>
              <ListItem
                title={t('account:text_address')}
                bottomDivider
                containerStyle={styles.viewItemRight}
                titleStyle={styles.textItem}
                rightElement={
                  <Icon name="chevron-right" size={22} isRotateRTL />
                }
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('UpdateSocialScreen')}>
            <View style={styles.leftItem}>
              <Icon name="share-variant" color={colors.thirdText} size={24} />
            </View>
            <View style={styles.rightItem}>
              <ListItem
                title={t('account:text_share_social')}
                bottomDivider
                containerStyle={styles.viewItemRight}
                titleStyle={styles.textItem}
                rightElement={
                  <Icon name="chevron-right" size={22} isRotateRTL />
                }
              />
            </View>
          </TouchableOpacity>
          <Text h4 medium secondary h4Style={[styles.title, styles.titleStore]}>
            {t('account:text_store_manager')}
          </Text>
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('UpdateStoreScreen')}>
            <View style={styles.leftItem}>
              <Icon name="store" color={colors.thirdText} size={24} />
            </View>
            <View style={styles.rightItem}>
              <ListItem
                title={t('account:text_store')}
                bottomDivider
                containerStyle={styles.viewItemRight}
                titleStyle={styles.textItem}
                rightElement={
                  <Icon name="chevron-right" size={22} isRotateRTL />
                }
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('UpdatePaymentScreen')}>
            <View style={styles.leftItem}>
              <Icon name="bank" color={colors.thirdText} size={24} />
            </View>
            <View style={styles.rightItem}>
              <ListItem
                title={t('account:text_payment')}
                bottomDivider
                containerStyle={styles.viewItemRight}
                titleStyle={styles.textItem}
                rightElement={
                  <Icon name="chevron-right" size={22} isRotateRTL />
                }
              />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 25,
  },
  title: {
    marginBottom: 20,
  },
  titleStore: {
    marginTop: 30,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftItem: {
    width: 41,
    alignItems: 'flex-start',
  },
  rightItem: {
    flex: 1,
  },
  viewItemRight: {
    minHeight: 62,
  },
  textItem: {
    fontFamily: fonts.regular,
    fontSize: sizes.h5,
    lineHeight: lineHeights.h5,
  },
});

export default SettingStoreScreen;
