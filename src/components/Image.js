import * as React from 'react';
import {useTheme} from '@react-navigation/native';
import {ViewPropTypes} from 'react-native';
import {Image as ImageRNE} from 'react-native-elements';

function Image(props) {
  const {colors} = useTheme();
  const {placeholderStyle, ...rest} = props;
  return (
    <ImageRNE
      {...rest}
      placeholderStyle={[
        {backgroundColor: colors.secondaryCard},
        placeholderStyle,
      ]}
    />
  );
}

Image.propTypes = {
  placeholderStyle: ViewPropTypes.style,
};

Image.defaultProps = {
  placeholderStyle: {},
};

export default Image;
