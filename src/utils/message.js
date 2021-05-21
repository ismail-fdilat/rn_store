import isObject from 'lodash/isObject';
import isArray from 'lodash/isArray';
import {showMessage as showMessageRNFM} from 'react-native-flash-message';
import {white, red, green, blue, yellow} from 'src/configs/colors';
import {fonts, sizes, lineHeights} from 'src/configs/fonts';

export function showMessage(props) {
  const options = isObject(props) && !isArray(isArray) ? props : {};
  const {type, textStyle, titleStyle, ...rest} = options;
  const backgroundColor =
    type === 'danger'
      ? red
      : type === 'warning'
      ? yellow
      : type === 'success'
      ? green
      : blue;
  showMessageRNFM({
    backgroundColor,
    color: white,
    ...rest,
    type: type || 'default',
    textStyle: [
      {
        fontSize: sizes.h5,
        fontFamily: fonts.regular,
        lineHeight: lineHeights.h5,
      },
      textStyle && textStyle,
    ],
    titleStyle: [
      {
        fontSize: sizes.h4,
        fontFamily: fonts.medium,
        lineHeight: lineHeights.h4,
      },
      titleStyle && titleStyle,
    ],
  });
}
