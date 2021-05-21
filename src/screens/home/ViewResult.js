import * as React from 'react';
import PropTypes from 'prop-types';
import {useTheme} from '@react-navigation/native';
import {StyleSheet, View, ViewPropTypes} from 'react-native';
import {Avatar} from 'react-native-elements';
import Text from 'src/components/Text';
import Icon from 'src/components/Icon';

function ViewResult(props) {
  const {colors} = useTheme();
  const {
    nameIcon,
    number,
    symbol,
    title,
    percent,
    typePercent,
    iconColor,
    titleColor,
    containerStyle,
  } = props;
  const bgAvatar = iconColor ? iconColor : colors.primary;

  const iconPerCent = typePercent === 'down' ? 'arrow-down' : 'arrow-up';
  const colorPerCent = typePercent === 'down' ? colors.error : colors.success;
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
        },
        containerStyle,
      ]}>
      <View style={styles.viewAvatar}>
        <Avatar
          icon={{
            name: nameIcon,
            type: 'material-community',
            size: 20,
            color: 'white',
          }}
          size={36}
          rounded
          overlayContainerStyle={{backgroundColor: bgAvatar}}
        />
        {percent ? (
          <View style={styles.viewPercent}>
            <Text h6 h6Style={{color: colorPerCent}}>
              {typePercent === 'down' ? '-' : '+'}
              {percent}%
            </Text>
            <Icon name={iconPerCent} size={12} color={colorPerCent} />
          </View>
        ) : null}
      </View>
      <View style={styles.viewNumber}>
        {symbol ? (
          <Text
            medium
            style={[styles.textSymbol, titleColor && {color: titleColor}]}>
            {symbol}
          </Text>
        ) : null}
        <Text
          h2
          medium
          h2Style={[styles.textNumber, titleColor && {color: titleColor}]}>
          {number}
        </Text>
      </View>
      <Text secondary>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.05,
    shadowRadius: 15,
  },
  viewAvatar: {
    marginBottom: 11,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  viewPercent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewNumber: {
    flexDirection: 'row',
  },
  textSymbol: {
    lineHeight: 17,
    marginTop: 3,
  },
  textNumber: {
    flex: 1,
  },
});

ViewResult.propTypes = {
  nameIcon: PropTypes.string.isRequired,
  number: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  symbol: PropTypes.string,
  title: PropTypes.string.isRequired,
  percent: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  typePercent: PropTypes.oneOf(['up', 'down']),
  iconColor: PropTypes.string,
  titleColor: PropTypes.string,
  containerStyle: ViewPropTypes.style,
};

ViewResult.defaultProps = {
  typePercent: 'up',
  containerStyle: {},
};

export default ViewResult;
