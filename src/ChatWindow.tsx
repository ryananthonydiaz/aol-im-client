import React, { useState, useRef, useEffect } from "react";
import Message, { Direction } from "./Message";
import aolSendIcon from "./assets/images/aolSendIcon.png";
import styles from "./ChatWindow.module.css";

const initialMessageMockData = [
  {
    direction: Direction.IN_BOUND,
    userName: "ryvn.divz09128",
    message: "What up, what's going on?",
  },
  {
    direction: Direction.OUT_BOUND,
    userName: "little.pixie.2393",
    message: "Nothing Much - you?",
  },
];

function ChatWindow() {
  const chatWindowRef = useRef<HTMLDivElement>(null);
  const [messageWasSent, setMessageWasSent] = useState<boolean>(false);
  const [messages, setMessages] = useState<
    Array<{
      direction: Direction;
      userName: string;
      message: string;
    }>
  >(initialMessageMockData);
  const [newMessage, setNewMessage] = useState<string>("");

  useEffect(() => {
    if (messageWasSent) {
      const chatWindowScrollHeight = chatWindowRef?.current?.scrollHeight;
      console.log({chatWindowScrollHeight});

      chatWindowRef?.current?.scrollTo(0, chatWindowScrollHeight ?? 0);

      setMessageWasSent(false);
    }
  }, [messageWasSent]);

  function handleSendMessage() {
    setMessageWasSent(true);
    setMessages((prev) => {
      return [
        ...prev,
        {
          direction: Direction.OUT_BOUND,
          userName: "ryvn.divz",
          message: newMessage,
        },
      ];
    });

    setNewMessage('');
  }
  return (
    <div
      className="window"
      style={{
        width: "400px",
        cursor: "move",
        height: "300px",
        background: "rgb(214,214,206)",
      }}
    >
      <div className="title-bar" style={{ flexBasis: 0 }}>
        <div className="title-bar-text">Instance Message</div>
        <div className="title-bar-controls">
          <button aria-label="Minimize"></button>
          <button aria-label="Maximize"></button>
          <button aria-label="Close"></button>
        </div>
      </div>
      <div
        className="window-body"
        style={{
          display: "flex",
          flexFlow: "column",
          gap: "1rem 0",
          height: "80%",
          flexBasis: 1,
          background: "rgb(214,214,206)",
        }}
      >
        <section
          style={{
            background: "rgb(214,214,206)",
            display: "flex",
            flexFlow: "column",
            flexBasis: "100%",
            height: "100%",
            gap: "1rem 0",
            minHeight: 0,
          }}
        >
          <div
            style={{
              height: "100%", // THIS IS THROWING OFF MOBILE
              background: "white",
              borderTop: "1.5px solid black",
              borderLeft: "1.5px solid black",
              borderRight: "1.5px solid white",
              borderBottom: "1.5px solid white",
            }}
          >
            <div
              style={{
                height: "100%",
                maxHeight: "100%",
                borderRight: "1.5px solid rgb(214,214,206)",
                borderBottom: "1.5px solid rgb(214,214,206)",
                display: "flex",
                flexFlow: "column",
                gap: ".25rem 0",
              }}
            >
              <div style={{ overflowY: 'scroll', height: '100%' }} ref={chatWindowRef}>
                <div style={{ display: 'flex', flexFlow: 'column', height: '100%'}}>
                  {messages.map((msg, index) => (
                    <Message
                      key={index}
                      isFirstChild={index === 0}
                      direction={msg.direction}
                      userName={msg.userName}
                      message={msg.message}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          style={{
            background: "rgb(214,214,206)",
            display: "flex",
            flexFlow: "column",
          }}
        >
          <div
            style={{
              background: "white",
              borderTop: "1.5px solid black",
              borderLeft: "1.5px solid black",
              borderRight: "1.5px solid white",
              borderBottom: "1.5px solid white",
            }}
          >
            <div
              style={{
                borderRight: "1.5px solid rgb(214,214,206)",
                borderBottom: "1.5px solid rgb(214,214,206)",
              }}
            >
              <div className="field-row-stacked" style={{ width: "100%" }}>
                <textarea
                  onChange={(e) => setNewMessage(e.target.value)}
                  value={newMessage}
                  id="text24"
                  rows={4}
                  className={styles.textarea}
                ></textarea>
              </div>
            </div>
          </div>
        </section>

        <section
          className="field-row"
          style={{ justifyContent: "flex-end", background: "rgb(214,214,206)" }}
        >
          <button
            style={{ display: "flex", padding: 0, alignItems: "center" }}
            onClick={handleSendMessage}
          >
            <img
              width="30px"
              src={aolSendIcon}
              style={{ background: "inherit" }}
              alt="AOL Send Icon"
            />
            <div>Send</div>
          </button>
        </section>
      </div>
    </div>
  );
}

export default ChatWindow;
