import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {ScrollView, StyleSheet, View, Switch} from 'react-native';
import Text from 'src/components/Text';
import Button from 'src/components/Button';
import Input from 'src/components/Input';
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

function SetupStep1(props) {
  const {t} = useTranslation();
  const {nextStep, skipStep} = props;
  const [country, setCountry] = React.useState(null);
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.padding}>
          <Input label={t('inputs:text_product_per_page')} />
          <Input label={t('inputs:text_address_1')} />
          <Input label={t('inputs:text_address_2')} />
          <Input label={t('inputs:text_city')} />
          <Input label={t('inputs:text_post_code')} keyboardType="number-pad" />
          <Select
            label={t('inputs:text_country')}
            options={countries}
            valueSelect={country}
            onSelect={(value) => setCountry(value)}
            textEmpty={t('common:text_select_option')}
          />
          <Input label={t('inputs:text_state')} />
          <View style={styles.viewShowAddress}>
            <Text style={styles.textShowAddress} secondary>
              {t('auth:text_show_email')}
            </Text>
            <Switch />
          </View>
        </View>
      </ScrollView>
      <View style={[styles.footer, styles.padding]}>
        <View style={styles.viewButton}>
          <Button
            title={t('auth:text_skip')}
            size="small"
            secondary
            onPress={skipStep}
          />
        </View>
        <View style={styles.viewButton}>
          <Button
            title={t('auth:text_get_start')}
            size="small"
            onPress={nextStep}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  padding: {
    paddingHorizontal: 25,
  },
  footer: {
    flexDirection: 'row',
    marginHorizontal: -10,
    marginVertical: 25,
  },
  viewButton: {
    flex: 1,
    paddingHorizontal: 10,
  },
  viewShowAddress: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textShowAddress: {
    flex: 1,
  },
});

export default SetupStep1;
