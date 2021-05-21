import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import startsWith from 'lodash/startsWith';
import {
  KeyboardAvoidingView,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Header from 'src/components/Header';
import Text from 'src/components/Text';
import Input from 'src/components/Input';
import Button from 'src/components/Button';
import Icon from 'src/components/Icon';
// import ViewLabel from 'src/components/ViewLabel';
import InputImage from 'src/containers/InputImage';
import InputMobile from 'src/containers/InputMobile';
import InputRichText from 'src/containers/InputRichText';

function StoreSetupScreen(props) {
  // const {colors} = useTheme();
  const {t} = useTranslation();
  const {navigation, route} = props;
  const user = route?.params?.user ?? {};
  const name = `${user?.first_name ?? ''} ${user?.last_name ?? ''}`;
  const initData = {
    store_slug: user?.user_login ?? '',
    banner_type: 'single_img',
    banner: '',
    banner_video: '',
    banner_slider: [
      {
        image: '',
        link: '',
      },
    ],
    mobile_banner: '',
    list_banner_type: 'single_img',
    list_banner: '',
    list_banner_video: '',
    store_name_position: 'on_header',
    store_ppp: '10',
    address: {
      street_1: '',
      street_2: '',
      city: '',
      zip: '',
      country: 'IN',
      state: '',
    },
    // find_address: 'Dehradun, Uttarakhand, India',
    // store_location: 'Dehradun, Uttarakhand, India',
    // store_lat: '30.3164945',
    // store_lng: '78.03219179999999',
    find_address: '',
    store_location: '',
    store_lat: '',
    store_lng: '',
    store_name: name,
    store_email: user?.user_email ?? '',
    phone: '',
    gravatar: '',
    shop_description: '',
  };
  const [data, setData] = React.useState(initData);
  const [logo, setLogo] = React.useState('');
  const [banner, setBanner] = React.useState('');
  const [mobile, setMobile] = React.useState({
    value: '',
    code: '',
  });

  const onChangeValue = (key, value) => {
    setData({
      ...data,
      [key]: value,
    });
  };

  const onChangeAddress = (key, value) => {
    setData({
      ...data,
      address: {
        ...data.address,
        [key]: value,
      },
    });
  };
  return (
    <View style={styles.flex}>
      <Header
        leftComponent={
          <Icon name="arrow-left" onPress={() => navigation.goBack()} />
        }
        centerComponent={
          <Text h4 medium>
            {t('auth:text_first_store')}
          </Text>
        }
      />
      <KeyboardAvoidingView style={styles.flex} behavior="height">
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <InputImage
              label={t('inputs:text_store_logo')}
              typeGet="object"
              value={logo}
              onChangeImage={(value) => {
                onChangeValue('gravatar', value?.id?.toString() ?? '');
                setLogo(value?.source_url ?? '');
              }}
            />
            <InputImage
              label={t('inputs:text_store_banner_size')}
              typeGet="object"
              value={banner}
              onChangeImage={(value) => {
                onChangeValue('banner', value?.id?.toString() ?? '');
                setBanner(value?.source_url ?? '');
              }}
            />
            <Input
              label={t('inputs:text_store_name_require')}
              value={data.store_name}
              onChangeText={(value) => onChangeValue('store_name', value)}
            />
            <Input
              label={t('inputs:text_store_slug_require')}
              value={data.store_slug}
              onChangeText={(value) => onChangeValue('store_slug', value)}
            />
            <Input
              label={t('inputs:text_store_email')}
              value={data.store_email}
              onChangeText={(value) => onChangeValue('store_email', value)}
            />
            <InputMobile
              label={t('inputs:text_phone_number')}
              placeholder="- - - - - - - - -"
              value={mobile.value}
              onChangePhoneNumber={(value) => {
                setMobile(value);
                const phone = startsWith(value.value, value.code)
                  ? value.value
                  : `${value.code}${value.value}`;
                onChangeValue('phone', phone);
              }}
            />
            <Input
              label={t('inputs:text_store_address_1')}
              value={data.address.street_1}
              onChangeText={(value) => onChangeAddress('street_1', value)}
            />
            <Input
              label={t('inputs:text_store_address_2')}
              value={data.address.street_2}
              onChangeText={(value) => onChangeAddress('street_2', value)}
            />
            <Input
              label={t('inputs:text_store_city')}
              value={data.address.city}
              onChangeText={(value) => onChangeAddress('city', value)}
            />
            <Input
              label={t('inputs:text_store_country')}
              value={data.address.country}
              onChangeText={(value) => onChangeAddress('country', value)}
            />
            {/*<ViewLabel label={t('inputs:text_store_location')}>*/}
            {/*  <TouchableOpacity style={styles.inputMap}>*/}
            {/*    <Text>{data.store_location ?? t('auth:text_find_map')}</Text>*/}
            {/*    <Icon*/}
            {/*      name="map-search"*/}
            {/*      size={24}*/}
            {/*      color={colors.secondaryText}*/}
            {/*    />*/}
            {/*  </TouchableOpacity>*/}
            {/*</ViewLabel>*/}
            <InputRichText
              label={t('inputs:text_store_description')}
              value={data.shop_description}
              onChangeText={(value) => onChangeValue('shop_description', value)}
            />
          </View>
        </ScrollView>
        <View style={styles.viewFoot}>
          <View style={styles.footButton}>
            <Button
              title={t('common:text_skip')}
              size="small"
              secondary={true}
            />
          </View>
          <View style={styles.footButton}>
            <Button
              title={t('common:text_continue')}
              size="small"
              onPress={() =>
                navigation.navigate('PaymentSetupScreen', {
                  user: route?.params,
                  data,
                })
              }
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  content: {
    marginHorizontal: 25,
    marginTop: 10,
  },
  inputMap: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  viewFoot: {
    marginTop: 20,
    marginBottom: 25,
    marginHorizontal: -10,
    paddingHorizontal: 25,
    flexDirection: 'row',
  },
  footButton: {
    flex: 1,
    marginHorizontal: 10,
  },
});

export default StoreSetupScreen;
