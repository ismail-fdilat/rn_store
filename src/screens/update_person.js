import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {
  StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';
import Header from 'src/components/Header';
import Text from 'src/components/Text';
import Input from 'src/components/Input';
import Icon from 'src/components/Icon';
import Button from 'src/components/Button';
import InputImage from 'src/containers/InputImage';
import services from 'src/services/index';
import {AuthContext} from 'src/utils/auth-context';
import {showMessage} from 'src/utils/message';
function UpdatePersonScreen(props) {
  const {t} = useTranslation();
  const {navigation} = props;
  const {userToken, user} = React.useContext(AuthContext);
  const [data, setData] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [loadingData, setLoadingData] = React.useState(true);
  React.useEffect(() => {
    const getProfile = async (query) => {
      try {
        const dataProfile = await services.getProfile(query, userToken);
        const dataForm = {
          first_name: dataProfile?.first_name ?? '',
          last_name: dataProfile?.last_name ?? '',
          email: dataProfile?.email ?? '',
          avatar_url: dataProfile?.avatar_url ?? '',
        };
        setData(dataForm);
        setLoadingData(false);
      } catch (e) {
        console.log(e);
        setLoadingData(false);
      }
    };
    getProfile();
  }, [userToken]);
  const updateData = (key, value) => {
    setData({
      ...data,
      [key]: value,
    });
  };

  const saveProfile = async () => {
    try {
      setLoading(true);
      const result = await services.updateProfile(user.ID, data, userToken);
      showMessage({
        message: t('message:text_title_update_personal'),
        description: t('message:text_update_personal'),
        type: 'success',
      });
      setLoading(false);
    } catch (e) {
      showMessage({
        message: 'Update personal',
        description: e.message,
        type: 'danger',
      });
      setLoading(false);
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
            {t('account:text_personal')}
          </Text>
        }
      />
      {loadingData ? (
        <ActivityIndicator size="small" />
      ) : (
        <KeyboardAvoidingView behavior="height" style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.content}>
              <View style={styles.rowInput}>
                <View style={styles.colInput}>
                  <Input
                    value={data?.first_name}
                    onChangeText={(value) => updateData('first_name', value)}
                    label={t('inputs:text_first_name')}
                  />
                </View>
                <View style={styles.colInput}>
                  <Input
                    value={data?.last_name}
                    onChangeText={(value) => updateData('last_name', value)}
                    label={t('inputs:text_last_name')}
                  />
                </View>
              </View>
              <Input
                label={t('inputs:text_email')}
                keyboardType="email-address"
                isRequired
                value={data?.email}
                onChangeText={(value) => updateData('email', value)}
              />
              {/* <Input label={t('inputs:text_phone')} keyboardType="phone-pad" />
            <Input label={t('inputs:text_password')} secureTextEntry />
            <Input label={t('inputs:text_about')} multiline /> */}
              <InputImage
                label={t('inputs:text_avatar')}
                value={data?.avatar_url}
                onChangeImage={(value) => updateData('avatar_url', value)}
              />
            </View>
          </ScrollView>
          <View style={[styles.content, styles.footer]}>
            <Button
              title={t('common:text_button_save')}
              onPress={saveProfile}
              loading={loading}
            />
          </View>
        </KeyboardAvoidingView>
      )}
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
  rowInput: {
    flexDirection: 'row',
    marginHorizontal: -6,
  },
  colInput: {
    flex: 1,
    marginHorizontal: 6,
  },
  footer: {
    paddingVertical: 25,
  },
});

export default UpdatePersonScreen;
