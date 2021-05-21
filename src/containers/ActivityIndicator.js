import * as React from 'react';
import {useTheme} from '@react-navigation/native';
import {ActivityIndicator as ActivityIndicatorRN} from 'react-native';

function ActivityIndicator(props) {
  const {colors} = useTheme();
  return <ActivityIndicatorRN color={colors.primary} {...props} />;
}

export default ActivityIndicator;
