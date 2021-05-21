import * as React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, ViewPropTypes} from 'react-native';
import Text from 'src/components/Text';
import Icon from 'src/components/Icon';

function SelectUnderline(props) {
  const {name, textEmpty, label, style} = props;
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.text} third={!name} numberOfLines={1}>
        {name || textEmpty || label}
      </Text>
      <Icon name="chevron-down" size={22} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 7,
    minHeight: 38,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    flex: 1,
    marginRight: 10,
  },
});

SelectUnderline.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  textEmpty: PropTypes.string,
  style: ViewPropTypes.style,
};

SelectUnderline.defaultProps = {
  textEmpty: '',
  style: {},
};

export default SelectUnderline;
