import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {} from '@react-navigation/native';
import {StyleSheet, ScrollView, KeyboardAvoidingView, View} from 'react-native';
import Text from 'src/components/Text';
import Input from 'src/components/Input';
import Button from 'src/components/Button';
import Icon from 'src/components/Icon';
import Header from 'src/components/Header';
import Form from 'src/components/Form';

import {forgotPassword} from 'src/services/auth-service';

import {validateForgotPassword} from 'src/validates/auth-validate';

import {showMessage} from 'src/utils/message';

function ForgotPassword(props) {
  const {t} = useTranslation();
  const {navigation} = props;
  const [email, setEmail] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState({});
  //user_login
  const clickSubmit = async () => {
    try {
      const validate = validateForgotPassword({email});
      setError(validate);
      // console.log('validate', validate)
      if (Object.values(validate).length < 1) {
        setLoading(true);
        const data = await forgotPassword({
          user_login: email,
        });
        setLoading(false);
        if (data) {
          showMessage({
            message: t('message:text_title_forgot_password'),
            description: t('message:text_forgot_password'),
            type: 'success',
          })
        } else {
          showMessage({
            message: t('message:text_title_forgot_password'),
            description: t('message:text_forgot_password_fail'),
            type: 'danger',
          })
        }
      }
    } catch (e) {
      setLoading(false);
      showMessage({
        message: t('message:text_title_forgot_password'),
        description: e.message,
        type: 'danger',
      });
    }
  };
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
            {t('auth:text_forgot_password')}
          </Text>
        }
      />
      <KeyboardAvoidingView behavior="height">
        <ScrollView>
          <View style={styles.content}>
            <Form
              data={{email}}
              errors={error}
              onValidate={validateForgotPassword}
              setError={(value) => setError(value)}>
              <Text secondary style={styles.description}>
                {t('auth:text_description_forgot')}
              </Text>
              <Input
                label={t('inputs:text_email_address')}
                keyboardType="email-address"
                icon={{
                  name: 'email',
                  size: 20,
                }}
                value={email}
                onChangeText={(value) => setEmail(value)}
                error={error?.email}
              />
              <Button
                title={t('common:text_submit')}
                containerStyle={styles.button}
                loading={loading}
                onPress={clickSubmit}
              />
            </Form>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 25,
  },
  description: {
    marginTop: 12,
    marginBottom: 20,
  },
  button: {
    marginVertical: 25,
  },
});

export default ForgotPassword;
