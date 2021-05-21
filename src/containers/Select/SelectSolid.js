import * as React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, ViewPropTypes} from 'react-native';
import Text from 'src/components/Text';
import Icon from 'src/components/Icon';

function SelectSolid(props) {
  const {name, textEmpty, style} = props;
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.text} numberOfLines={1}>
        {name || textEmpty}
      </Text>
      <Icon name="chevron-down" size={22} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 7,
    paddingHorizontal: 17,
    minHeight: 46,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    flex: 1,
    marginRight: 10,
  },
});

SelectSolid.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  textEmpty: PropTypes.string,
  style: ViewPropTypes.style,
};

SelectSolid.defaultProps = {
  textEmpty: '',
  style: {},
};

export default SelectSolid;
