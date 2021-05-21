import React, {Component} from 'react';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import {
  StyleSheet,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import PhoneInput from 'react-native-phone-input';
import Modal from 'src/components/Modal';
import ViewLabel from 'src/components/ViewLabel';
import ListItem from 'src/components/ListItem';
import Icon from 'src/components/Icon';
import Text from 'src/components/Text';
import Search from 'src/containers/Search';

import {fonts, lineHeights, sizes} from 'src/configs/fonts';
import {INITIAL_COUNTRY} from 'src/configs/config-input-phone-number';

class InputMobile extends Component {
  constructor() {
    super();
    this.state = {
      isModal: false,
      pickerData: [],
      search: '',
    };
  }
  componentDidMount() {
    this.getData();
  }
  getData = () => {
    this.setState({
      pickerData: this.phone.getPickerData(),
      placeholder: `+${this.phone.getCountryCode()}`,
    });
  };

  onPressFlag = () => {
    this.setState({
      isModal: true,
    });
  };
  changeCountry = (country) => {
    this.phone.selectCountry(country.iso2);
    this.setState(
      {
        isModal: false,
        placeholder: country.dialCode,
      },
      () => {
        if (this.props.value) {
          this.changePhone(this.props.value);
        }
      },
    );
  };
  changePhone = (value) => {
    const {onChangePhoneNumber} = this.props;
    const placeholder = `+${this.phone.getCountryCode()}`;
    if (placeholder !== this.state.placeholder) {
      this.setState({
        placeholder,
      });
    }
    if (onChangePhoneNumber) {
      const countryCode = this.phone.getCountryCode();
      onChangePhoneNumber({
        value,
        code: countryCode ? `+${countryCode}` : countryCode,
      });
    }
  };
  updateSearch = (search) => {
    this.setState({search});
  };
  showNameCode = (dataCountry = []) => {
    const isoCode = this?.phone?.getISOCode() ?? INITIAL_COUNTRY;
    const selectCountry = dataCountry.find((value) => value.iso2 === isoCode);
    return selectCountry?.dialCode ? (
      <Text>{selectCountry.dialCode}</Text>
    ) : null;
  };

  renderInput = (textPropsComponent) => {
    const {type, offset, theme} = this.props;
    const {pickerData, search} = this.state;

    const {colors} = theme;

    const dataCountry = pickerData.filter(
      (country) =>
        country.label.toLowerCase().indexOf(search.toLowerCase()) >= 0,
    );

    return (
      <View style={styles.textComponent}>
        <TouchableOpacity style={styles.viewCode} onPress={this.onPressFlag}>
          <Icon
            name="chevron-down"
            size={16}
            color={colors.secondaryText}
            containerStyle={styles.iconChevron}
          />
          {this.showNameCode(dataCountry)}
        </TouchableOpacity>
        <View style={[styles.viewInput, {marginLeft: offset}]}>
          <TextInput
            {...textPropsComponent}
            style={[
              textPropsComponent.style,
              styles.textInput,
              type === 'underline' && styles.textInputUnderLine,
            ]}
          />
        </View>
      </View>
    );
  };
  render() {
    const {
      type,
      label,
      error,
      style,
      textStyle,
      flagStyle,
      textProps,
      placeholder,
      offset,
      theme,
      t,
      ...rest
    } = this.props;
    const {pickerData, search, isModal} = this.state;
    const {colors} = theme;

    const dataCountry = pickerData.filter(
      (country) =>
        country.label.toLowerCase().indexOf(search.toLowerCase()) >= 0,
    );
    return (
      <View style={styles.container}>
        <ViewLabel label={label} error={error} type={type}>
          <PhoneInput
            style={StyleSheet.flatten([styles.input, style && style])}
            textStyle={[
              styles.input,
              type === 'underline' && styles.input,
              {
                color: colors.text,
              },
              textStyle,
            ]}
            flagStyle={StyleSheet.flatten([
              styles.flag,
              type === 'underline' && styles.flagUnderline,
              flagStyle && flagStyle,
            ])}
            {...rest}
            offset={1}
            textComponent={this.renderInput}
            textProps={{
              placeholder,
              placeholderTextColor: colors.thirdText,
              ...textProps,
            }}
            onChangePhoneNumber={this.changePhone}
            ref={(ref) => {
              this.phone = ref;
            }}
            onPressFlag={this.onPressFlag}
          />
        </ViewLabel>
        <Modal
          visible={isModal}
          setModalVisible={() => this.setState({isModal: false})}
          minRatio={0.5}>
          <View style={styles.viewModal}>
            <Search
              cancelButton={false}
              placeholder={t('common:text_select_country')}
              onChangeText={this.updateSearch}
              value={search}
              onClear={() => this.setState({search: ''})}
              containerStyle={styles.search}
            />
            {dataCountry && dataCountry.length > 0 ? (
              <FlatList
                data={dataCountry}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => (
                  <ListItem
                    title={`(${item.dialCode})${item.label}`}
                    onPress={() => this.changeCountry(item)}
                    titleStyle={[
                      styles.text,
                      item.iso2 === this.phone.getISOCode() && {
                        color: colors.primary,
                      },
                    ]}
                    bottomDivider
                    leftElement={
                      <Image
                        source={item.image}
                        resizeMode="stretch"
                        style={styles.flag}
                      />
                    }
                    rightIcon={
                      item.iso2 === this.phone.getISOCode()
                        ? {name: 'check', size: 20, color: colors.primary}
                        : null
                    }
                  />
                )}
                initialNumToRender={15}
                keyExtractor={(item) => item.key.toString()}
              />
            ) : null}
          </View>
        </Modal>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  input: {
    height: 46,
    marginLeft: 0,
    fontFamily: fonts.regular,
    fontSize: sizes.h5,
    lineHeight: lineHeights.h5,
  },
  inputUnderline: {
    height: 38,
  },
  textInput: {
    paddingRight: 14,
    lineHeight: 0,
  },
  textInputUnderLine: {
    paddingRight: 0,
  },
  flag: {
    width: 21,
    height: 14,
    borderWidth: 0,
    borderRadius: 0,
    marginLeft: 14,
  },
  flagUnderline: {
    marginLeft: 0,
  },
  search: {
    paddingVertical: 0,
    paddingBottom: 9,
  },
  viewModal: {
    paddingHorizontal: 25,
  },
  textComponent: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontFamily: fonts.regular,
    fontSize: sizes.h5,
    lineHeight: lineHeights.h5,
  },
  viewCode: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconChevron: {
    marginRight: 5,
  },
  viewInput: {
    flex: 1,
  },
});

InputMobile.defaultProps = {
  offset: 13,
  initialCountry: INITIAL_COUNTRY,
  placeholder: 'Phone Number',
  textStyle: {},
};

export default function InputMobileComponent(props) {
  const theme = useTheme();
  const {t} = useTranslation();
  return <InputMobile {...props} theme={theme} t={t} />;
}
