"use client";

import React, { useState } from 'react';
import ChatbotWelcome from './ChatbotWelcome';
import ChatbotMain from './ChatbotMain';

const Chatbot = () => {
  const [isChatStarted, setIsChatStarted] = useState(false);

  const startChat = () => {
    setIsChatStarted(true);
  };

  return (
    <div>
      {!isChatStarted ? (
        <ChatbotWelcome onStartChat={startChat} />
      ) : (
        <ChatbotMain />
      )}
    </div>
  );
};

export default Chatbot;
