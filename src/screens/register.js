import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View, KeyboardAvoidingView, ScrollView} from 'react-native';
import Text from 'src/components/Text';
import Input from 'src/components/Input';
import Icon from 'src/components/Icon';
import Button from 'src/components/Button';
import Header from 'src/components/Header';

import {registerEmail} from 'src/services/auth-service';

import {showMessage} from 'src/utils/message';

function RegisterScreen(props) {
  const {t} = useTranslation();

  const {navigation} = props;

  const [data, setData] = React.useState({
    first_name: '',
    last_name: '',
    name: '',
    email: '',
    password: '',
    role: 'wcfm_vendor',
  });

  const [loading, setLoading] = React.useState(false);
  const changeData = (key, value) => {
    setData({
      ...data,
      [key]: value,
    });
  };

  // const clickRegister = () => {
  //   const result = {
  //     'token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvZm9vZC5ybmxhYi5pbyIsImlhdCI6MTYwMjU3ODk1MSwibmJmIjoxNjAyNTc4OTUxLCJleHAiOjE2MDUxNzA5NTEsImRhdGEiOnsidXNlcl9pZCI6IjE0MDgifX0.0XCDTqvYxY858jXAisxP8cYsvZjCigYXCXlo2yHiIB8',
  //     'user': {
  //       'ID': '1408',
  //       'user_login': 'demo_builder',
  //       'user_pass': '$P$BbtESyuE8XZ9A06RpWmsLY8NO7jPYv/',
  //       'user_nicename': 'demo_builder',
  //       'user_email': 'demo_builder@gmail.com',
  //       'user_url': '',
  //       'user_registered': '2020-10-13 08:49:11',
  //       'user_activation_key': '',
  //       'user_status': '0',
  //       'display_name': 'Demo Builder',
  //       'first_name': 'Demo',
  //       'last_name': 'Builder',
  //       'avatar': 'https://www.gravatar.com/avatar/c65c972033e4756ab3a3ee72d8e29ad2',
  //       'location': '',
  //     },
  //   };
  //   navigation.navigate('StoreSetupScreen', result);
  // };

  const clickRegister = async () => {
    try {
      setLoading(true);
      const result = await registerEmail(JSON.stringify(data));
      console.log('result', JSON.stringify(result));
      setLoading(false);
      navigation.navigate('StoreSetupScreen', result);
    } catch (e) {
      setLoading(false);
      showMessage({
        message: 'Register',
        description: e.message,
        type: 'danger',
      });
    }
  };

  return (
    <KeyboardAvoidingView behavior="height" style={styles.keyboard}>
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
            {t('auth:text_register')}
          </Text>
        }
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={{marginHorizontal: -6, flexDirection: 'row'}}>
            <View style={{flex: 1, marginHorizontal: 6}}>
              <Input
                label={t('inputs:text_first_name_require')}
                icon={{
                  name: 'account',
                  size: 20,
                }}
                value={data.first_name}
                onChangeText={(value) => changeData('first_name', value)}
              />
            </View>
            <View style={{flex: 1, marginHorizontal: 6}}>
              <Input
                label={t('inputs:text_last_name_require')}
                icon={{
                  name: 'account',
                  size: 20,
                }}
                value={data.last_name}
                onChangeText={(value) => changeData('last_name', value)}
              />
            </View>
          </View>
          <Input
            label={t('inputs:text_user')}
            icon={{
              name: 'account',
              size: 20,
            }}
            value={data.name}
            onChangeText={(value) => changeData('name', value)}
          />
          <Input
            label={t('inputs:text_email_address_require')}
            keyboardType="email-address"
            icon={{
              name: 'email',
              size: 20,
            }}
            value={data.email}
            onChangeText={(value) => changeData('email', value)}
          />
          <Input
            label={t('inputs:text_password_require')}
            secureTextEntry
            icon={{
              name: 'lock',
            }}
            value={data.password}
            onChangeText={(value) => changeData('password', value)}
          />
          <Button
            title={t('auth:text_button_register')}
            onPress={clickRegister}
            containerStyle={styles.button}
            loading={loading}
          />
        </View>
      </ScrollView>
      <Text
        style={styles.textLogin}
        onPress={() => navigation.navigate('LoginScreen')}>
        {t('auth:text_have_account')}
      </Text>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboard: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 25,
    marginTop: 10,
  },
  button: {
    marginTop: 25,
  },
  textLogin: {
    marginVertical: 20,
    textAlign: 'center',
  },
});

export default RegisterScreen;
