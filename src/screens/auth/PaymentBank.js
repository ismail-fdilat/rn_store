import * as React from 'react';
import {useTranslation} from 'react-i18next';
import Input from 'src/components/Input';

function PaymentBank(props) {
  const {t} = useTranslation();
  const {data, onChangeInfo} = props;

  return (
    <>
      <Input
        label={t('inputs:text_account_name')}
        value={data?.ac_name}
        onChangeText={(value) => onChangeInfo('ac_name', value)}
      />
      <Input
        label={t('inputs:text_account_number')}
        value={data?.ac_number}
        onChangeText={(value) => onChangeInfo('ac_number', value)}
      />
      <Input
        label={t('inputs:text_bank_name')}
        value={data?.bank_name}
        onChangeText={(value) => onChangeInfo('bank_name', value)}
      />
      <Input
        label={t('inputs:text_bank_address')}
        multiline
        value={data?.bank_addr}
        onChangeText={(value) => onChangeInfo('bank_addr', value)}
      />
      <Input
        label={t('inputs:text_routing_number')}
        value={data?.routing_number}
        onChangeText={(value) => onChangeInfo('routing_number', value)}
      />
      <Input
        label={t('inputs:text_iban')}
        value={data?.iban}
        onChangeText={(value) => onChangeInfo('iban', value)}
      />
      <Input
        label={t('inputs:text_swift_code')}
        value={data?.swift}
        onChangeText={(value) => onChangeInfo('swift', value)}
      />
      <Input
        label={t('inputs:text_ifsc_code')}
        value={data?.ifsc}
        onChangeText={(value) => onChangeInfo('ifsc', value)}
      />
    </>
  );
}

export default PaymentBank;
