// components/ChatInterface.tsx

import React, { useState, useRef, useEffect } from 'react';
import styles from './ChatInterface.module.css';

interface Message {
  text: string;
  isUser: boolean;
}

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<any[]>([]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleMinimize = () => {
    setIsMinimized(prev => !prev);
  };

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    // Start the conversation by sending an empty message to get the initial prompt
    sendMessage('');
  }, []);

  const addMessage = (text: string, isUser: boolean) => {
    if (text) {
      setMessages(prev => [...prev, { text, isUser }]);
    }
  };

  const sendMessage = async (overrideMessage?: string) => {
    const userMessage = overrideMessage !== undefined ? overrideMessage : input.trim();
    if (!userMessage && messages.length > 0) return;

    if (overrideMessage === undefined && userMessage) {
      setInput('');
      addMessage(userMessage, true);
    }

    setIsProcessing(true);

    try {
      // Send the message to the chat API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          conversationHistory: conversationHistory,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        addMessage(data.response, false);
        // Update conversation history
        setConversationHistory(data.conversationHistory);
      } else {
        addMessage('Sorry, there was an error processing your request.', false);
        console.error('API error:', data.error);
      }
    } catch (error) {
      addMessage('Sorry, there was an error connecting to the server.', false);
      console.error('Network error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className={`${styles.chatWidgetContainer} ${isMinimized ? styles.minimized : ''}`}>
      <div className={styles.chatHeader}>
        <button
          onClick={toggleMinimize}
          className={styles.minimizeButton}
          aria-label={isMinimized ? 'Expand chat' : 'Minimize chat'}
        >
          {isMinimized ? '+' : '–'}
        </button>
      </div>
      {!isMinimized && (
        <div className={styles.chatContainer}>
          <div className={styles.messageList}>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`${msg.isUser ? styles.userMessage : styles.botMessage}`}
              >
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className={styles.inputContainer}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Type a message..."
              className={styles.chatInput}
              disabled={isProcessing}
            />
            <button
              onClick={() => sendMessage()}
              className={styles.sendButton}
              disabled={isProcessing}
            >
              {isProcessing ? 'Sending...' : 'Send'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatInterface;


