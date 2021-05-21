import * as React from 'react';
import {useTheme} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import unset from 'lodash/unset';
import {
  View,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Switch,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Header from 'src/components/Header';
import Text from 'src/components/Text';
import Icon from 'src/components/Icon';
import Input from 'src/components/Input';
import Button from 'src/components/Button';
import InputImage from 'src/containers/InputImage';
import InputRichText from 'src/containers/InputRichText';
import IconRadio from 'src/containers/IconRadio';
import {AuthContext} from 'src/utils/auth-context';
import services from 'src/services/index';
import {showMessage} from 'src/utils/message';
import FilterCategories from './product/FilterCategories';
import filter from 'lodash/filter';
function FormProductScreen(props) {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const {userToken} = React.useContext(AuthContext);

  const {navigation, route} = props;
  const product = route?.params?.data ?? null;
  const typeForm = product ? 'edit' : 'add';

  const dataForm = {
    name: product?.name ?? '',
    regular_price: product?.regular_price ?? '',
    sale_price: product?.sale_price ?? '',
    description: product?.description ?? '',
    sku: product?.sku ?? '',
    stock_quantity: product?.stock_quantity
      ? product.stock_quantity.toString()
      : '0',
    manage_stock: product?.manage_stock ?? false,
    catalog_visibility: product?.catalog_visibility ?? 'visible',
    categories: product?.categories ?? [],
    type: 'simple',
  };
  const [data, setData] = React.useState(dataForm);
  const [visitModal, setVisitModal] = React.useState(false);
  const [image, setImage] = React.useState(product?.images?.[0]?.src ?? '');
  const [categories, setCategories] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const listVisibility = [
    {
      value: 'visible',
      name: t('product:text_shop_search'),
    },
    {
      value: 'catalog',
      name: t('product:text_shop_only'),
    },
    {
      value: 'search',
      name: t('product:text_search_only'),
    },
    {
      value: 'hidden',
      name: t('product:text_hidden'),
    },
  ];
  React.useEffect(() => {
    const fetchCategories = async () => {
      try {
        const dataCategories = await services.getCategories();
        setCategories(dataCategories);
      } catch (e) {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);
  const updateData = (key, value) => {
    setData({
      ...data,
      [key]: value,
    });
  };
  const setModalVisible = (value) => {
    setVisitModal(value);
  };

  const saveProduct = () => {
    setLoading(true);
    if (product) {
      handleUpdate();
    } else {
      handleCreate();
    }
  };

  const handleUpdate = async () => {
    try {
      var dataNew = {...product, ...data, image};
      unset(dataNew, 'attributes');
      // console.log('dataNew', dataNew.attributes);
      await services.updateProduct(product.id, dataNew, userToken,);
      setLoading(false);
      showMessage({
        message: t('message:text_title_update_product'),
        description: t('message:text_update_product'),
        type: 'success',
      });
      if (route?.params?.goBack) {
        route.params.goBack();
      }
      navigation.goBack();
    } catch (e) {
      setLoading(false);
      showMessage({
        message: t('message:text_title_update_product'),
        description: e.message,
        type: 'danger',
      });
    }
  };

  const handleCreate = async () => {
    try {
      await services.addProduct({...data, image}, userToken);
      setLoading(false);
      showMessage({
        message: t('message:text_title_create_product'),
        description: t('message:text_create_product'),
        type: 'success',
      });
      if (route?.params?.goBack) {
        route.params.goBack();
      }
      navigation.goBack();
    } catch (e) {
      setLoading(false);
      showMessage({
        message: t('message:text_title_create_product'),
        description: e.message,
        type: 'danger',
      });
    }
  };

  const deleteCate = (category) => {
    Alert.alert(
      'Delelte categories',
      'Are you sure ?',
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () =>
            updateData(
              'categories',
              filter(data.categories, (s) => s.id !== category.id),
            ),
        },
      ],
      {cancelable: false},
    );
  };
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
            {typeForm === 'edit'
              ? product?.name
              : t('product:text_add_product')}
          </Text>
        }
      />
      <KeyboardAvoidingView behavior="height" style={styles.keyboard}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <View style={styles.viewInput}>
              <Input
                label={t('inputs:text_name')}
                value={data?.name}
                onChangeText={(value) => updateData('name', value)}
              />
              <View style={styles.rowInput}>
                <View style={styles.colInput}>
                  <Input
                    label={t('inputs:text_regular')}
                    value={data?.regular_price}
                    keyboardType="numeric"
                    onChangeText={(value) => updateData('regular_price', value)}
                  />
                </View>
                <View style={styles.colInput}>
                  <Input
                    label={t('inputs:text_sale')}
                    value={data?.sale_price}
                    keyboardType="numeric"
                    onChangeText={(value) => updateData('sale_price', value)}
                  />
                </View>
              </View>
              <View style={styles.rowInput}>
                <View style={styles.colInput}>
                  <Input
                    label={t('inputs:text_sku')}
                    value={data?.sku}
                    onChangeText={(value) => updateData('sku', value)}
                  />
                </View>
                <View style={styles.colInput}>
                  {data?.manage_stock === true ? (
                    <Input
                      label={t('inputs:text_quantity')}
                      value={data?.stock_quantity}
                      keyboardType="numeric"
                      onChangeText={(value) =>
                        updateData('stock_quantity', value)
                      }
                    />
                  ) : null}
                </View>
              </View>
              <View style={styles.viewManager}>
                <Text secondary>{t('product:text_manager_stock')}</Text>
                <Switch
                  value={data?.manage_stock}
                  onValueChange={(value) => updateData('manage_stock', value)}
                />
              </View>
              <InputRichText
                label={t('inputs:text_description')}
                value={data?.description}
                onChangeText={(value) => updateData('description', value)}
              />
              <InputImage
                label={t('inputs:text_image')}
                value={image}
                onChangeImage={(value) => setImage(value)}
              />
              <Text h4 medium style={styles.textCatalog}>
                {t('product:text_Categories')}
              </Text>
              <View style={styles.viewSelectCate}>
                {data.categories.map((category) => (
                  <TouchableOpacity
                    key={category.id}
                    style={styles.btnSelectCate}
                    onPress={() => deleteCate(category)}>
                    <Text key={category.id}>{category.name}</Text>
                    <Icon
                      name="close-circle"
                      size={14}
                      iconStyle={styles.iconClose}
                    />
                  </TouchableOpacity>
                ))}
              </View>
              <View style={{alignItems: 'center'}}>
                <Button
                  title="Select Categories"
                  size="small"
                  secondary
                  buttonStyle={[styles.button, {alignItems: 'center'}]}
                  containerStyle={styles.containerButton}
                  onPress={() => setModalVisible(true)}
                />
              </View>
              <Text h4 medium style={styles.textCatalog}>
                {t('product:text_catalog_visibility')}
              </Text>
              <View
                style={[
                  styles.viewListRadio,
                  {borderColor: colors.secondaryCard},
                ]}>
                {listVisibility.map((visibility) => {
                  const selected =
                    visibility.value === data?.catalog_visibility;
                  return (
                    <TouchableOpacity
                      key={visibility.value}
                      style={styles.touchVisibility}
                      onPress={() =>
                        updateData('catalog_visibility', visibility.value)
                      }>
                      <IconRadio isSelected={selected} />
                      <Text
                        secondary={!selected}
                        style={[
                          styles.textVisibility,
                          selected && {color: colors.primary},
                        ]}>
                        {visibility.name}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
              <Text h6 third>
                {t('product:text_note')}
              </Text>
            </View>
            <Button
              title={
                typeForm === 'edit'
                  ? t('product:text_button_update')
                  : t('product:text_button_add')
              }
              buttonStyle={styles.button}
              containerStyle={styles.containerButton}
              onPress={saveProduct}
              loading={loading}
            />
          </View>
        </ScrollView>
        <FilterCategories
          visitModal={visitModal}
          setModalVisible={setModalVisible}
          categories={categories}
          selectCategory={data.categories}
          clickFilter={(value) => updateData('categories', value)}
        />
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboard: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 25,
    alignItems: 'center',
  },
  viewInput: {
    width: '100%',
  },
  rowInput: {
    flexDirection: 'row',
    marginHorizontal: -6,
  },
  colInput: {
    flex: 1,
    marginHorizontal: 6,
  },
  viewManager: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  textCatalog: {
    marginVertical: 10,
  },
  viewListRadio: {
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    paddingVertical: 13,
  },
  touchVisibility: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6.5,
    paddingHorizontal: 20,
  },
  textVisibility: {
    flex: 1,
    marginLeft: 10,
  },
  button: {
    width: 193,
  },
  containerButton: {
    marginVertical: 26,
  },
  iconClose: {
    marginLeft: 10,
  },
  btnSelectCate: {
    backgroundColor: '#FFFFFF',
    marginLeft: 10,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 4,
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 10,
  },
  viewSelectCate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#F2F2F2',
    borderRadius: 8,
  },
});

export default FormProductScreen;
