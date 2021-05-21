import * as React from 'react';
import {useTranslation} from 'react-i18next';
import Input from 'src/components/Input';

function PaymentPaypal(props) {
  const {t} = useTranslation();
  const {data, onChangeInfo} = props;

  return (
    <>
      <Input
        label={t('inputs:text_email')}
        keyboardType="email-address"
        value={data?.email}
        onChangeText={(value) => onChangeInfo('email', value)}
      />
    </>
  );
}

export default PaymentPaypal;
