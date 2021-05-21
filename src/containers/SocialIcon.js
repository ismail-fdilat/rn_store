import * as React from 'react';
import PropTypes from 'prop-types';
import {useTheme} from '@react-navigation/native';
import {ViewPropTypes} from 'react-native';
import {Avatar} from 'react-native-elements';
import {blue, red} from 'src/configs/colors';

const typeIcon = {
  'facebook-square': 'font-awesome-5',
  'google-plus': 'font-awesome-5',
  apple: 'font-awesome',
  comments: 'font-awesome',
};

function SocialIcon(props) {
  const {colors} = useTheme();
  const {type, style, onPress} = props;
  const colorIcon = {
    'facebook-square': blue,
    'google-plus': red,
  };
  const styleOver = {
    borderWidth: 1,
    borderColor: colors.secondaryCard,
    backgroundColor: colors.secondaryCard,
  };
  return (
    <Avatar
      size={50}
      rounded
      icon={{
        name: type,
        size: 20,
        type: typeIcon[type],
        color: colorIcon?.[type] ?? colors.text,
      }}
      overlayContainerStyle={styleOver}
      onPress={onPress ?? null}
      containerStyle={style}
    />
  );
}

SocialIcon.propTypes = {
  type: PropTypes.oneOf([
    'facebook-square',
    'google-plus',
    'apple',
    'comments',
  ]),
  style: ViewPropTypes.style,
};

SocialIcon.defaultProps = {
  type: '',
  style: {},
};
export default SocialIcon;
