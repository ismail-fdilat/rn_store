import React from 'react';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {GiftedChat, InputToolbar} from 'react-native-gifted-chat';
import Icon from 'src/components/Icon';
import Message from './Message';

import {fonts, sizes, lineHeights} from 'src/configs/fonts';
import database from '@react-native-firebase/database';
import {AuthContext} from 'src/utils/auth-context';

const USER_TYPE = 'operator';

function FlatListChat({data, conversationId}) {
  const {user} = React.useContext(AuthContext);
  const {colors} = useTheme();
  const {t} = useTranslation();
  const [messages, setMessage] = React.useState(data);
  React.useEffect(() => {
    setMessage(data);
  }, [setMessage, data]);
  const onSendHandle = (value) => {
    const newMessages = GiftedChat.append(messages, value);
    setMessage(newMessages);
    value.forEach((message) => {
      const messageRef = database().ref('chat_messages').push();
      const mes = {
        avatar_image: user.avatar,
        avatar_type: 'image',
        conversation_id: conversationId,
        gravatar: '',
        msg: message.text,
        msg_time: new Date(message.createdAt).getTime(),
        read: true,
        user_id: `fbc-op-${user.ID}`,
        user_name: user.display_name,
        user_type: USER_TYPE,
        vendor_id: parseInt(user.ID, 10),
      };
      messageRef.set(mes);
    });
  };
  const renderSend = (value) => {
    const {onSend, text} = value;
    return (
      <TouchableOpacity
        style={styles.send}
        onPress={() => onSend({text: text.trim()}, true)}>
        <Icon name="send" color={colors.primary} size={20} />
      </TouchableOpacity>
    );
  };
  const renderInputToolbar = (value) => {
    return (
      <InputToolbar
        {...value}
        containerStyle={[
          styles.toolbar,
          {backgroundColor: colors.secondaryCard},
        ]}
      />
    );
  };
  const renderMessage = (value) => {
    return <Message {...value} />;
  };
  return (
    <GiftedChat
      messages={messages}
      onSend={(dataMess) => onSendHandle(dataMess)}
      user={{
        _id: `fbc-op-${user.ID}`,
      }}
      renderMessage={renderMessage}
      textInputStyle={styles.input}
      textInputProps={{
        numberOfLines: 5,
        placeholder: t('chat:text_send'),
        placeholderTextColor: colors.thirdText,
      }}
      renderInputToolbar={renderInputToolbar}
      renderSend={renderSend}
      minInputToolbarHeight={100}
      listViewProps={{
        showsVerticalScrollIndicator: false,
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    minHeight: 50,
    fontFamily: fonts.regular,
    fontSize: sizes.h5,
    lineHeight: lineHeights.h5,
    marginLeft: 0,
    paddingHorizontal: 15,
    marginBottom: 0,
  },
  toolbar: {
    marginHorizontal: 25,
    marginBottom: 25,
    borderTopWidth: 0,
    borderRadius: 10,
  },
  send: {
    height: 50,
    justifyContent: 'center',
    paddingRight: 15,
  },
});

FlatListChat.defaultProps = {
  data: [],
};

export default FlatListChat;
