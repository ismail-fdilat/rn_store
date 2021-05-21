import * as React from 'react';
import {useTranslation} from 'react-i18next';
import startsWith from 'lodash/startsWith';
import {KeyboardAvoidingView, StyleSheet, View, ScrollView} from 'react-native';
import Header from 'src/components/Header';
import Text from 'src/components/Text';
import Input from 'src/components/Input';
import Button from 'src/components/Button';
import Icon from 'src/components/Icon';
import InputMobile from 'src/containers/InputMobile';
import Select from 'src/containers/Select';

const countries = [
  {
    value: 'US',
    name: 'United State',
  },
  {
    value: 'UK',
    name: 'United Kingdom (UK)',
  },
  {
    value: 'VN',
    name: 'Viet Nam',
  },
  {
    value: 'IN',
    name: 'India',
  },
];

function SupportSetupScreen(props) {
  const {t} = useTranslation();
  const {navigation, route} = props;

  const data = route?.params?.data ?? {};
  const user = route?.params?.user ?? {};

  const [support, setSupport] = React.useState({
    phone: '',
    email: '',
    address1: '',
    address2: '',
    country: 'IN',
    city: '',
    state: '',
    zip: '',
  });

  const [mobile, setMobile] = React.useState({
    value: '',
    code: '',
  });

  const onChangeValue = (key, value) => {
    setSupport({
      ...support,
      [key]: value,
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
            {t('auth:text_forth_support')}
          </Text>
        }
      />
      <KeyboardAvoidingView style={styles.flex} behavior="height">
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
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
              label={t('inputs:text_email')}
              keyboardType="email-address"
              value={support.email}
              onChangeText={(value) => onChangeValue('email', value)}
            />
            <Input
              label={t('inputs:text_address_1')}
              value={support.address1}
              onChangeText={(value) => onChangeValue('address1', value)}
            />
            <Input
              label={t('inputs:text_address_2')}
              value={support.address2}
              onChangeText={(value) => onChangeValue('address2', value)}
            />
            <Select
              label={t('inputs:text_country')}
              options={countries}
              textEmpty={t('account:text_select_country')}
              valueSelect={support.country}
              onSelect={(value) => onChangeValue('country', value)}
            />
            <Input
              label={t('inputs:text_city_town')}
              value={support.city}
              onChangeText={(value) => onChangeValue('city', value)}
            />
            <Input
              label={t('inputs:text_state_country')}
              value={support.state}
              onChangeText={(value) => onChangeValue('state', value)}
            />
            <Input
              label={t('inputs:text_postcode_zip')}
              value={support.zip}
              onChangeText={(value) => onChangeValue('zip', value)}
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
                navigation.navigate('SeoSetupScreen', {
                  user,
                  data: {
                    ...data,
                    customer_support: support,
                  },
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

export default SupportSetupScreen;
