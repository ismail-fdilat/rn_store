import * as React from 'react';
import compact from 'lodash/compact';
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
import InputRichText from 'src/containers/InputRichText';
import InputImage from 'src/containers/InputImage';

import {AuthContext} from 'src/utils/auth-context';

import services from 'src/services';
import {getImages} from 'src/services/media_service';
import {showMessage} from 'src/utils/message';

function UpdateStoreScreen(props) {
  const {t} = useTranslation();
  const {user, userToken} = React.useContext(AuthContext);
  const {navigation} = props;
  const [data, setData] = React.useState({});
  const [linkGravatar, setLinkGravatar] = React.useState('');
  const [linkMobileBanner, setLinkMobileBanner] = React.useState('');
  const [linkBanner, setLinkBanner] = React.useState('');
  const [loadingData, setLoadingData] = React.useState(true);
  const [loadingSave, setLoadingSave] = React.useState(false);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const dataResult = await services.getStore(user.ID, userToken);
        if (
          dataResult?.gravatar ||
          dataResult?.mobile_banner ||
          dataResult?.list_banner
        ) {
          const query = {
            include: compact([
              dataResult?.gravatar,
              dataResult?.mobile_banner,
              dataResult?.banner,
            ]),
          };
          const lists = await getImages(query, userToken);
          const imageGravatar = lists.find(
            (i) => i.id === parseInt(dataResult?.gravatar, 10),
          );
          const imageMobileBanner = lists.find(
            (i) => i.id === parseInt(dataResult?.mobile_banner, 10),
          );
          const imageBanner = lists.find(
            (i) => i.id === parseInt(dataResult?.banner, 10),
          );
          if (imageGravatar?.source_url) {
            setLinkGravatar(imageGravatar.source_url);
          }
          if (imageMobileBanner?.source_url) {
            setLinkMobileBanner(imageMobileBanner.source_url);
          }
          if (imageBanner?.source_url) {
            setLinkBanner(imageBanner.source_url);
          }
        }
        setData(dataResult);
        setLoadingData(false);
      } catch (e) {
        console.log('e', e);
        setLoadingData(false);
      }
    }
    fetchData();
  }, [user, userToken]);

  const selectImage = (key, dataImage) => {
    setData({
      ...data,
      [key]: dataImage.id,
    });
    const funcImage =
      key === 'mobile_banner'
        ? setLinkMobileBanner
        : key === 'banner'
        ? setLinkBanner
        : setLinkGravatar;
    funcImage(dataImage.source_url);
  };

  const saveData = async () => {
    try {
      setLoadingSave(true);
      const dataUser = {
        key: 'wcfmmp_profile_settings',
        data: data,
      };
      const dataSave = await services.updateStore(dataUser, userToken);
      if (dataSave) {
        showMessage({
          message: 'Update store',
          description: 'Update store success',
          type: 'success',
        });
      } else {
        showMessage({
          message: 'Update store',
          description: 'Update store fail',
          type: 'danger',
        });
      }
      setLoadingSave(false);
    } catch (e) {
      showMessage({
        message: 'Update store',
        description: e.message,
        type: 'danger',
      });
      setLoadingSave(false);
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
            {t('account:text_general_store')}
          </Text>
        }
      />
      {loadingData ? (
        <ActivityIndicator size="small" />
      ) : (
        <KeyboardAvoidingView behavior="height" style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.content}>
              <Input
                label={t('inputs:text_store_name')}
                isRequired
                value={data?.store_name}
                onChangeText={(value) => {
                  setData({...data, store_name: value});
                }}
              />
              <Input
                label={t('inputs:text_store_email')}
                keyboardType="email-address"
                isRequired
                value={data?.store_email}
                onChangeText={(value) => setData({...data, store_email: value})}
              />
              <Input
                label={t('inputs:text_store_phone')}
                keyboardType="phone-pad"
                value={data?.phone}
                onChangeText={(value) => setData({...data, phone: value})}
              />
              <InputRichText
                label={t('inputs:text_store_description')}
                value={data?.shop_description}
                onChangeText={(value) =>
                  setData({...data, shop_description: value})
                }
              />
              <InputImage
                label={t('inputs:text_store_logo')}
                value={linkGravatar}
                onChangeImage={(value) => selectImage('gravatar', value)}
                typeGet="object"
              />
              <InputImage
                label={t('inputs:text_store_banner')}
                value={linkBanner}
                onChangeImage={(value) => selectImage('banner', value)}
                typeGet="object"
              />
              <InputImage
                label={t('inputs:text_store_mobile_banner')}
                value={linkMobileBanner}
                onChangeImage={(value) => selectImage('mobile_banner', value)}
                typeGet="object"
              />
            </View>
          </ScrollView>
          <View style={[styles.content, styles.footer]}>
            <Button
              title={t('common:text_button_save')}
              onPress={saveData}
              loading={loadingSave}
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
  footer: {
    paddingVertical: 25,
  },
});

export default UpdateStoreScreen;
