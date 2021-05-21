import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {
  KeyboardAvoidingView,
  StyleSheet,
  View,
  FlatList,
  Dimensions,
} from 'react-native';
import Header from 'src/components/Header';
import Text from 'src/components/Text';
import Icon from 'src/components/Icon';
import SetupStep1 from './auth/SetupStep1';
import SetupStep2 from './auth/SetupStep2';
import SetupStep3 from './auth/SetupStep3';
import TabSetup from './auth/TabSetup';

import {AuthContext} from 'src/utils/auth-context';

const {width} = Dimensions.get('window');

const contents = {
  SetupStep1,
  SetupStep2,
  SetupStep3,
};

function StoreSetupDokanScreen(props) {
  const {t} = useTranslation();
  const {navigation} = props;

  const {signIn} = React.useContext(AuthContext);
  const [visible, setVisible] = React.useState(0);
  let flatListRef = React.createRef();

  const tabs = [
    {
      value: 'SetupStep1',
      name: t('auth:text_store'),
    },
    {
      value: 'SetupStep2',
      name: t('auth:text_payment'),
    },
    {
      value: 'SetupStep3',
      name: t('auth:text_ready'),
    },
  ];

  const nextStep = () => {
    const to = visible + 1;
    if (to < tabs.length) {
      flatListRef.scrollToOffset({
        offset: to * width,
      });
      setVisible(to);
    }
  };
  const backStep = () => {
    const back = visible - 1;
    if (back >= 0 && back < tabs.length) {
      flatListRef.scrollToOffset({
        offset: back * width,
      });
      setVisible(back);
    }
  };
  const skipStep = () => {
    signIn();
  };
  const doneStep = () => {
    signIn();
  };

  const renderContent = ({item}) => {
    const Component = contents[item.value];
    return (
      <View style={styles.tabContent}>
        <Component
          {...props}
          nextStep={nextStep}
          backStep={backStep}
          skipStep={skipStep}
          doneStep={doneStep}
        />
      </View>
    );
  };

  return (
    <View style={styles.flex}>
      <Header
        leftComponent={
          <Icon name="arrow-left" onPress={() => navigation.goBack()} />
        }
        centerComponent={
          <Text h4 medium>
            {t('auth:text_store_setup')}
          </Text>
        }
      />
      <KeyboardAvoidingView style={styles.flex} behavior="height">
        <TabSetup tabs={tabs} visible={visible} containerStyle={styles.tab} />
        <FlatList
          data={tabs}
          horizontal
          pagingEnabled
          scrollEnabled={false}
          style={styles.flex}
          showsHorizontalScrollIndicator={false}
          ref={(ref) => {
            flatListRef = ref;
          }}
          keyExtractor={(item) => item.value}
          renderItem={renderContent}
        />
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  tab: {
    marginBottom: 20,
    paddingHorizontal: 25,
  },
  tabContent: {
    flex: 1,
    width: width,
  },
});

export default StoreSetupDokanScreen;
