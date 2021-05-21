import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {Image, ScrollView, StyleSheet, View, Dimensions} from 'react-native';
import Text from 'src/components/Text';
import Button from 'src/components/Button';

const {width} = Dimensions.get('window');
const pad = 25;
const WIDTH_IMAGE = width - 2 * pad;
const HEIGHT_IMAGE = (WIDTH_IMAGE * 221) / 324;

function SetupStep3(props) {
  const {t} = useTranslation();
  const {doneStep} = props;
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Image
            source={require('src/assets/images/vendor_submit.png')}
            style={styles.image}
          />
          <View style={styles.viewText}>
            <Text h2 medium h2Style={styles.textTitle}>
              {t('auth:text_wel')}
            </Text>
            <Text secondary>{t('auth:text_ready_description')}</Text>
          </View>
          <Button
            title={t('common:text_go_dashboard')}
            containerStyle={styles.button}
            onPress={doneStep}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: pad,
    marginTop: 20,
  },
  image: {
    width: WIDTH_IMAGE,
    height: HEIGHT_IMAGE,
  },
  viewText: {
    marginVertical: 40,
  },
  textTitle: {
    marginBottom: 20,
  },
  button: {
    marginBottom: 25,
  },
});
export default SetupStep3;
