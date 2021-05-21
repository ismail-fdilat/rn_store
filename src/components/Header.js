import * as React from 'react';
import {StyleSheet, ViewPropTypes} from 'react-native';
import {Header as HeaderRNE} from 'react-native-elements';

function Header(props) {
  const {containerStyle, ...rest} = props;
  return (
    <HeaderRNE
      backgroundColor="transparent"
      {...rest}
      containerStyle={[styles.header, containerStyle]}
    />
  );
}
const styles = StyleSheet.create({
  header: {
    borderBottomWidth: 0,
    paddingHorizontal: 20,
  },
});

Header.propTypes = {
  containerStyle: ViewPropTypes.style,
};

Header.defaultProps = {
  containerStyle: {},
};

export default Header;
