import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Send, ChevronLeft } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from "expo-router";

// Tipo para mensajes
type Message = {
  id: string;
  content: string;
  sender: 'me' | 'other'; // Identifica quién envió el mensaje
};

const ChatScreen = () => {
  const navigation = useNavigation(); // Para manejar la navegación
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', content: 'Hola, ¿cómo estás?', sender: 'other' },
    { id: '2', content: '¡Hola! Estoy bien, gracias. ¿Y tú?', sender: 'me' },
  ]);
  const [newMessage, setNewMessage] = useState('');

  // Maneja el envío de mensajes
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Agrega el nuevo mensaje a la lista
      const newMsg: Message = {
        id: Date.now().toString(),
        content: newMessage,
        sender: 'me',
      };
      setMessages((prev) => [...prev, newMsg]);
      setNewMessage('');
      simulateResponse(); // Simula una respuesta del "otro usuario"
    }
  };

  // Simula una respuesta del otro usuario
  const simulateResponse = () => {
    setTimeout(() => {
      const response: Message = {
        id: Date.now().toString(),
        content: '¡Gracias por tu mensaje! Estoy aquí para ayudarte.',
        sender: 'other',
      };
      setMessages((prev) => [...prev, response]);
    }, 1000); // Respuesta después de 1 segundo
  };

  // Renderiza cada mensaje
  const renderMessage = ({ item }: { item: Message }) => (
    <View
      style={[
        styles.messageContainer,
        item.sender === 'me' ? styles.myMessage : styles.otherMessage,
      ]}
    >
      <Text style={item.sender === 'me' ? styles.myMessageText : styles.otherMessageText}>
        {item.content}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Encabezado con botón de regreso */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ChevronLeft size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chat</Text>
      </View>

      {/* Lista de Mensajes */}
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messagesList}
      />

      {/* Barra de Entrada */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Escribe un mensaje..."
          value={newMessage}
          onChangeText={setNewMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Send color="white" size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatScreen;

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    backgroundColor: '#4F46E5',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  messagesList: {
    flexGrow: 1,
    padding: 10,
  },
  messageContainer: {
    maxWidth: '75%',
    marginVertical: 5,
    padding: 10,
    borderRadius: 12,
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#6366F1',
  },
  myMessageText: {
    color: 'white',
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#E0E7FF',
  },
  otherMessageText: {
    color: '#1E40AF',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: 'white',
  },
  input: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginRight: 10,
    fontSize: 16,
    color: '#333',
  },
  sendButton: {
    backgroundColor: '#4F46E5',
    padding: 10,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});