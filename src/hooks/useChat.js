import { useState, useRef, useEffect } from "react";
import { handlePluginCommand, isPluginCommand } from "../plugins/PluginManager";
import { createUserMessage, createBotMessage } from "../constants/Constants";

export const useChat = () => {
  const [messages, setMessages] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("messageList")) || [];
    } catch {
      return [];
    }
  });

  const [input, setInput] = useState("");
  const scrollRef = useRef(null);
  const hasInitialized = useRef(false);

  const saveMessages = (msgList) => {
    localStorage.setItem("messageList", JSON.stringify(msgList));
  };

  const resetChat = () => {
    setMessages([]);
    localStorage.removeItem("messageList");
  };

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMsg = createUserMessage(trimmed);
    const updated = [...messages, userMsg];
    setMessages(updated);

    if (isPluginCommand(trimmed)) {
      setMessages([...updated, createBotMessage("Thinking...", true)]);

      const response = await handlePluginCommand(trimmed);
      const finalMessages = [
        ...updated,
        {
          id: Date.now() + 2,
          sender: "bot",
          type: "plugin",
          pluginName: response.pluginName,
          pluginData: response.pluginData,
        },
      ];
      setMessages(finalMessages);
    }

    setInput("");
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });

    if (hasInitialized.current) {
      saveMessages(messages);
    } else {
      hasInitialized.current = true;
    }
  }, [messages]);

  return { messages, input, setInput, scrollRef, sendMessage, resetChat };
};
