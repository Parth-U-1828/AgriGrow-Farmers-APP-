import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  StyleSheet, 
  Dimensions, 
  Image, 
  KeyboardAvoidingView, 
  Platform,
  Animated,
  Alert
} from 'react-native';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const [messages, setMessages] = useState([
    {
      id: '1',
      text: "Hello! I'm your business assistant. How can I help you today?",
      sender: 'bot',
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [businessContext, setBusinessContext] = useState(null);
  const scrollViewRef = useRef(null);
  const rotateAnim = useRef(new Animated.Value(0)).current;

  // Configuration - Update with your Flask server URL
  const API_URL = 'http://10.0.146.98:5000/chat';

  // ChatHeader Component
  const ChatHeader = () => (
    <View style={styles.chatHeader}>
      <View style={styles.headerTitleContainer}>
        <View style={styles.botIcon}>
          <Text style={styles.botIconText}>B</Text>
        </View>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>Business Assistant</Text>
          <Text style={styles.headerSubtitle}>Here to help your business grow</Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => setIsOpen(false)} style={styles.closeButton}>
        <Text style={styles.closeButtonText}>×</Text>
      </TouchableOpacity>
    </View>
  );

  // MessageBubble Component
  const MessageBubble = ({ message }) => (
    <View style={[
      styles.messageBubble, 
      message.sender === 'user' ? styles.userMessageBubble : styles.botMessageBubble
    ]}>
      <View style={[
        styles.avatar,
        message.sender === 'user' ? styles.userAvatar : styles.botAvatar
      ]}>
        <Text style={styles.avatarText}>
          {message.sender === 'user' ? "U" : "B"}
        </Text>
      </View>
      <View style={[
        styles.messageContent,
        message.sender === 'user' ? styles.userMessageContent : styles.botMessageContent
      ]}>
        <Text style={[
          styles.messageText,
          message.sender === 'user' ? styles.userMessageText : styles.botMessageText
        ]}>
          {message.text}
        </Text>
      </View>
    </View>
  );

  // TypingIndicator Component
  const TypingIndicator = () => {
    const rotation = rotateAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });

    return (
      <View style={[styles.messageBubble, styles.botMessageBubble]}>
        <View style={[styles.avatar, styles.botAvatar]}>
          <Text style={styles.avatarText}>B</Text>
        </View>
        <View style={[styles.messageContent, styles.botMessageContent]}>
          <Animated.View style={{ transform: [{ rotate: rotation }] }}>
            <Text style={styles.typingIndicator}>...</Text>
          </Animated.View>
        </View>
      </View>
    );
  };

  // Handle dimension changes
  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions(window);
    });
    return () => subscription?.remove();
  }, []);

  // Animation effect
  useEffect(() => {
    let spinning;
    if (isTyping && rotateAnim) {
      spinning = Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        })
      );
      spinning.start();
    }
    return () => {
      spinning?.stop();
    };
  }, [isTyping]);

  // Scroll to bottom when messages change
  const scrollToBottom = () => {
    requestAnimationFrame(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize business context on first load
  useEffect(() => {
    const initializeContext = async () => {
      try {
        const initialMessage = {
          message: "Initialize business context",
          context: "initial_setup"
        };

        const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(initialMessage)
        });

        if (!response.ok) {
          throw new Error(`Server responded with ${response.status}`);
        }

        const data = await response.json();
        
        // Update business context if received from server
        if (data.context) {
          setBusinessContext(data.context);
        }
      } catch (error) {
        console.error('Context Initialization Error:', error);
      }
    };

    initializeContext();
  }, []);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message: inputMessage,
          context: businessContext || "business_assistant",
          history: messages.filter(m => m.sender === 'user').slice(-3)
        }),
        signal: controller.signal
      });
      console.log(body);

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }

      const data = await response.json();

      const botResponse = {
        id: (Date.now() + 1).toString(),
        text: data.response || "I didn't get that. Could you rephrase?",
        sender: 'bot',
      };

      // Update business context if server provides a new context
      if (data.context) {
        setBusinessContext(data.context);
      }

      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('API Error:', error);
      
      let errorMessage = "Sorry, I'm having trouble connecting.";
      if (error.name === 'AbortError') {
        errorMessage = "Request timed out. Please try again.";
      }

      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        text: errorMessage,
        sender: 'bot',
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  // Closed state toggle button
  if (!isOpen) {
    return (
      <TouchableOpacity 
        onPress={() => setIsOpen(true)} 
        style={styles.chatToggleButton}
      >
        <Image 
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/4712/4712035.png' }}
          style={styles.chatToggleIcon}
          onError={() => console.log('Image failed to load')}
        />
      </TouchableOpacity>
    );
  }

  return (
    <View style={[styles.chatContainer, { 
      width: dimensions.width * 0.9,
      height: dimensions.height * 0.6 
    }]}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
        style={styles.keyboardAvoidingView}
      >
        <View style={styles.chatBox}>
          <ChatHeader />
          
          <ScrollView 
            ref={scrollViewRef}
            contentContainerStyle={styles.messagesContainer}
            showsVerticalScrollIndicator={false}
          >
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
            
            {isTyping && <TypingIndicator />}
          </ScrollView>
          
          <View style={styles.chatInputForm}>
            <TextInput 
              value={inputMessage}
              onChangeText={setInputMessage}
              placeholder="Ask about business help, schemes..."
              placeholderTextColor="#888"
              style={styles.chatInput}
              multiline={false}
              onSubmitEditing={handleSendMessage}
            />
            <TouchableOpacity 
              onPress={handleSendMessage} 
              disabled={!inputMessage.trim()}
              style={[
                styles.sendButton, 
                !inputMessage.trim() && styles.sendButtonDisabled
              ]}
            >
              <Text style={styles.sendButtonText}>↑</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

// Styles remain the same as in previous implementation
const styles = StyleSheet.create({
  chatContainer: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    maxWidth: 380,
    zIndex: 50,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  chatToggleButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#D6FF80',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  chatToggleIcon: {
    width: 40,
    height: 40,
  },
  chatBox: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    overflow: 'hidden',
  },
  chatHeader: {
    backgroundColor: '#225B32',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  botIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#4b5563',
    justifyContent: 'center',
    alignItems: 'center',
  },
  botIconText: {
    color: 'white',
    fontWeight: 'bold',
  },
  headerTextContainer: {
    marginLeft: 10,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#ccc',
  },
  closeButton: {
    padding: 8,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 24,
    lineHeight: 24,
  },
  messagesContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  messageBubble: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  userMessageBubble: {
    justifyContent: 'flex-end',
  },
  botMessageBubble: {
    justifyContent: 'flex-start',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  avatarText: {
    color: 'white',
    fontWeight: 'bold',
  },
  userAvatar: {
    backgroundColor: '#D6FF80',
  },
  botAvatar: {
    backgroundColor: '#4b5563',
  },
  messageContent: {
    maxWidth: '75%',
    padding: 10,
    borderRadius: 8,
  },
  userMessageContent: {
    backgroundColor: '#151614',
  },
  botMessageContent: {
    backgroundColor: '#f3f4f6',
  },
  messageText: {
    fontSize: 14,
  },
  userMessageText: {
    color: 'white',
  },
  botMessageText: {
    color: '#111827',
  },
  typingIndicator: {
    fontSize: 24,
    lineHeight: 24,
  },
  chatInputForm: {
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    padding: 12,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  chatInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 8,
    fontSize: 14,
    minHeight: 40,
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: '#B8E66E',
    borderRadius: 8,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
  },
  sendButtonDisabled: {
    backgroundColor: '#e5e7eb',
  },
  sendButtonText: {
    fontSize: 20,
    color: 'white',
  },
});

export default Chatbot;