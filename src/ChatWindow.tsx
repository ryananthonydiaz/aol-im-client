import React, { useState, useRef, useEffect, KeyboardEvent } from "react";
import Message, { Direction } from "./Message";
import {
  useChatWindowState,
  useChatWindowDispatch,
  ChatWindowActionType,
} from "./hooks/createChatWindowStore";
import aolSendIcon from "./assets/images/aolSendIcon.png";
import { SendMessage } from "react-use-websocket";
import { JsonValue } from "react-use-websocket/dist/lib/types";
import styles from "./ChatWindow.module.css";

interface IChatWindowProps {
  sendMessage: SendMessage;
  lastJsonMessage: JsonValue | null;
  promptedUserName: string
}

function ChatWindow({ sendMessage, lastJsonMessage, promptedUserName }: IChatWindowProps) {
  const chatWindowRef = useRef<HTMLDivElement>(null);
  const [chatWindowStyles, setChatWindowStyles] = useState<string>(
    `window ${styles.window} ${styles.fullScreenContainer}`
  );
  const { recipient, chatRoomId, windowIsOpen } = useChatWindowState();
  const chatWindowDispatch = useChatWindowDispatch();
  const [messageWasSent, setMessageWasSent] = useState<boolean>(false);
  const [messages, setMessages] = useState<
    Array<{
      direction: Direction;
      userName: string;
      message: string;
    }>
  >([]);
  const [newMessage, setNewMessage] = useState<string>("");

  useEffect(() => {
    if (messageWasSent) {
      const chatWindowScrollHeight = chatWindowRef?.current?.scrollHeight;
      chatWindowRef?.current?.scrollTo(0, chatWindowScrollHeight ?? 0);

      setMessageWasSent(false);
    }
  }, [messageWasSent]);

  useEffect(() => {
    if (windowIsOpen === false) {
      setChatWindowStyles(`window ${styles.window}`);
      setMessages([]);
    }
    return function cleanUpState() {
      setChatWindowStyles(`window ${styles.window}`);
      setMessages([]);
    };
  }, [windowIsOpen]);

  useEffect(() => {
    if (lastJsonMessage) {
      //@ts-ignore
      setMessages((prev) => {
        return [
          ...prev,
          {
            ...lastJsonMessage,
            //@ts-ignore
            direction: Direction[lastJsonMessage.direction],
          },
        ];
      });
    }
  }, [lastJsonMessage]);

  function handleSendMessage() {
    setMessageWasSent(true);

    setNewMessage("");

    sendMessage(
      JSON.stringify({
        direction: Direction.OUT_BOUND,
        userName: promptedUserName,
        message: newMessage,
      })
    );
  }

  function closeChatWindow() {
    chatWindowDispatch({
      type: ChatWindowActionType.CLOSE_WINDOW_CHAT,
      payload: undefined,
    });
  }

  function maximizeChatWindow() {
    if (chatWindowStyles !== `window ${styles.window}`) {
      setChatWindowStyles(`window ${styles.window}`);
    } else {
      setChatWindowStyles(`window ${styles.smallWindow}`);
    }
  }

  function handleKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    const keyCode = e.keyCode;
    if (keyCode === 13) {
      handleSendMessage();
    }
  }

  if (windowIsOpen === false) {
    return null;
  }

  return (
    <div draggable className={chatWindowStyles} onKeyDown={handleKeyDown}>
      <div className="title-bar" style={{ flexBasis: 0 }}>
        <div className="title-bar-text">Instance Message with {recipient}</div>
        <div className="title-bar-controls">
          <button aria-label="Minimize" onClick={closeChatWindow}></button>
          <button aria-label="Maximize" onClick={maximizeChatWindow}></button>
          <button aria-label="Close" onClick={closeChatWindow}></button>
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
              <div
                style={{ overflowY: "scroll", height: "100%" }}
                ref={chatWindowRef}
              >
                <div
                  style={{
                    display: "flex",
                    flexFlow: "column",
                    height: "100%",
                    gap: "1rem 0",
                  }}
                >
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
