import * as React from 'react';
import PropTypes from 'prop-types';
import {useTheme} from '@react-navigation/native';
import {StyleSheet, View, ViewPropTypes} from 'react-native';
import Text from 'src/components/Text';
import {cyan} from 'src/configs/colors';

function TabSetup(props) {
  const {colors} = useTheme();

  const {tabs, visible, containerStyle} = props;
  const currentVisible = visible >= tabs.length ? 0 : visible;

  const dotColor = 'transparent';
  const dotColorSelect = cyan;
  const dotBorder = colors.secondaryText;
  const dotBorderSelect = colors.primary;
  const line = colors.border;
  const lineSelect = colors.primary;

  return (
    <View style={containerStyle}>
      <View style={styles.viewDot}>
        {tabs.map((tab, index) => (
          <View key={tab.value} style={index > 0 && styles.itemLine}>
            {index > 0 ? (
              <View
                style={[
                  styles.line,
                  {backgroundColor: line},
                  index <= currentVisible && {backgroundColor: lineSelect},
                ]}
              />
            ) : null}
            <View
              style={[
                styles.dot,
                {backgroundColor: dotColor, borderColor: dotBorder},
                index <= currentVisible && {
                  backgroundColor: dotColorSelect,
                  borderColor: dotBorderSelect,
                },
              ]}
            />
          </View>
        ))}
      </View>
      <View style={styles.viewName}>
        {tabs.map((tab, index) => (
          <Text
            key={tab.value}
            secondary
            style={[
              styles.name,
              currentVisible === index && {color: colors.primary},
              index > 0 && styles.nameCenter,
              index === tabs.length - 1 && styles.nameEnd,
            ]}>
            {tab.name}
          </Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewDot: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemLine: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  line: {
    height: 2,
    flex: 1,
  },
  dot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 4,
  },
  viewName: {
    flexDirection: 'row',
    marginTop: 5,
  },
  name: {
    flex: 1,
  },
  nameCenter: {
    textAlign: 'center',
  },
  nameEnd: {
    textAlign: 'right',
  },
});

TabSetup.propTypes = {
  tabs: PropTypes.array.isRequired,
  visible: PropTypes.number,
  containerStyle: ViewPropTypes.style,
};

TabSetup.defaultProps = {
  tabs: [],
  visible: 0,
  containerStyle: {},
};

export default TabSetup;
