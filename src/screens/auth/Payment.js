import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import {StyleSheet, View} from 'react-native';
import Text from 'src/components/Text';
import Select from 'src/containers/Select';

import PaymentPaypal from './PaymentPaypal';
import PaymentBankDokan from './PaymentBankDokan';

const Components = {
  paypal: PaymentPaypal,
  bank: PaymentBankDokan,
};

function Payment(props) {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const methods = [
    {
      value: 'paypal',
      name: t('common:text_paypal'),
      title: t('common:text_paypal'),
    },
    {
      value: 'bank',
      name: t('common:text_bank_transfer'),
      title: t('common:text_bank'),
    },
  ];
  const [method, setMethod] = React.useState('paypal');

  const selectMethod = methods.find((value) => value.value === method);
  const Form = Components?.[selectMethod?.value] ?? null;
  return (
    <>
      <View style={styles.viewMethod}>
        <Text secondary>{t('account:text_payment_method')}</Text>
        <Select
          type="underline"
          options={methods}
          valueSelect={method}
          onSelect={(value) => setMethod(value)}
          contentStyle={[
            styles.selectContent,
            {backgroundColor: colors.secondaryCard},
          ]}
          containerStyle={styles.selectContainer}
          touchStyle={styles.touchContent}
          style={styles.selectMethod}
        />
      </View>
      {selectMethod ? (
        <>
          <Text h2 medium h2Style={styles.textDetail}>
            {t('account:text_detail_method', {name: selectMethod.title})}
          </Text>
          {Form ? <Form /> : null}
        </>
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  viewMethod: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectMethod: {
    minHeight: 30,
    paddingVertical: 0,
  },
  selectContent: {
    marginBottom: 0,
    borderBottomWidth: 0,
    borderRadius: 8,
  },
  selectContainer: {
    width: 156,
    marginBottom: 0,
  },
  touchContent: {
    paddingLeft: 14,
    paddingRight: 7,
  },
  textDetail: {
    marginTop: 30,
    marginBottom: 15,
  },
});

export default Payment;
