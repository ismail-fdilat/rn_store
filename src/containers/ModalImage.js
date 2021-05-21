import * as React from 'react';
import {useTheme} from '@react-navigation/native';
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Image from 'src/components/Image';
import Modal from 'src/components/Modal';
import Card from 'src/components/Card';
import Button from 'src/components/Button';
import Icon from 'src/components/Icon';
import ActivityIndicator from './ActivityIndicator';

import {AuthContext} from 'src/utils/auth-context';

import {getImages} from 'src/services/media_service';

const {width} = Dimensions.get('window');
const col = 3;
const pad = 25;
const SIZE_ITEM = (width - 2 * pad - (col - 1) * 12) / col;

class ModalImage extends React.Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      valueSelect: props?.selectImage ?? '',
      page: 1,
      loading: true,
      loadingMore: false,
      refreshing: false,
    };
  }
  componentDidMount() {
    if (this.props.visible) {
      this.fetchImage();
    }
  }

  componentDidUpdate(prevProps) {
    const {visible, selectImage} = this.props;
    if (
      visible !== prevProps.visible &&
      selectImage !== this.state.valueSelect
    ) {
      this.setValueSelect(selectImage);
    }
    if (!prevProps.visible && visible) {
      this.handleLoad();
    }
  }
  setValueSelect = (value) => {
    this.setState({
      valueSelect: value,
    });
  };

  fetchImage = async () => {
    try {
      const {page} = this.state;
      const query = {
        author: this?.context?.user?.ID,
        page: page,
        per_page: 6,
      };
      const userToken = this?.context?.userToken ?? '';
      const data = await getImages(query, userToken);
      if (data.length <= 6 && data.length > 0) {
        this.setState((prevState) => ({
          images:
            page === 1 ? Array.from(data) : [...prevState.images, ...data],
          loading: false,
          loadingMore: data.length === 6,
          refreshing: false,
        }));
      } else {
        this.setState({
          loadingMore: false,
          loading: false,
          refreshing: false,
        });
      }
    } catch (e) {
      this.setState({
        loading: false,
        loadingMore: false,
        refreshing: false,
      });
    }
  };

  renderFooter = () => {
    if (!this.state.loadingMore) {
      return null;
    }

    return (
      <View>
        <ActivityIndicator animating size="small" />
      </View>
    );
  };

  handleRefresh = () => {
    this.setState(
      {
        page: 1,
        refreshing: true,
      },
      () => {
        this.fetchImage();
      },
    );
  };

  handleLoadMore = () => {
    const {loadingMore} = this.state;

    if (loadingMore) {
      this.setState(
        (prevState) => ({
          page: prevState.page + 1,
          loadingMore: true,
        }),
        this.fetchImage,
      );
    }
  };

  handleLoad = () => {
    this.setState(
      {
        images: [],
        page: 1,
        loading: true,
        loadingMore: false,
        refreshing: false,
      },
      this.fetchImage,
    );
  };

  changeImage = () => {
    const {setModalVisible, onChange, typeGet} = this.props;
    const {images, valueSelect} = this.state;
    const data =
      typeGet === 'object'
        ? images.find((image) => image.source_url === valueSelect)
        : valueSelect;
    if (data && onChange) {
      onChange(data);
      setModalVisible(false);
    }
  };

  render() {
    const {visible, setModalVisible, selectImage, theme} = this.props;
    const {loading, images, refreshing, valueSelect} = this.state;
    const {colors} = theme;
    return (
      <Modal
        visible={visible}
        setModalVisible={setModalVisible}
        minRatio={0.7}
        maxRatio={0.7}>
        {loading ? (
          <View style={styles.loading}>
            <ActivityIndicator />
          </View>
        ) : (
          <>
            <FlatList
              data={images}
              renderItem={({item}) => (
                <Card
                  Component={TouchableOpacity}
                  secondary
                  style={[
                    styles.card,
                    {
                      width: SIZE_ITEM,
                      height: SIZE_ITEM,
                    },
                    {borderColor: colors.border},
                    item?.source_url === valueSelect && styles.cardSelect,
                    item?.source_url === valueSelect && {
                      borderColor: colors.primary,
                    },
                  ]}
                  onPress={() =>
                    this.setState({valueSelect: item?.source_url})
                  }>
                  <Image
                    source={{uri: item?.source_url}}
                    style={{width: SIZE_ITEM, height: SIZE_ITEM}}
                    PlaceholderContent={<ActivityIndicator size="small" />}
                  />
                  {item?.source_url === valueSelect ? (
                    <Icon
                      name="check"
                      color={colors.primary}
                      containerStyle={styles.check}
                    />
                  ) : null}
                </Card>
              )}
              keyExtractor={(item, index) => index.toString()}
              numColumns={3}
              columnWrapperStyle={styles.containerWrap}
              showsVerticalScrollIndicator={false}
              onEndReached={this.handleLoadMore}
              onEndReachedThreshold={0.5}
              ListFooterComponent={this.renderFooter}
              refreshing={refreshing}
              onRefresh={this.handleRefresh}
            />
            <Button
              title="Select Image"
              containerStyle={styles.button}
              disabled={!valueSelect || valueSelect === selectImage}
              onPress={this.changeImage}
            />
          </>
        )}
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  loading: {
    marginVertical: 12,
  },
  card: {
    borderWidth: 1,
    borderRadius: 8,
    marginHorizontal: 6,
    overflow: 'hidden',
  },
  cardSelect: {
    borderWidth: 2,
  },
  check: {
    position: 'absolute',
    top: 6,
    right: 6,
  },
  containerWrap: {
    paddingHorizontal: pad,
    marginBottom: 15,
    marginHorizontal: -6,
  },
  button: {
    marginHorizontal: pad,
    marginVertical: pad,
  },
});

ModalImage.propTypes = {};

ModalImage.defaultProps = {};

export default function ModalImageComponent(props) {
  const theme = useTheme();
  return <ModalImage {...props} theme={theme} />;
}
