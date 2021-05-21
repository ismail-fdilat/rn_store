import * as React from 'react';
import {useTheme} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {StyleSheet, ScrollView, View, RefreshControl} from 'react-native';
import {Avatar} from 'react-native-elements';
import Text from 'src/components/Text';
import Dot from 'src/containers/Dot';
import ViewResult from './home/ViewResult';
import Chart from './home/Chart';

import {AuthContext} from 'src/utils/auth-context';
import services from 'src/services/index';

import {darkOrange, navy, cyan, aqua} from 'src/configs/colors';
import {getDate3} from 'src/utils/time';

function HomeScreen(props) {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const insets = useSafeAreaInsets();
  const {user, userToken} = React.useContext(AuthContext);
  const {navigation} = props;
  const [dataSales, setDataSales] = React.useState();
  const [dataReport, setDataReport] = React.useState();
  const [refreshing, setRefreshing] = React.useState(false);

  const propAvatar = user?.avatar
    ? {
        source: {uri: user.avatar},
      }
    : {};
  async function fetchData(query, cb = () => {}) {
    try {
      const response = await services.getSales(query, userToken);
      const getReData = await services.getDataReport(
        {range: '7day'},
        userToken,
      );
      setDataSales(response);
      setDataReport(getReData);
      cb();
    } catch (e) {
      console.log(e);
      cb();
    }
  }
  const onRefresh = () => {
    setRefreshing(true);
    fetchData({}, () => setRefreshing(false));
  };
  React.useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
  const result_gross = getPercent(dataSales?.gross_sales);
  const result_earnings = getPercent(dataSales?.earnings);
  const dataEarning = dataReport?.chart?.total_earned_commission ?? {};
  const dataGross = dataReport?.chart?.total_gross_sales ?? {};

  const data = {
    labels: dataEarning?.labels ?? ['Now'],
    datasets: [
      {
        data: dataEarning?.datas?.map((v) => parseFloat(v)) ?? [0],
        color: (opacity = 1) => colors.primary, // optional
        strokeWidth: 2, // optional
      },
      {
        data: dataGross?.datas?.map((v) => parseFloat(v)) ?? [0],
        color: (opacity = 1) => cyan, // optional
        strokeWidth: 2, // optional
      },
    ],
    legend: [t('home:text_earning'), t('home:text_gross_sale')], // optional
  };

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: colors.secondaryBackground, paddingTop: insets.top},
      ]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.centerHeader}>
              <Text h2 medium numberOfLines={1}>
                {t('home:text_user', {name: user?.display_name})}
              </Text>
              <Text secondary>{getDate3()}</Text>
            </View>
            <View>
              <Avatar
                size={50}
                rounded
                icon={{
                  name: 'account-circle',
                  size: 25,
                  type: 'material-community',
                  color: colors.secondaryText,
                }}
                overlayContainerStyle={{backgroundColor: colors.secondaryCard}}
                onPress={() => navigation.navigate('AccountStack')}
                {...propAvatar}
              />
              <Dot color={colors.error} style={styles.dotAvatar} />
            </View>
          </View>
          <View style={styles.viewTitle}>
            <Text h4 medium>
              {t('home:text_month')}
            </Text>
            <Text
              style={{color: colors.primary}}
              onPress={() =>
                navigation.navigate('ReportScreen', {
                  dataSales,
                  result_gross,
                  result_earnings,
                })
              }>
              {t('home:text_all_report')}
            </Text>
          </View>
          <View style={styles.viewTableInfo}>
            <View style={styles.table}>
              <ViewResult
                title={t('home:text_gross_sale')}
                number={dataSales?.gross_sales?.month ?? 0}
                nameIcon="cash-usd"
                symbol={'$'}
                percent={result_gross.percent ?? 0}
                typePercent={result_gross.type ?? 0}
              />
            </View>
            <View style={styles.table}>
              <ViewResult
                title={t('home:text_earning')}
                number={dataSales?.earnings?.month ?? 0}
                nameIcon="cash-multiple"
                symbol={'$'}
                iconColor={darkOrange}
                titleColor={darkOrange}
                percent={result_earnings.percent ?? 0}
                typePercent={result_earnings.type ?? 0}
              />
            </View>
          </View>
          <View style={[styles.viewTableInfo, styles.tableEnd]}>
            <View style={styles.table}>
              <ViewResult
                title={t('home:text_sold_item')}
                number={dataReport?.total?.total_items ?? 0}
                nameIcon="cube"
                iconColor={colors.success}
                titleColor={colors.success}
              />
            </View>
            <View style={styles.table}>
              <ViewResult
                title={t('home:text_order_received')}
                number={dataReport?.total?.total_orders ?? 0}
                nameIcon="receipt"
                iconColor={aqua}
                titleColor={aqua}
              />
            </View>
          </View>
          <View style={styles.viewTitle}>
            <Text h4 medium>
              {t('home:text_sale_week')}
            </Text>
          </View>
          <Chart data={data} />
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
    paddingHorizontal: 25,
  },
  header: {
    marginBottom: 40,
    paddingTop: 20,
    flexDirection: 'row',
  },
  centerHeader: {
    flex: 1,
  },
  dotAvatar: {
    position: 'absolute',
    top: 3.5,
    left: -4,
  },
  viewTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  viewTableInfo: {
    flexDirection: 'row',
    marginHorizontal: -5,
    marginBottom: 12,
  },
  table: {
    flex: 1,
    marginHorizontal: 5,
  },
  tableEnd: {
    marginBottom: 50,
  },
});

export default HomeScreen;
