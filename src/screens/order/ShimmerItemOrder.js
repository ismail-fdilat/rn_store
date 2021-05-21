import * as React from 'react';
import {useTheme} from '@react-navigation/native';
import {View, ViewPropTypes, Animated} from 'react-native';
import Icon from 'src/components/Icon';

const HEIGHT = 115;

function ShimmerItemOrder() {
  const [opacity] = React.useState(new Animated.Value(0.3));
  const {colors} = useTheme();

  React.useEffect(() => {
    function animateOpacity() {
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.5,
          duration: 600,
          useNativeDriver: true,
        }),
      ]).start(() => {
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 600,
          useNativeDriver: true,
        }).start(animateOpacity);
      });
    }
    animateOpacity();
  }, [opacity]);

  return (
    <Animated.View style={[styles.container, {opacity}]}>
      <Icon name="receipt" color={colors.border} containerStyle={styles.icon} />
      <View style={styles.right(colors.border)}>
        <View style={styles.viewNumber}>
          <View style={[styles.line(colors.border), styles.orderId]} />
          <View style={[styles.line(colors.border), styles.status]} />
        </View>
        <View style={[styles.line(colors.border), styles.time]} />
        <View style={[styles.line(colors.border), styles.product]} />
      </View>
    </Animated.View>
  );
}

const styles = {
  container: {
    height: HEIGHT,
    flexDirection: 'row',
  },
  icon: {
    paddingVertical: 15,
  },
  right: (borderColor) => ({
    height: '100%',
    flex: 1,
    marginLeft: 25,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor,
  }),
  line: (color) => ({
    backgroundColor: color,
    borderRadius: 2,
  }),
  viewNumber: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 13,
  },
  orderId: {
    height: 22,
    width: 60,
  },
  status: {
    height: 18,
    width: 80,
  },
  time: {
    height: 18,
  },
  product: {
    height: 24,
    marginTop: 5,
  },
};

ShimmerItemOrder.propTypes = {
  style: ViewPropTypes.style,
};

export const height = HEIGHT;
export default ShimmerItemOrder;
