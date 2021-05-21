import * as React from 'react';
import {useTheme} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {KeyboardAvoidingView, ScrollView, StyleSheet, View} from 'react-native';
import Text from 'src/components/Text';
import Header from 'src/components/Header';
import Icon from 'src/components/Icon';
import Button from 'src/components/Button';
import Select from 'src/containers/Select';

import PaymentPaypal from './auth/PaymentPaypal';
import PaymentBank from './auth/PaymentBank';

const Components = {
  paypal: PaymentPaypal,
  bank: PaymentBank,
};

function PaymentSetupScreen(props) {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const {navigation, route} = props;
  const data = route?.params?.data ?? {};
  const user = route?.params?.user ?? {};
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
  const [payment, setPayment] = React.useState({
    method: 'paypal',
    paypal: {
      email: '',
    },
    skrill: {
      email: '',
    },
    bank: {
      ac_name: '',
      ac_number: '',
      bank_name: '',
      bank_addr: '',
      routing_number: '',
      iban: '',
      swift: '',
      ifsc: '',
    },
  });

  const selectMethod =
    methods.find((value) => value.value === payment.method) || methods[0];
  const Form = Components?.[selectMethod?.value] ?? null;

  const onChangeInfo = (key, value) => {
    setPayment({
      ...payment,
      [selectMethod.value]: {
        ...payment[selectMethod.value],
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
            {t('auth:text_second_payment')}
          </Text>
        }
      />
      <KeyboardAvoidingView style={styles.flex} behavior="height">
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <View style={styles.viewMethod}>
              <Text secondary>{t('account:text_payment_method')}</Text>
              <Select
                type="underline"
                options={methods}
                valueSelect={payment.method}
                onSelect={(value) =>
                  setPayment({
                    ...payment,
                    method: value,
                  })
                }
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
                {Form ? (
                  <Form
                    data={payment[selectMethod.value]}
                    onChangeInfo={onChangeInfo}
                  />
                ) : null}
              </>
            ) : null}
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
                navigation.navigate('PolicySetupScreen', {
                  data: {
                    ...data,
                    payment,
                  },
                  user,
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

export default PaymentSetupScreen;
