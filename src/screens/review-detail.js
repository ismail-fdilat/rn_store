import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import {StyleSheet, View, ScrollView} from 'react-native';
import {Avatar} from 'react-native-elements';
import Header from 'src/components/Header';
import Text from 'src/components/Text';
import Icon from 'src/components/Icon';
import Badge from 'src/components/Badge';
import Button from 'src/components/Button';
import {getTimeDate} from 'src/utils/time';

function ReviewDetailScreen(props) {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const {navigation, route} = props;
  const data = route?.params?.data ?? null;
  if (!data) {
    return (
      <View style={[styles.container, styles.viewEmpty]}>
        <Text>Empty</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Header
        leftComponent={
          <Icon
            name="arrow-left"
            onPress={() => navigation.goBack()}
            isRotateRTL
          />
        }
        centerComponent={
          <Text h4 medium>
            {t('account:text_detail_review')}
          </Text>
        }
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.info}>
            <Avatar
              source={{uri: data.author_image}}
              size={60}
              rounded
              icon={{
                name: 'account-circle',
                size: 40,
                type: 'material-community',
                color: colors.secondaryText,
              }}
              overlayContainerStyle={{backgroundColor: colors.secondaryCard}}
            />
            <View style={styles.rightInfo}>
              <View style={styles.viewName}>
                <Text h4 medium style={styles.textName}>
                  {data.author_name}
                </Text>
                <Badge
                  value={data?.review_rating ?? '0'}
                  icon
                  type={
                    parseInt(data?.rating ?? '0', 10) === 5
                      ? 'success'
                      : 'warning'
                  }
                />
              </View>
              <Text h6 third>
                {getTimeDate(data.created)}
              </Text>
            </View>
          </View>
          <Text secondary style={styles.textContent}>
            {data.review_description}
          </Text>
        </View>
      </ScrollView>
      <View style={styles.viewButton}>
        <Button
          title={t('account:text_button_approve_review')}
          buttonStyle={styles.button}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewEmpty: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    paddingHorizontal: 25,
  },
  info: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  rightInfo: {
    flex: 1,
    marginLeft: 20,
  },
  viewName: {
    flexDirection: 'row',
    marginBottom: 7,
  },
  textName: {
    flex: 1,
    marginRight: 12,
  },
  textContent: {
    marginBottom: 12,
  },
  viewButton: {
    marginBottom: 33,
    marginTop: 20,
    alignItems: 'center',
  },
  button: {
    width: 196,
  },
});

export default ReviewDetailScreen;
