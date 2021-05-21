import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {KeyboardAvoidingView, StyleSheet, View, ScrollView} from 'react-native';
import Header from 'src/components/Header';
import Text from 'src/components/Text';
import Input from 'src/components/Input';
import Button from 'src/components/Button';
import Icon from 'src/components/Icon';
import InputRichText from 'src/containers/InputRichText';

function PolicySetupScreen(props) {
  const {t} = useTranslation();
  const {navigation, route} = props;
  const data = route?.params?.data ?? {};
  const user = route?.params?.user ?? {};

  const [policy, setPolicy] = React.useState({
    wcfm_policy_tab_title: '',
    wcfm_shipping_policy: '',
    wcfm_refund_policy: '',
    wcfm_cancellation_policy: '',
  });
  const onChangeValue = (key, value) => {
    setPolicy({
      ...policy,
      [key]: value,
    });
  };

  return (
    <View style={styles.flex}>
      <Header
        leftComponent={
          <Icon name="arrow-left" onPress={() => navigation.goBack()} />
        }
        centerComponent={
          <Text h4 medium>
            {t('auth:text_third_policy')}
          </Text>
        }
      />
      <KeyboardAvoidingView style={styles.flex} behavior="height">
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <Input
              label={t('inputs:text_policy_label')}
              value={policy.wcfm_policy_tab_title}
              onChangeText={(value) =>
                onChangeValue('wcfm_policy_tab_title', value)
              }
            />
            <InputRichText
              label={t('inputs:text_shipping_policy')}
              value={policy.wcfm_shipping_policy}
              onChangeText={(value) =>
                onChangeValue('wcfm_shipping_policy', value)
              }
            />
            <InputRichText
              label={t('inputs:text_refund_policy')}
              value={policy.wcfm_refund_policy}
              onChangeText={(value) =>
                onChangeValue('wcfm_refund_policy', value)
              }
            />
            <InputRichText
              label={t('inputs:text_return_policy')}
              value={policy.wcfm_cancellation_policy}
              onChangeText={(value) =>
                onChangeValue('wcfm_cancellation_policy', value)
              }
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
              onPress={() =>
                navigation.navigate('SupportSetupScreen', {
                  user,
                  data: {
                    ...data,
                    ...policy,
                  },
                })
              }
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

export default PolicySetupScreen;
