import * as React from 'react';
import {useTheme} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View, ScrollView, ActivityIndicator} from 'react-native';
import Header from 'src/components/Header';
import Icon from 'src/components/Icon';
import Text from 'src/components/Text';
import ViewResult from './home/ViewResult';

import services from 'src/services';
import {AuthContext} from 'src/utils/auth-context';

import {darkOrange} from 'src/configs/colors';

const getPercent = (data) => {
  const last_month = parseFloat(data?.last_month ?? '0');
  const month = parseFloat(data?.month ?? '0');
  const dis = month - last_month;
  const per = (dis / last_month) * 100;
  return {
    type: per > 0 ? 'up' : 'down',
    percent: per > 0 ? per.toFixed(2) : -per.toFixed(2),
  };
};

function ReportScreen(props) {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const {userToken} = React.useContext(AuthContext);
  const {navigation, route} = props;
  const dataSales = route?.params?.dataSales;
  const result_gross = route?.params?.result_gross;
  const result_earnings = route?.params?.result_earnings;
  const [sale, setSale] = React.useState(dataSales);
  const [gross, setGross] = React.useState(result_gross);
  const [earning, setEarning] = React.useState(result_earnings);
  const [loading, setLoading] = React.useState(!sale || !gross || !earning);
  React.useEffect(() => {
    async function fetchData() {
      try {
        if (loading) {
          const response = await services.getSales({}, userToken);
          const data_gross = getPercent(response?.gross_sales);
          const data_earnings = getPercent(response?.earnings);
          setSale(response);
          setEarning(data_gross);
          setGross(data_earnings);
          setLoading(false);
        }
      } catch (e) {
        setLoading(false);
      }
    }
    fetchData();
  }, [loading, userToken])

  return (
    <View
      style={[styles.container, {backgroundColor: colors.secondaryBackground}]}>
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
            {t('home:text_report')}
          </Text>
        }
      />
      {loading ? (
        <View>
          <ActivityIndicator size="small" color={colors.primary} />
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <View style={styles.title}>
              <Text h4 medium>
                {t('home:text_last_week')}
              </Text>
            </View>
            <View style={styles.viewTableInfo}>
              <View style={styles.table}>
                <ViewResult
                  title={t('home:text_gross_sale')}
                  number={sale?.gross_sales?.week ?? 0}
                  nameIcon="cash-usd"
                  symbol={'$'}
                  typePercent="up"
                />
              </View>
              <View style={styles.table}>
                <ViewResult
                  title={t('home:text_earning')}
                  number={sale?.earnings?.week ?? 0}
                  nameIcon="cash-multiple"
                  symbol={'$'}
                  iconColor={darkOrange}
                  titleColor={darkOrange}
                  typePercent="up"
                />
              </View>
            </View>
            <View style={styles.title}>
              <Text h4 medium>
                {t('home:text_month')}
              </Text>
            </View>
            <View style={styles.viewTableInfo}>
              <View style={styles.table}>
                <ViewResult
                  title={t('home:text_gross_sale')}
                  number={sale?.gross_sales?.month ?? 0}
                  nameIcon="cash-usd"
                  symbol={'$'}
                  percent={gross.percent ?? 0}
                  typePercent={gross.type ?? 0}
                />
              </View>
              <View style={styles.table}>
                <ViewResult
                  title={t('home:text_earning')}
                  number={sale?.earnings?.month ?? 0}
                  nameIcon="cash-multiple"
                  symbol={'$'}
                  iconColor={darkOrange}
                  titleColor={darkOrange}
                  percent={earning.percent ?? 0}
                  typePercent={earning.type ?? 0}
                />
              </View>
            </View>
            <View style={styles.title}>
              <Text h4 medium>
                {t('home:text_last_month')}
              </Text>
            </View>
            <View style={styles.viewTableInfo}>
              <View style={styles.table}>
                <ViewResult
                  title={t('home:text_gross_sale')}
                  number={sale?.gross_sales?.last_month ?? 0}
                  nameIcon="cash-usd"
                  symbol={'$'}
                />
              </View>
              <View style={styles.table}>
                <ViewResult
                  title={t('home:text_earning')}
                  number={sale?.earnings?.last_month ?? 0}
                  nameIcon="cash-multiple"
                  symbol={'$'}
                  iconColor={darkOrange}
                  titleColor={darkOrange}
                />
              </View>
            </View>
          </View>
        </ScrollView>
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
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  viewTableInfo: {
    flexDirection: 'row',
    marginHorizontal: -5,
    marginBottom: 20,
  },
  table: {
    flex: 1,
    marginHorizontal: 5,
  },
});

export default ReportScreen;
