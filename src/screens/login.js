import * as React from 'react';
import {useTheme} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {
  StyleSheet,
  ScrollView,
  View,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
import Text from 'src/components/Text';
import Button from 'src/components/Button';
import Input from 'src/components/Input';
import Form from 'src/components/Form';
import SocialLogin from './auth/SocialLogin';

import {AuthContext} from 'src/utils/auth-context';
import {validateLogin} from 'src/validates/auth-validate';

const SOCIAL_LOGIN = false;
const REGISTER = true;

function LoginScreen(props) {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const {signIn, isLoading} = React.useContext(AuthContext);
  const {navigation} = props;
  // store vendor(wcfm)
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState({});

  const clickLogin = () => {
    const validate = validateLogin({username, password});
    setError(validate);
    if (Object.values(validate).length < 1) {
      signIn({username, password});
    }
  };

  return (
    <KeyboardAvoidingView behavior="height" style={styles.keyboard}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Image
            source={require('src/assets/images/logo.png')}
            style={styles.logo}
          />
          <Text h1 medium h1Style={styles.textWelcome}>
            {t('auth:text_welcome')}
          </Text>
          <Image
            source={require('src/assets/images/vector.png')}
            style={styles.vector}
          />
          <Form
            data={{username, password}}
            errors={error}
            onValidate={validateLogin}
            setError={(value) => setError(value)}>
            <View style={styles.fullWidth}>
              <Input
                label={t('inputs:text_user_email')}
                keyboardType="email-address"
                icon={{
                  name: 'account',
                  size: 20,
                }}
                value={username}
                onChangeText={(value) => setUsername(value)}
                error={error.username}
              />
              <Input
                label={t('inputs:text_password')}
                secureTextEntry
                icon={{
                  name: 'lock',
                }}
                containerStyle={styles.inputPassword}
                value={password}
                onChangeText={(value) => setPassword(value)}
                error={error.password}
              />
            </View>
            <View style={[styles.fullWidth, styles.viewForgot]}>
              <Text
                h6
                h6Style={{color: colors.primary}}
                onPress={() => navigation.navigate('ForgotPasswordScreen')}
              >
                {t('auth:text_forgot')}
              </Text>
            </View>
            <Button
              title={t('auth:text_button_login')}
              onPress={clickLogin}
              buttonStyle={styles.buttonSignIn}
              containerStyle={styles.containerButtonSignIn}
              loading={isLoading}
            />
          </Form>
          {SOCIAL_LOGIN && (
            <>
              <Text secondary style={styles.textSocial}>
                {t('auth:text_login_social')}
              </Text>
              <SocialLogin style={styles.viewSocial} />
            </>
          )}
        </View>
      </ScrollView>
      {REGISTER && (
        <Text
          secondary
          style={styles.textRegister}
          onPress={() => navigation.navigate('RegisterScreen')}>
          {t('auth:text_no_account')} <Text>{t('auth:text_sign_up')}</Text>
        </Text>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboard: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 26,
    alignItems: 'center',
  },
  logo: {
    marginTop: 94,
  },
  textWelcome: {
    marginVertical: 19,
  },
  vector: {
    marginBottom: 50,
  },
  fullWidth: {
    width: '100%',
  },
  inputPassword: {
    marginBottom: 6,
  },
  viewForgot: {
    alignItems: 'flex-end',
    marginBottom: 30,
  },
  buttonSignIn: {
    width: 148,
  },
  containerButtonSignIn: {
    marginVertical: 23,
  },
  textSocial: {
    marginBottom: 18,
  },
  viewSocial: {
    marginBottom: 30,
  },
  textRegister: {
    marginVertical: 20,
    textAlign: 'center',
  },
});

export default LoginScreen;
