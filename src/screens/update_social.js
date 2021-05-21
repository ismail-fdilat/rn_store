import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View, ScrollView, KeyboardAvoidingView} from 'react-native';
import Header from 'src/components/Header';
import Text from 'src/components/Text';
import Input from 'src/components/Input';
import Icon from 'src/components/Icon';
import Button from 'src/components/Button';

function UpdateSocialScreen(props) {
  const {t} = useTranslation();
  const {navigation} = props;

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
            {t('account:text_social')}
          </Text>
        }
      />
      <KeyboardAvoidingView behavior="height" style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <Input label={t('inputs:text_twitter')} />
            <Input label={t('inputs:text_facebook')} />
            <Input label={t('inputs:text_instagram')} />
            <Input label={t('inputs:text_youtube')} />
            <Input label={t('inputs:text_linkedin')} />
            <Input label={t('inputs:text_google')} />
            <Input label={t('inputs:text_snapchat')} />
            <Input label={t('inputs:text_pinterest')} />
          </View>
        </ScrollView>
        <View style={[styles.content, styles.footer]}>
          <Button title={t('common:text_button_save')} />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 25,
  },
  footer: {
    paddingVertical: 25,
  },
});

export default UpdateSocialScreen;
