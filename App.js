/**
 * Store Manager App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import * as React from 'react';

import OneSignal from 'react-native-onesignal';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useTranslation} from 'react-i18next';
import includes from 'lodash/includes';
import {StatusBar} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import FlashMessage from 'react-native-flash-message';
import AsyncStorage from '@react-native-community/async-storage';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import GettingStartScreen from './src/screens/getting-start';
import HomeScreen from './src/screens/home';
import LoginScreen from './src/screens/login';
import RegisterScreen from './src/screens/register';
import StoreSetupScreen from './src/screens/store-setup';
import StoreSetupDokanScreen from './src/screens/store-setup-dokan';
import PaymentSetupScreen from './src/screens/payment_setup';
import PolicySetupScreen from './src/screens/policy_setup';
import SupportSetupScreen from './src/screens/support_setup';
import SeoSetupScreen from './src/screens/seo_setup';
import SocialSetupScreen from './src/screens/social_setup';
import ReadySetupScreen from './src/screens/ready_setup';
import ForgotPasswordScreen from './src/screens/forgot_password';
import ProductScreen from './src/screens/product';
import ChatScreen from './src/screens/chat';
import OrderScreen from './src/screens/order';
import AccountScreen from './src/screens/account';
import FormProductScreen from './src/screens/form-product';
import ReviewScreen from './src/screens/review';
import ReviewDetailScreen from './src/screens/review-detail';
import NotificationScreen from './src/screens/notification';
import OrderDetailScreen from './src/screens/order-detail';
import SettingStoreScreen from './src/screens/setting-store';
import UpdateStoreScreen from './src/screens/update-store';
import UpdatePersonScreen from './src/screens/update_person';
import UpdateAddressScreen from './src/screens/update_address';
import UpdateSocialScreen from './src/screens/update_social';
import UpdatePaymentScreen from './src/screens/update_payment';
import ChatVendorDetailScreen from './src/screens/chat_detail';
import ReportScreen from './src/screens/report';

import TabBar from './src/containers/TabBar';

import {AuthContext} from './src/utils/auth-context';
import {themeLight, themeDark} from './src/configs/themes';
import {loginWithEmail} from './src/services/auth-service';

import {showMessage} from './src/utils/message';
import {PLUGIN_VENDOR_INSTALLED, DOKAN} from './src/services/index';

import './src/config-i18n';
import {ONE_SIGNAL_APP_ID} from './src/configs/constant';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const regex = /(<([^>]+)>)/gi;

const options = {
  headerShown: false,
};

const AuthStack = () => (
  <Stack.Navigator screenOptions={options}>
    <Stack.Screen name="LoginScreen" component={LoginScreen} />
    <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
    <Stack.Screen name="StoreSetupScreen" component={StoreSetupScreen} />
    <Stack.Screen name="PaymentSetupScreen" component={PaymentSetupScreen} />
    <Stack.Screen name="PolicySetupScreen" component={PolicySetupScreen} />
    <Stack.Screen name="SupportSetupScreen" component={SupportSetupScreen} />
    <Stack.Screen name="SeoSetupScreen" component={SeoSetupScreen} />
    <Stack.Screen name="SocialSetupScreen" component={SocialSetupScreen} />
    <Stack.Screen name="ReadySetupScreen" component={ReadySetupScreen} />
    <Stack.Screen
      name="ForgotPasswordScreen"
      component={ForgotPasswordScreen}
    />
  </Stack.Navigator>
);
const AuthStackDokan = () => (
  <Stack.Navigator screenOptions={options}>
    <Stack.Screen name="LoginScreen" component={LoginScreen} />
    <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
    <Stack.Screen name="StoreSetupScreen" component={StoreSetupDokanScreen} />
    <Stack.Screen
      name="ForgotPasswordScreen"
      component={ForgotPasswordScreen}
    />
  </Stack.Navigator>
);

const AccountStack = () => (
  <Stack.Navigator screenOptions={options}>
    <Stack.Screen name="AccountScreen" component={AccountScreen} />
    <Stack.Screen name="ReviewScreen" component={ReviewScreen} />
    <Stack.Screen name="ReviewDetailScreen" component={ReviewDetailScreen} />
    <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
  </Stack.Navigator>
);

function MainTab() {
  return (
    <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      <Tab.Screen name="ProductScreen" component={ProductScreen} />
      <Tab.Screen name="OrderScreen" component={OrderScreen} />
      <Tab.Screen name="ChatScreen" component={ChatScreen} />
      <Tab.Screen name="AccountStack" component={AccountStack} />
    </Tab.Navigator>
  );
}

function App() {
  OneSignal.init(ONE_SIGNAL_APP_ID);

  const {i18n} = useTranslation();

  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            isLoading: false,
            userToken: action.token,
            user: action.user,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isLoading: true,
          };
        case 'SIGN_IN_SUCCESS':
          return {
            ...prevState,
            isLoading: false,
            userToken: action.token,
            user: action.user,
          };
        case 'SIGN_IN_ERROR':
          return {
            ...prevState,
            isLoading: false,
            error: action.error,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignOut: true,
            userToken: null,
            user: {},
            error: null,
          };
        case 'SET_THEME':
          return {
            ...prevState,
            theme: action.theme,
          };
        case 'SET_LANGUAGE':
          return {
            ...prevState,
            language: action.language,
          };
        case 'CLOSE_GETTING_START':
          return {
            ...prevState,
            isGetting: false,
          };
      }
    },
    {
      isLoading: false,
      isSignOut: false,
      isGetting: true,
      userToken: null,
      user: {},
      theme: 'light',
      language: 'en',
    },
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      try {
        const userJson = await AsyncStorage.getItem('user');
        const isGetting = await AsyncStorage.getItem('isGetting');
        const theme = await AsyncStorage.getItem('theme');
        const language = await AsyncStorage.getItem('language');

        if (userJson) {
          // After restoring token, we may need to validate it in production apps

          // This will switch to the App screen or Auth screen and this loading
          // screen will be unmounted and thrown away.
          const {token, user} = JSON.parse(userJson);
          dispatch({type: 'RESTORE_TOKEN', token, user});
        }
        if (isGetting === 'f') {
          dispatch({type: 'CLOSE_GETTING_START'});
        }
        if (theme) {
          dispatch({type: 'SET_THEME', theme: theme});
        }
        if (language) {
          dispatch({type: 'SET_LANGUAGE', language});
        }
        SplashScreen.hide();
      } catch (e) {
        // Restoring token failed
      }
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async ({username, password}) => {
        dispatch({type: 'SIGN_IN'});
        try {
          const {token, user} = await loginWithEmail(
            JSON.stringify({username, password}),
          );
          const roles = user?.roles ?? [];
          if (includes(roles, 'wcfm_vendor')) {
            await AsyncStorage.setItem('user', JSON.stringify({token, user}));
            dispatch({type: 'SIGN_IN_SUCCESS', token, user});
            showMessage({
              message: 'Login',
              description: 'Login Success',
              type: 'success',
            });
          } else {
            showMessage({
              message: 'Login',
              description: 'Role account must a store vendor',
              type: 'danger',
            });
          }
        } catch (error) {
          showMessage({
            message: 'Login',
            description: error.message.replace(regex, ''),
            type: 'danger',
          });
          dispatch({type: 'SIGN_IN_ERROR', error});
        }
      },
      signInSuccess: async ({token, user}) => {
        await AsyncStorage.setItem('user', JSON.stringify({token, user}));
        dispatch({type: 'SIGN_IN_SUCCESS', token, user});
        showMessage({
          message: 'Login',
          description: 'Login Success',
          type: 'success',
        });
      },
      signOut: async () => {
        try {
          await AsyncStorage.removeItem('user');
          dispatch({type: 'SIGN_OUT'});
        } catch (e) {
          console.log(e);
        }
      },
      signUp: async (data, cb) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token
        // const token = 'dummy-auth-token';
        // await AsyncStorage.setItem('user', token);
        // dispatch({type: 'SIGN_IN', token: token});
        // cb();
      },
      setTheme: async (value) => {
        await AsyncStorage.setItem('theme', value);
        dispatch({type: 'SET_THEME', theme: value});
      },
      setLanguage: async (data) => {
        await AsyncStorage.setItem('language', data);
        dispatch({type: 'SET_LANGUAGE', language: data});
      },
      closeGettingStart: async () => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token
        await AsyncStorage.setItem('isGetting', 'f');
        dispatch({type: 'CLOSE_GETTING_START'});
      },
    }),
    [],
  );

  // set language
  if (i18n.language !== state.language) {
    i18n.changeLanguage(state.language);
  }

  const barStyle = state.theme === 'light' ? 'dark-content' : 'light-content';
  const themeData = state.theme === 'dark' ? themeDark : themeLight;

  return (
    <NavigationContainer theme={themeData}>
      <SafeAreaProvider>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle={barStyle}
        />
        <AuthContext.Provider value={{...authContext, ...state}}>
          <Stack.Navigator>
            {state.isGetting ? (
              <Stack.Screen
                options={options}
                name="GettingStartScreen"
                component={GettingStartScreen}
              />
            ) : !state.userToken ? (
              <Stack.Screen
                options={{
                  ...options,
                  animationEnabled: false,
                }}
                name="AuthStack"
                component={
                  PLUGIN_VENDOR_INSTALLED === DOKAN ? AuthStackDokan : AuthStack
                }
              />
            ) : (
              <>
                <Stack.Screen
                  options={{
                    ...options,
                    animationEnabled: false,
                  }}
                  name="MainTab"
                  component={MainTab}
                />
                <Stack.Screen
                  options={options}
                  name="FormProductScreen"
                  component={FormProductScreen}
                />
                <Stack.Screen
                  options={options}
                  name="OrderDetailScreen"
                  component={OrderDetailScreen}
                />
                <Stack.Screen
                  options={options}
                  name="SettingStoreScreen"
                  component={SettingStoreScreen}
                />
                <Stack.Screen
                  options={options}
                  name="UpdateStoreScreen"
                  component={UpdateStoreScreen}
                />
                <Stack.Screen
                  options={options}
                  name="UpdatePersonScreen"
                  component={UpdatePersonScreen}
                />
                <Stack.Screen
                  options={options}
                  name="UpdateAddressScreen"
                  component={UpdateAddressScreen}
                />
                <Stack.Screen
                  options={options}
                  name="UpdateSocialScreen"
                  component={UpdateSocialScreen}
                />
                <Stack.Screen
                  options={options}
                  name="UpdatePaymentScreen"
                  component={UpdatePaymentScreen}
                />
                <Stack.Screen
                  options={options}
                  name="ChatVendorDetailScreen"
                  component={ChatVendorDetailScreen}
                />
                <Stack.Screen
                  options={options}
                  name="ReportScreen"
                  component={ReportScreen}
                />
              </>
            )}
          </Stack.Navigator>
        </AuthContext.Provider>
      </SafeAreaProvider>
      <FlashMessage position="top" />
    </NavigationContainer>
  );
}

export default App;
