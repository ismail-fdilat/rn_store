import * as React from 'react';
import {useTheme} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import RNRestart from 'react-native-restart';
import {
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  Dimensions,
  Switch,
  I18nManager,
  Alert,
} from 'react-native';
import {Avatar} from 'react-native-elements';
import Header from 'src/components/Header';
import Icon from 'src/components/Icon';
import Text from 'src/components/Text';
import ListItem from 'src/components/ListItem';
import Badge from 'src/components/Badge';
import Card from 'src/components/Card';
import ModalLanguage from './account/ModalLanguage';
import {AuthContext} from 'src/utils/auth-context';
import {fonts, lineHeights, sizes} from 'src/configs/fonts';
import {getNotifications} from 'src/services/notification-service';
import Rate from 'react-native-rate';
import options from 'src/configs/config_rate';
const {width} = Dimensions.get('window');
const pad = 25;
const WIDTH_IMAGE_BACKGROUND = width - 2 * pad;

const languages = {
  en: {
    code: 'en',
    id: '1',
    native_name: 'English',
    major: '1',
    active: '1',
    default_locale: 'en_US',
    encode_url: '0',
    tag: 'en',
    translated_name: 'English',
    url: 'https://wc.rnlab.io',
    country_flag_url:
      'https://wc.rnlab.io/wp-content/plugins/sitepress-multilingual-cms/res/flags/en.png',
    language_code: 'en',
  },
  ar: {
    code: 'ar',
    id: '5',
    native_name: 'العربية',
    major: '0',
    active: 0,
    default_locale: 'ar',
    encode_url: '0',
    tag: 'ar',
    translated_name: 'Arabic',
    url: 'https://wc.rnlab.io/?lang=ar',
    country_flag_url:
      'https://wc.rnlab.io/wp-content/plugins/sitepress-multilingual-cms/res/flags/ar.png',
    language_code: 'ar',
  },
};

function AccountScreen(props) {
  const {colors} = useTheme();
  const {t, i18n} = useTranslation();

  const {
    signOut,
    setTheme,
    setLanguage,
    user,
    theme,
    language,
  } = React.useContext(AuthContext);

  const {navigation} = props;

  const [isTheme, setIsTheme] = React.useState(theme === 'dark');
  const [lang, setLang] = React.useState(language);
  const [visitModal, setVisitModal] = React.useState(false);

  const currentLanguage = languages[language] || language.en;
  const [countNoUnRead, setCountNoUnRead] = React.useState(0);
  const [rated, setRated] = React.useState(false);
  const {userToken} = React.useContext(AuthContext);
  React.useEffect(() => {
    async function getDataCountNoti() {
      try {
        const dataCountNo = await getNotifications(
          {notification_status: 'unread'},
          userToken,
        );
        setCountNoUnRead(dataCountNo.length);
      } catch (e) {
        console.log(e);
      }
    }
    getDataCountNoti();
  }, [userToken]);

  const clickDarkMode = () => {
    const valueTheme = isTheme ? 'light' : 'dark';
    setIsTheme(!isTheme);
    setTheme(valueTheme);
  };

  const reloadApp = (selectLanguage) => {
    const isRTL = i18n.dir(selectLanguage) === 'rtl';
    I18nManager.forceRTL(isRTL);
    // Reload
    if (isRTL !== I18nManager.isRTL) {
      RNRestart.Restart();
      // Updates.reloadFromCache(); // For expo
    }
  };

  const handleSelectLanguage = (selectLanguage) => {
    setLang(selectLanguage);
    setVisitModal(false);
    setLanguage(selectLanguage);
    setTimeout(() => reloadApp(selectLanguage), 2000);
  };

  const clickLogout = () => {
    Alert.alert(
      t('account:text_title_logout'),
      t('account:text_description_logout'),
      [
        {
          text: t('common:text_ok'),
          onPress: () => signOut(),
        },
        {
          text: t('common:text_cancel'),
          onPress: () => {},
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );
  };

  const propAvatar = user?.avatar
    ? {
        source: {uri: user.avatar},
      }
    : {};
  return (
    <View style={styles.container}>
      <Header
        centerComponent={
          <Text h4 medium>
            {t('account:text_profile')}
          </Text>
        }
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Card secondary style={styles.infoUser}>
            <TouchableOpacity
              style={styles.viewInfo}
              onPress={() => console.log('click info')}>
              <Avatar
                size={80}
                rounded
                icon={{
                  name: 'account-circle',
                  size: 40,
                  type: 'material-community',
                  color: colors.secondaryText,
                }}
                overlayContainerStyle={[
                  styles.avatar,
                  {
                    borderColor: colors.background,
                    backgroundColor: colors.secondaryCard,
                  },
                ]}
                {...propAvatar}
              />
              <View style={styles.rightInfo}>
                <Text secondary>{t('account:text_Hello')}</Text>
                <Text h3 bold>
                  {user?.display_name}
                </Text>
              </View>
              <Icon
                name="login-variant"
                size={20}
                color={colors.secondaryText}
                containerStyle={styles.iconInfo}
                onPress={clickLogout}
              />
            </TouchableOpacity>
          </Card>
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('NotificationScreen')}>
            <View style={styles.leftItem}>
              <Icon name="email-open" color={colors.thirdText} size={22} />
            </View>
            <View style={styles.rightItem}>
              <ListItem
                title={t('account:text_inbox_notification')}
                bottomDivider
                containerStyle={styles.viewItemRight}
                titleStyle={styles.textItem}
                rightElement={
                  <Badge value={countNoUnRead} type="error" size={28} />
                }
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('ReviewScreen')}>
            <View style={styles.leftItem}>
              <Icon name="star-circle" color={colors.thirdText} size={22} />
            </View>
            <View style={styles.rightItem}>
              <ListItem
                title={t('account:text_review')}
                bottomDivider
                containerStyle={styles.viewItemRight}
                titleStyle={styles.textItem}
                rightElement={
                  <Icon name="chevron-right" size={22} isRotateRTL />
                }
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('ReportScreen')}>
            <View style={styles.leftItem}>
              <Icon name="chart-pie" color={colors.thirdText} size={22} />
            </View>
            <View style={styles.rightItem}>
              <ListItem
                title={t('account:text_report')}
                bottomDivider
                containerStyle={styles.viewItemRight}
                titleStyle={styles.textItem}
                rightElement={
                  <Icon name="chevron-right" size={22} isRotateRTL />
                }
              />
            </View>
          </TouchableOpacity>
          <Text h4 medium secondary h4Style={styles.textTitle}>
            {t('account:text_setting')}
          </Text>
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('SettingStoreScreen')}>
            <View style={styles.leftItem}>
              <Icon name="cog" color={colors.thirdText} size={22} />
            </View>
            <View style={styles.rightItem}>
              <ListItem
                title={t('account:text_setting_store')}
                bottomDivider
                containerStyle={styles.viewItemRight}
                titleStyle={styles.textItem}
                rightElement={
                  <Icon name="chevron-right" size={22} isRotateRTL />
                }
              />
            </View>
          </TouchableOpacity>
          <View style={styles.item}>
            <View style={styles.leftItem}>
              <Icon name="opacity" color={colors.thirdText} size={22} />
            </View>
            <View style={styles.rightItem}>
              <ListItem
                title={t('account:text_dark_mode')}
                bottomDivider
                containerStyle={styles.viewItemRight}
                titleStyle={styles.textItem}
                rightElement={
                  <Switch value={isTheme} onValueChange={clickDarkMode} />
                }
              />
            </View>
          </View>
          <TouchableOpacity
            style={styles.item}
            onPress={() => setVisitModal(true)}>
            <View style={styles.leftItem}>
              <Icon name="translate" color={colors.thirdText} size={22} />
            </View>
            <View style={styles.rightItem}>
              <ListItem
                title={t('account:text_language')}
                bottomDivider
                containerStyle={styles.viewItemRight}
                titleStyle={styles.textItem}
                rightElement={
                  <View style={styles.viewLanguage}>
                    <Text h6 secondary h6Style={styles.textLanguage}>
                      {currentLanguage.translated_name ||
                        currentLanguage.native_name}
                    </Text>
                    <Icon name="chevron-right" size={20} isRotateRTL />
                  </View>
                }
              />
            </View>
          </TouchableOpacity>
          <View style={styles.item}>
            <View style={styles.leftItem}>
              <Icon name="star" color={colors.thirdText} size={22} />
            </View>
            <View style={styles.rightItem}>
              <ListItem
                title={t('account:text_rate')}
                bottomDivider
                containerStyle={styles.viewItemRight}
                titleStyle={styles.textItem}
                onPress={() => {
                  Rate.rate(options, (success) => {
                    if (success) {
                      // this technically only tells us if the user successfully went to the Review Page. Whether they actually did anything, we do not know.
                      setRated({rated: true});
                    }
                  });
                }}
              />
            </View>
          </View>
          <View style={[styles.item, styles.itemFooter]}>
            <View style={styles.leftItem} />
            <View style={styles.rightItem}>
              <Text h6 third>
                {t('account:text_version')}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <ModalLanguage
        visitModal={visitModal}
        setModalVisible={(value) => setVisitModal(value)}
        clickShow={handleSelectLanguage}
        valueSelect={lang}
        languages={languages}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: pad,
  },
  infoUser: {
    borderRadius: 10,
    marginBottom: 20,
  },
  bgImage: {
    width: WIDTH_IMAGE_BACKGROUND,
    marginBottom: 10,
  },
  viewInfo: {
    padding: 20,
    paddingRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    borderWidth: 2,
  },
  rightInfo: {
    flex: 1,
    marginLeft: 20,
  },
  iconInfo: {
    marginRight: 9,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftItem: {
    width: 41,
    alignItems: 'flex-start',
  },
  rightItem: {
    flex: 1,
  },
  viewItemRight: {
    minHeight: 62,
  },
  textItem: {
    fontFamily: fonts.regular,
    fontSize: sizes.h5,
    lineHeight: lineHeights.h5,
  },
  viewLanguage: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textLanguage: {
    marginRight: 2,
  },
  itemFooter: {
    marginVertical: 20,
  },
  textTitle: {
    marginTop: 30,
    marginBottom: 20,
  },
});

export default AccountScreen;