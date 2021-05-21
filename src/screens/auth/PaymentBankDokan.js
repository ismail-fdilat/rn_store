import * as React from 'react';
import {useTranslation} from 'react-i18next';
import Input from 'src/components/Input';

function PaymentBankDokan() {
  const {t} = useTranslation();
  return (
    <>
      <Input label={t('inputs:text_bank_account_name')} />
      <Input label={t('inputs:text_bank_number')} />
      <Input label={t('inputs:text_bank_name')} />
      <Input label={t('inputs:text_state')} multiline />
      <Input label={t('inputs:text_routing_number')} />
      <Input label={t('inputs:text_iban')} />
      <Input label={t('inputs:text_swift_code')} />
    </>
  );
}

export default PaymentBankDokan;
