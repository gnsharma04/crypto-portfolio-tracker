import React, { useEffect, useState } from "react";
import MessageBubble from "./MessageBubble";
import "../styles/ChatWindow.scss";
import { Button, Stack } from "@mui/material";
import { commands } from "../constants/Constants";
import {
  AddCard,
  AttachMoney,
  LocalOffer,
  SmartToy,
  TrendingUp,
  Whatshot,
  Work,
} from "@mui/icons-material";

const ChatWindow = ({ messages, scrollRef, input, setInput }) => {
  // Set Input Field Blank on Start (before clicking button)
  const [activeCommandInput, setActiveCommandInput] = useState(null);

  useEffect(() => {
    if (input === "") {
      setActiveCommandInput(null);
    }
  }, [input]);

  const handleCommandClick = (command) => {
    setInput(command + " ");
    setActiveCommandInput(command);
  };

  //Icons for different command buttons
  const getButtonIcon = (ele) => {
    switch (ele) {
      case "/portfolio":
        return <Work sx={{ fontSize: 28, mr: 1 }} />;
      case "/add":
        return <AddCard sx={{ fontSize: 28, mr: 1 }} />;
      case "/holdings":
        return <AttachMoney sx={{ fontSize: 28, mr: 1 }} />;
      case "/trending":
        return <Whatshot sx={{ fontSize: 28, mr: 1 }} />;
      case "/price":
        return <LocalOffer sx={{ fontSize: 28, mr: 1 }} />;
      case "/chart":
        return <TrendingUp sx={{ fontSize: 28, mr: 1 }} />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="chat-window">
        {messages.length === 0 ? (
          <>
            <div className="blank-chat-layout">
              <div className="blank-chat-message">Let's Get Started</div>
              <div className="blank-chat-image">
                <SmartToy sx={{ fontSize: 80 }} />
              </div>

              {/*Command Buttons*/}
              <Stack
                direction="column"
                spacing={2}
                className="command-button-stack"
              >
                {commands.map((element) => (
                  <Button
                    key={element}
                    color={
                      activeCommandInput === element ? "primary" : "secondary"
                    }
                    sx={{
                      opacity:
                        activeCommandInput && activeCommandInput !== element
                          ? 0.5
                          : 1,
                    }}
                    onClick={() => handleCommandClick(element)}
                  >
                    {getButtonIcon(element)}
                    {element}
                  </Button>
                ))}
              </Stack>
            </div>
          </>
        ) : (
          <div className="chat-messages-container">
            {messages.map((msg) => (
              <MessageBubble key={msg.id} message={msg} />
            ))}
            <div ref={scrollRef} />
          </div>
        )}
      </div>
    </>
  );
};

export default ChatWindow;
