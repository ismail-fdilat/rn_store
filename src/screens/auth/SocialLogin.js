import * as React from 'react';
import {StyleSheet, View, ViewPropTypes} from 'react-native';
import SocialIcon from 'src/containers/SocialIcon';

function SocialLogin(props) {
  return (
    <View style={[styles.viewSocial, props.style]}>
      <SocialIcon type="facebook-square" style={styles.iconSocial} />
      <SocialIcon type="google-plus" style={styles.iconSocial} />
      <SocialIcon type="comments" style={styles.iconSocial} />
      <SocialIcon type="apple" style={styles.iconSocial} />
    </View>
  );
}

const styles = StyleSheet.create({
  viewSocial: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  iconSocial: {
    marginHorizontal: 8.5,
  },
});

SocialLogin.propTypes = {
  style: ViewPropTypes.style,
};

SocialLogin.defaultProps = {
  style: {},
};

export default SocialLogin;
