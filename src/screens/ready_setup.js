
import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View, ScrollView, Image, Dimensions} from 'react-native';
import Header from 'src/components/Header';
import Text from 'src/components/Text';
import Icon from 'src/components/Icon';
import Button from 'src/components/Button';
import {AuthContext} from 'src/utils/auth-context';

const {width} = Dimensions.get('window');
const widthImage = width - 50;

function ReadySetupScreen(props) {
  const {t} = useTranslation();
  const {signInSuccess} = React.useContext(AuthContext);
  const {navigation, route} = props;
  const user = route?.params ?? {};

  return (
    <View style={styles.flex}>
      <Header
        leftComponent={
          <Icon name="arrow-left" onPress={() => navigation.goBack()} />
        }
        centerComponent={
          <Text h4 medium>
            {t('auth:text_ready')}
          </Text>
        }
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Image
            source={require('src/assets/images/vendor_submit.png')}
            style={styles.image}
          />
          <Text h2 medium style={styles.title}>
            {t('auth:text_wel_wcfm')}
          </Text>
          <Text secondary style={styles.description}>
            {t('auth:text_read_description_wcfm')}
          </Text>
          <Button
            title={t('common:text_go_dashboard')}
            containerStyle={styles.buttonView}
            buttonStyle={styles.button}
            onPress={() => signInSuccess(user)}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  content: {
    marginHorizontal: 25,
    marginTop: 30,
  },
  image: {
    width: widthImage,
  },
  title: {
    marginTop: 40,
    marginBottom: 19,
  },
  description: {
    marginBottom: 50,
  },
  buttonView: {
    alignItems: 'center',
  },
  button: {
    paddingHorizontal: 40,
  },
});

export default ReadySetupScreen;
