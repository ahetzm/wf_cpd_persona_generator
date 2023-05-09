import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import usePersonaService from "../services/persona-service";
import { PersonaQuestionRequest } from "../models/AnswerInterface";
import { getMessages, getRandId, saveMessage } from "../services/firebase";
import { Person } from '../models/Person';

export type ChatMessage = {
  id: string;
  message: string;
  isUser: boolean;
  timestamp: number
};

type Props = {
  persona: Person;
};

// TODO Fetch test user from firebase
const fakeUserId = "86tgh89zg9";

const Chat: React.FC<Props> = ({ persona }) => {
  const [text, setText] = useState<string>('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [writingBack, setWritingBack] = useState<boolean>(false);
  
  const {getAnswer} = usePersonaService();
 
  const fetchMessages = async () => {
    const fetchedMessages: ChatMessage[] = await getMessages(fakeUserId, persona.id) ?? [];
    console.log(fetchedMessages);
    fetchedMessages.sort((a, b) => a.timestamp + b.timestamp);
    
    setMessages(fetchedMessages);
  }

  useEffect(() => {
    // @ts-ignore
    fetchMessages();
  }, []);

  const onSendHandler = async () => {
    console.log(text);
    const newMessage: ChatMessage = { message: text, id: getRandId(), isUser: true, timestamp: (new Date()).getTime() };
    setMessages((prevMessages) => [ newMessage, ...prevMessages ]);
    saveMessage(fakeUserId, persona.id, newMessage);
    
    getAnswerHandler(text).then(console.log).catch(console.error);
    setText('');
  };

  const getAnswerHandler = async (message: string) => {
    setWritingBack(true);
    const answerRequest: PersonaQuestionRequest = { question: message, data: persona };
    const answer = await getAnswer(answerRequest);
  
    const newMessage: ChatMessage = { message: answer, id: getRandId(), isUser: false, timestamp: (new Date()).getTime()  };
    
    setWritingBack(false);
    saveMessage(fakeUserId, persona.id, newMessage);

    setMessages((prevMessages) => [ newMessage, ...prevMessages ]);
    
    return answer;
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
        <TouchableOpacity style={styles.sendButton} onPress={onSendHandler}>
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