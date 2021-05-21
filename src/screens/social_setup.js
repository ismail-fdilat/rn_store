import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {KeyboardAvoidingView, StyleSheet, View, ScrollView} from 'react-native';
import Header from 'src/components/Header';
import Text from 'src/components/Text';
import Input from 'src/components/Input';
import Button from 'src/components/Button';
import Icon from 'src/components/Icon';

import {settingProfile} from 'src/services/auth-service';
import {showMessage} from 'src/utils/message';

function SocialSetupScreen(props) {
  const {t} = useTranslation();
  const {navigation, route} = props;
  const data = route?.params?.data ?? {};
  const user = route?.params?.user ?? {};

  const [loading, setLoading] = React.useState(false);

  const clickSave = async () => {
    try {
      setLoading(true);
      await settingProfile(
        JSON.stringify({
          key: 'wcfmmp_profile_settings',
          data: data,
        }),
        user.token,
      );
      const {
        wcfm_policy_tab_title,
        wcfm_shipping_policy,
        wcfm_refund_policy,
        wcfm_cancellation_policy,
      } = data;
      await settingProfile(
        JSON.stringify({
          key: 'wcfm_policy_vendor_options',
          data: {
            policy_tab_title: wcfm_policy_tab_title,
            shipping_policy: wcfm_shipping_policy,
            refund_policy: wcfm_refund_policy,
            cancellation_policy: wcfm_cancellation_policy,
          },
        }),
        user.token,
      );
      await settingProfile(
        JSON.stringify({
          key: '_store_setup',
          data: 'yes',
        }),
        user.token,
      );
      navigation.navigate('ReadySetupScreen', user);
    } catch (e) {
      showMessage({
        message: 'Register',
        description: e.message,
        type: 'danger',
      });
      setLoading(false);
    }
  };

  return (
    <View style={styles.flex}>
      <Header
        leftComponent={
          <Icon name="arrow-left" onPress={() => navigation.goBack()} />
        }
        centerComponent={
          <Text h4 medium>
            {t('auth:text_sixth_social')}
          </Text>
        }
      />
      <KeyboardAvoidingView style={styles.flex} behavior="height">
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <Input
              label={t('inputs:text_twitter')}
              icon={{
                name: 'twitter',
              }}
            />
            <Input
              label={t('inputs:text_facebook')}
              icon={{
                name: 'facebook',
              }}
            />
            <Input
              label={t('inputs:text_instagram')}
              icon={{
                name: 'instagram',
              }}
            />
            <Input
              label={t('inputs:text_youtube')}
              icon={{
                name: 'youtube',
              }}
            />
            <Input
              label={t('inputs:text_linkedin')}
              icon={{
                name: 'linkedin',
              }}
            />
            <Input
              label={t('inputs:text_google')}
              icon={{
                name: 'google-plus',
              }}
            />
            <Input
              label={t('inputs:text_snapchat')}
              icon={{
                name: 'snapchat',
              }}
            />
            <Input
              label={t('inputs:text_pinterest')}
              icon={{
                name: 'pinterest',
              }}
            />
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
              loading={loading}
              onPress={clickSave}
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

export default SocialSetupScreen;
