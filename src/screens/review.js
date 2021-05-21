import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, FlatList, View} from 'react-native';
import Header from 'src/components/Header';
import Text from 'src/components/Text';
import Icon from 'src/components/Icon';
import ItemReview from './review/ItemReview';
import services from 'src/services/index';
import {AuthContext} from 'src/utils/auth-context';

function ReviewScreen(props) {
  const {t} = useTranslation();
  const {navigation} = props;
  const [dataViews, setDataViews] = React.useState();
  const {userToken} = React.useContext(AuthContext);
  React.useEffect(() => {
    async function getDataViews(query) {
      try {
        const reViewsData = await services.getAllReviews(query, userToken);
        setDataViews(reViewsData);
      } catch (e) {
        console.log(e);
      }
    }
    getDataViews();
  }, [userToken]);
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
            {t('account:text_review')}
          </Text>
        }
      />
      <FlatList
        data={dataViews}
        renderItem={({item}) => (
          <ItemReview item={item} containerStyle={styles.item} />
        )}
        keyExtractor={(item) => item.author_id.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    marginHorizontal: 25,
  },
});

export default ReviewScreen;
