import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {KeyboardAvoidingView, ScrollView, StyleSheet, View} from 'react-native';
import Text from 'src/components/Text';
import Icon from 'src/components/Icon';
import Button from 'src/components/Button';
import Header from 'src/components/Header';
import Payment from './auth/Payment';

function UpdatePaymentScreen(props) {
  const {t} = useTranslation();
  const {navigation} = props;

  const onChangeDataPayment = (data) => {};

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
            {t('account:text_update_payment')}
          </Text>
        }
      />
      <KeyboardAvoidingView style={styles.keyboard}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <Payment onChange={onChangeDataPayment} />
            <Button
              title={t('common:text_button_save')}
              containerStyle={styles.button}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboard: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 25,
  },
  button: {
    marginTop: 15,
    marginBottom: 25,
  },
});

export default UpdatePaymentScreen;
