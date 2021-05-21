import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {
  StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import Header from 'src/components/Header';
import Text from 'src/components/Text';
import Input from 'src/components/Input';
import Icon from 'src/components/Icon';
import Button from 'src/components/Button';
import Select from 'src/containers/Select';

const countries = [
  {
    value: 'us',
    name: 'United State',
  },
  {
    value: 'en',
    name: 'English',
  },
  {
    value: 'vn',
    name: 'Viet Nam',
  },
  {
    value: 'jp',
    name: 'Japan',
  },
];

function UpdateAddressScreen(props) {
  const {t} = useTranslation();
  const {navigation} = props;
  const [typeBilling, setTypeBilling] = React.useState(true);
  const [typeShipping, setTypeShipping] = React.useState(true);

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
            {t('account:text_address')}
          </Text>
        }
      />
      <KeyboardAvoidingView behavior="height" style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <TouchableOpacity
              style={styles.viewTitle}
              onPress={() => setTypeBilling(!typeBilling)}>
              <Text h4 medium>
                Billing Address
              </Text>
              <Icon
                name={typeBilling ? 'chevron-down' : 'chevron-right'}
                size={22}
                isRotateRTL={!typeBilling}
              />
            </TouchableOpacity>
            {typeBilling ? (
              <View style={styles.form}>
                <View style={styles.rowInput}>
                  <View style={styles.colInput}>
                    <Input label={t('inputs:text_first_name')} />
                  </View>
                  <View style={styles.colInput}>
                    <Input label={t('inputs:text_last_name')} />
                  </View>
                </View>
                <Input label={t('inputs:text_address_1')} />
                <Input label={t('inputs:text_address_2')} />
                <Select
                  label={t('inputs:text_country')}
                  options={countries}
                  textEmpty={t('account:text_select_country')}
                />
                <Input label={t('inputs:text_city_town')} />
                <Input label={t('inputs:text_state_country')} />
                <Input label={t('inputs:Postcode/Zip')} />
              </View>
            ) : null}
            <View style={styles.viewManagerStore}>
              <Text secondary>Manager Stock</Text>
              <Switch />
            </View>
            <TouchableOpacity
              style={[styles.viewTitle, styles.shipping]}
              onPress={() => setTypeShipping(!typeShipping)}>
              <Text h4 medium>
                Shipping Address
              </Text>
              <Icon
                name={typeShipping ? 'chevron-down' : 'chevron-right'}
                size={22}
                isRotateRTL={!typeShipping}
              />
            </TouchableOpacity>
            {typeShipping ? (
              <View style={styles.form}>
                <View style={styles.rowInput}>
                  <View style={styles.colInput}>
                    <Input label={t('inputs:text_first_name')} />
                  </View>
                  <View style={styles.colInput}>
                    <Input label={t('inputs:text_last_name')} />
                  </View>
                </View>
                <Input label={t('inputs:text_address_1')} />
                <Input label={t('inputs:text_address_2')} />
                <Select
                  label={t('inputs:text_country')}
                  options={countries}
                  textEmpty={t('account:text_select_country')}
                />
                <Input label={t('inputs:text_city_town')} />
                <Input label={t('inputs:text_state_country')} />
                <Input label={t('inputs:Postcode/Zip')} />
              </View>
            ) : null}
          </View>
        </ScrollView>
        <View style={[styles.content, styles.footer]}>
          <Button title={t('common:text_button_save')} />
        </View>
      </KeyboardAvoidingView>
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
  viewTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 17,
  },
  shipping: {
    paddingTop: 17,
  },
  form: {
    marginTop: 13,
  },
  rowInput: {
    flexDirection: 'row',
    marginHorizontal: -6,
  },
  colInput: {
    flex: 1,
    marginHorizontal: 6,
  },
  viewManagerStore: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footer: {
    paddingVertical: 25,
  },
});

export default UpdateAddressScreen;
