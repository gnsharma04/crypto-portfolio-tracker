import React from "react";
import ChatWindow from "./components/ChatWindow";
import ChatInput from "./components/ChatInput";
import "./App.scss";
import { useChat } from "./hooks/useChat";

function App() {
  const { messages, input, setInput, scrollRef, sendMessage, resetChat } =
    useChat();

  return (
    <div className="chat-app">
      <div className="chat-container">
        <h2 className="chat-title">Cryptocurrency Chat Interface</h2>
        <ChatWindow
          messages={messages}
          scrollRef={scrollRef}
          input={input}
          setInput={setInput}
        />
        <ChatInput
          input={input}
          setInput={setInput}
          onSend={sendMessage}
          onClear={resetChat}
          messageCount={messages.length}
        />
      </div>
    </div>
  );
}

export default App;
