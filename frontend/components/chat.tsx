import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
  Image,
  KeyboardAvoidingView, Platform
} from 'react-native';
import usePersonaService from "../services/persona-service";
import {PersonaQuestionRequest} from "../models/AnswerInterface";
import {getMessages, getRandId, saveMessage} from "../services/firebase";
import {Person} from '../models/Person';
import {User} from '../models/User';

export type ChatMessage = {
  id: string;
  message: string;
  isUser: boolean;
  timestamp: number
};

type Props = {
  persona: Person;
  user: User;
};

const Chat: React.FC<Props> = ({persona, user}) => {
  const [text, setText] = useState<string>('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [writingBack, setWritingBack] = useState<boolean>(false);

  const {getAnswer} = usePersonaService(user.uid);

  const fetchMessages = async () => {
    const fetchedMessages: ChatMessage[] = await getMessages(user.uid, persona.id) ?? [];
    console.log(fetchedMessages);
    const sortedArray = fetchedMessages.sort((a, b) => b.timestamp - a.timestamp);

    setMessages(sortedArray);
  }

  useEffect(() => {
    // @ts-ignore
    fetchMessages();
  }, []);

  const onSendHandler = async () => {
    console.log(text);
    const newMessage: ChatMessage = {message: text, id: getRandId(), isUser: true, timestamp: (new Date()).getTime()};
    setMessages((prevMessages) => [newMessage, ...prevMessages]);
    saveMessage(user.uid, persona.id, newMessage);

    getAnswerHandler(text).then(console.log).catch(console.error);
    setText('');
  };

  const getAnswerHandler = async (message: string) => {
    setWritingBack(true);
    const answerRequest: PersonaQuestionRequest = {question: message, data: persona};
    const answer = await getAnswer(answerRequest);

    const newMessage: ChatMessage = {
      message: answer,
      id: getRandId(),
      isUser: false,
      timestamp: (new Date()).getTime()
    };

    setWritingBack(false);
    saveMessage(user.uid, persona.id, newMessage);

    setMessages((prevMessages) => [newMessage, ...prevMessages]);

    return answer;
  };

  const renderMessage = ({item}: { item: ChatMessage }) => {
    return (
      <View style={[styles.messageContainer, item.isUser ? styles.userMessageContainer : styles.otherMessageContainer]}>
        <Text style={item.isUser ? styles.userMessageText : styles.otherMessageText}>{item.message}</Text>
        {/* <Text style={{...(item.isUser ? styles.userMessageText : styles.otherMessageText), fontSize: 8}}>{new Date(item.timestamp).toLocaleTimeString()}</Text> */}
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 84 : 0}
    >
      <ScrollView>
        <View style={styles.infoContainer}>
          <Image source={{uri: persona.imageUri}} style={styles.image}/>
          <Text style={styles.name}>{persona.name}</Text>
          <Text style={styles.age}>
            {persona.age} years old, {persona.demographics.gender}
          </Text>
          <Text style={styles.age}>{persona.demographics.location}</Text>
        </View>

        <View>
          <FlatList
            data={messages}
            renderItem={renderMessage}
            keyExtractor={(item, index) => `${item.id}_${index}`}
            inverted={true}
            style={styles.messages}
          />
        </View>
        {writingBack ? <Text>Writing back...</Text> : null}
      </ScrollView>

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
        <TouchableOpacity style={styles.sendButton} onPress={onSendHandler}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: "flex-end"
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

  infoContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  detailsContainer: {
    justifyContent: "flex-start",
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
  },
  age: {
    fontSize: 18,
  },
});

export default Chat;