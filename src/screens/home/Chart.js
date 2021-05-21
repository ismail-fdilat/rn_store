import * as React from 'react';
import {useTheme} from '@react-navigation/native';
import {StyleSheet, View, Dimensions} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {fonts} from 'src/configs/fonts';

const {width} = Dimensions.get('window');
const WIDTH_CHART = width - 50;
const HEIGHT_CHART = (WIDTH_CHART * 206) / 320;

function Chart(props) {
  const {colors} = useTheme();
  const {data} = props;
  const chartConfig = {
    backgroundColor: colors.background,
    backgroundGradientFrom: colors.background,
    backgroundGradientTo: colors.background,
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => colors.border,
    labelColor: (opacity = 1) => colors.secondaryText,
    propsForDots: {
      r: '4',
      strokeWidth: '1',
      stroke: colors.thirdText,
    },
    propsForHorizontalLabels: {
      fontFamily: fonts.regular,
      fontSize: 10,
    },
    propsForVerticalLabels: {
      fontFamily: fonts.regular,
      fontSize: 10,
      y: HEIGHT_CHART - 10,
    },
  };
  return (
    <View
      style={[
        styles.viewChart,
        {
          backgroundColor: colors.background,
        },
      ]}>
      <LineChart
        data={data}
        width={WIDTH_CHART}
        height={HEIGHT_CHART}
        chartConfig={chartConfig}
        bezier
        verticalLabelRotation={-30}
        style={styles.chart}
        xLabelsOffset={25}
        yLabelsOffset={15}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  viewChart: {
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    marginBottom: 40,
  },
  chart: {
    borderRadius: 10,
    overflow: 'hidden',
  },
});

export default Chart;
