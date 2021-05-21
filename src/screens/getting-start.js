import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import concat from 'lodash/concat';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  Animated,
  Dimensions,
} from 'react-native';
import Header from 'src/components/Header';
import Text from 'src/components/Text';
import Button from 'src/components/Button';
import {AuthContext} from 'src/utils/auth-context';
const {width} = Dimensions.get('window');
const pad = 40;
const widthImage = width - 2 * pad;
const heightImage = (widthImage * 278) / 300;

function GettingStartScreen() {
  const {closeGettingStart} = React.useContext(AuthContext);
  const {colors} = useTheme();
  const {t} = useTranslation();
  const [scrollX] = React.useState(new Animated.Value(0));
  const scrollRef = React.useRef(null);
  const [current, setCurrent] = React.useState(0);
  const data = [
    {
      image: require('src/assets/images/getting-1.png'),
      title: t('getting_start:title_1'),
      subTitle: t('getting_start:description_1'),
    },
    {
      image: require('src/assets/images/getting-2.png'),
      title: t('getting_start:title_2'),
      subTitle: t('getting_start:description_2'),
    },
    {
      image: require('src/assets/images/getting-3.png'),
      title: t('getting_start:title_3'),
      subTitle: t('getting_start:description_3'),
    },
  ];
  const clickScroll = () => {
    const currentTo = current + 1;
    if (currentTo === data.length) {
      closeGettingStart();
    } else {
      if (scrollRef?.current?.scrollTo) {
        scrollRef.current.scrollTo({
          x: currentTo * width,
          y: 0,
          animated: true,
        });
        setCurrent(currentTo);
      }
    }
  };
  const position = Animated.divide(scrollX, width);
  let dots = [];

  for (let i = 0; i < data.length; i++) {
    let sizeDot = position.interpolate({
      inputRange: [i - 1, i, i + 1],
      outputRange: [6, 26, 6],
      extrapolate: 'clamp',
    });
    let colorDot = position.interpolate({
      inputRange: [i - 1, i, i + 1],
      outputRange: [colors.border, colors.primary, colors.border],
      extrapolate: 'clamp',
    });
    dots = concat(
      dots,
      <Animated.View
        key={i}
        style={[
          styles.dot,
          {
            width: sizeDot,
            backgroundColor: colorDot,
          },
        ]}
      />,
    );
  }
  return (
    <View style={styles.container}>
      <Header
        rightComponent={
          <Text style={styles.textSkip} onPress={closeGettingStart}>
            Skip
          </Text>
        }
      />
      <View style={styles.container}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled={true}
          scrollEnabled={true}
          scrollEventThrottle={16}
          ref={scrollRef}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {
              listener: (event) => {
                const indexScroll = Math.round(
                  event.nativeEvent.contentOffset.x / width,
                );
                if (current !== indexScroll) {
                  setCurrent(indexScroll);
                }
              },
              useNativeDriver: false,
            },
            {useNativeDriver: false},
          )}>
          {data.map((value, index) => (
            <View key={index} style={styles.item}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.viewInfo}>
                  <Image source={value.image} style={styles.image} />
                  <View style={styles.viewTextItem}>
                    <Text
                      medium
                      h2
                      h2Style={[styles.textItem, styles.textTitle]}>
                      {value.title}
                    </Text>
                    <Text secondary style={styles.textItem}>
                      {value.subTitle}
                    </Text>
                  </View>
                </View>
              </ScrollView>
            </View>
          ))}
        </ScrollView>
      </View>
      <View style={styles.footer}>
        <Button
          title={current < data.length - 1 ? 'Next' : 'Get Start'}
          onPress={clickScroll}
          buttonStyle={styles.button}
          containerStyle={styles.containerButton}
        />
        <View style={styles.viewDot}>{dots.map((dot) => dot)}</View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textSkip: {
    paddingHorizontal: 5,
  },
  footer: {
    alignItems: 'center',
  },
  button: {
    width: 142,
  },
  containerButton: {
    marginBottom: 40,
    marginTop: 20,
  },
  viewDot: {
    flexDirection: 'row',
    marginBottom: 36,
  },
  dot: {
    height: 6,
    marginHorizontal: 3,
    borderRadius: 3,
  },
  item: {
    height: '100%',
    width,
  },
  viewInfo: {
    paddingHorizontal: pad,
  },
  image: {
    width: widthImage,
    height: heightImage,
  },
  viewTextItem: {
    alignItems: 'center',
    marginVertical: 40,
  },
  textItem: {
    textAlign: 'center',
  },
  textTitle: {
    marginBottom: 10,
  },

  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default GettingStartScreen;
