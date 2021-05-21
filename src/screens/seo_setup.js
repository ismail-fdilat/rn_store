import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {KeyboardAvoidingView, StyleSheet, View, ScrollView} from 'react-native';
import Header from 'src/components/Header';
import Text from 'src/components/Text';
import Input from 'src/components/Input';
import Button from 'src/components/Button';
import Icon from 'src/components/Icon';
import InputImage from 'src/containers/InputImage';
import {settingProfile} from 'src/services/auth-service';
import {showMessage} from 'src/utils/message';

function SeoSetupScreen(props) {
  const {t} = useTranslation();
  const {navigation, route} = props;

  const data = route?.params?.data ?? {};
  const user = route?.params?.user ?? {};

  const [seo, setSeo] = React.useState({
    'wcfmmp-seo-meta-title': '',
    'wcfmmp-seo-meta-desc': '',
    'wcfmmp-seo-meta-keywords': '',
    'wcfmmp-seo-og-title': '',
    'wcfmmp-seo-og-desc': '',
    'wcfmmp-seo-og-image': '',
    'wcfmmp-seo-twitter-title': '',
    'wcfmmp-seo-twitter-desc': '',
    'wcfmmp-seo-twitter-image': '',
  });
  const [logoFace, setLogoFace] = React.useState('');
  const [logoTwitter, setLogoTwitter] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const onChangeValue = (key, value) => {
    setSeo({
      ...seo,
      [key]: value,
    });
  };
  const clickSave = async () => {
    try {
      setLoading(true);
      const resultData = {
        ...data,
        store_seo: seo,
      };
      await settingProfile(
        JSON.stringify({
          key: 'wcfmmp_profile_settings',
          data: resultData,
        }),
        user.token,
      );
      const {
        wcfm_policy_tab_title,
        wcfm_shipping_policy,
        wcfm_refund_policy,
        wcfm_cancellation_policy,
      } = resultData;
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
            {t('auth:text_fifth_seo')}
          </Text>
        }
      />
      <KeyboardAvoidingView style={styles.flex} behavior="height">
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <Input
              label={t('inputs:text_seo_title')}
              value={seo['wcfmmp-seo-meta-title']}
              onChangeText={(value) =>
                onChangeValue('wcfmmp-seo-meta-title', value)
              }
            />
            <Input
              label={t('inputs:text_seo_description')}
              multiline
              value={seo['wcfmmp-seo-meta-desc']}
              onChangeText={(value) =>
                onChangeValue('wcfmmp-seo-meta-desc', value)
              }
            />
            <Input
              label={t('inputs:text_seo_meta')}
              multiline
              value={seo['wcfmmp-seo-meta-keywords']}
              onChangeText={(value) =>
                onChangeValue('wcfmmp-seo-meta-keywords', value)
              }
            />
            <Text h2 medium h2Style={styles.title}>
              {t('auth:text_facebook_setup')}
            </Text>
            <Input
              label={t('inputs:text_seo_face_title')}
              value={seo['wcfmmp-seo-og-title']}
              onChangeText={(value) =>
                onChangeValue('wcfmmp-seo-og-title', value)
              }
            />
            <Input
              label={t('inputs:text_seo_face_description')}
              multiline
              value={seo['wcfmmp-seo-og-desc']}
              onChangeText={(value) =>
                onChangeValue('wcfmmp-seo-og-desc', value)
              }
            />
            <InputImage
              label={t('inputs:text_seo_face_image')}
              value={logoFace}
              onChangeImage={(value) => {
                onChangeValue(
                  'wcfmmp-seo-og-image',
                  value?.id?.toString() ?? '',
                );
                setLogoFace(value?.source_url ?? '');
              }}
            />
            <Text h2 medium h2Style={styles.title}>
              {t('auth:text_twitter_setup')}
            </Text>
            <Input
              label={t('inputs:text_seo_twitter_title')}
              value={seo['wcfmmp-seo-twitter-title']}
              onChangeText={(value) =>
                onChangeValue('wcfmmp-seo-twitter-title', value)
              }
            />
            <Input
              label={t('inputs:text_seo_twitter_description')}
              multiline
              value={seo['wcfmmp-seo-twitter-desc']}
              onChangeText={(value) =>
                onChangeValue('wcfmmp-seo-twitter-desc', value)
              }
            />
            <InputImage
              label={t('inputs:text_seo_twitter_image')}
              value={logoTwitter}
              onChangeImage={(value) => {
                onChangeValue(
                  'wcfmmp-seo-twitter-image',
                  value?.id?.toString() ?? '',
                );
                setLogoTwitter(value?.source_url ?? '');
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
              // onPress={() =>
              //   navigation.navigate('SocialSetupScreen', {
              //     user,
              //     data: {
              //       ...data,
              //       store_seo: seo,
              //     },
              //   })
              // }
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
  title: {
    marginTop: 25,
    marginBottom: 20,
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

export default SeoSetupScreen;
