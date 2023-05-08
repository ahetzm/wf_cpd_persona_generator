import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

export type ChatMessage = {
  id: string;
  message: string;
  isUser: boolean;
};

type Props = {
  chatTitle: string;
  onSend: (message: string) => void;
  messages: ChatMessage[];
  writingBack: boolean;
};

const Chat: React.FC<Props> = ({ onSend, messages, writingBack }) => {
  const [text, setText] = useState('');

  const handleSend = () => {
    onSend(text);
    setText('');
  };

  const renderMessage = ({ item }: { item: ChatMessage }) => {
    return (
      <View style={[styles.messageContainer, item.isUser ? styles.userMessageContainer : styles.otherMessageContainer]}>
        <Text style={item.isUser ? styles.userMessageText : styles.otherMessageText}>{item.message}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id.toString()}
        inverted={true}
        style={styles.messages}
      />
      { writingBack ? <Text>Writing back...</Text> : null}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          placeholder="Ask a question..."
          placeholderTextColor="grey"
          multiline={true}
          maxLength={200}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#eee',
    paddingVertical: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  messages: {
    flex: 1,
    paddingHorizontal: 10,
  },
  messageContainer: {
    maxWidth: '80%',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
  userMessageContainer: {
    backgroundColor: '#4BB543',
    alignSelf: 'flex-end',
  },
  otherMessageContainer: {
    backgroundColor: '#ddd',
    alignSelf: 'flex-start',
  },
  userMessageText: {
    color: '#fff',
  },
  otherMessageText: {
    color: '#000',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: '#eee',
    borderRadius: 20,
    paddingHorizontal: 20,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#4BB543',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Chat;