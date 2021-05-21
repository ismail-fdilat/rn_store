import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {ScrollView, StyleSheet, View} from 'react-native';
import Button from 'src/components/Button';
import Payment from './Payment';

function SetupStep2(props) {
  const {t} = useTranslation();
  const {nextStep, backStep} = props;

  const onChangeDataPayment = (data) => {};

  const handleNext = () => {
    nextStep();
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.padding}>
          <Payment onChange={onChangeDataPayment} />
        </View>
      </ScrollView>
      <View style={[styles.footer, styles.padding]}>
        <View style={styles.viewButton}>
          <Button
            title={t('auth:text_skip')}
            size="small"
            secondary
            onPress={backStep}
          />
        </View>
        <View style={styles.viewButton}>
          <Button
            title={t('auth:text_get_start')}
            size="small"
            onPress={handleNext}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  padding: {
    paddingHorizontal: 25,
    marginTop: 10,
  },
  footer: {
    flexDirection: 'row',
    marginHorizontal: -10,
    marginVertical: 25,
  },
  viewButton: {
    flex: 1,
    paddingHorizontal: 10,
  },
});

export default SetupStep2;
