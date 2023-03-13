import React, { useState } from "react";
import Drawer from "./Drawer";
import ChatWindow from "./ChatWindow";
import IconMenu from "./icons/IconMenu";
import Provider from "./Provider";
import appStyles from "./App.module.css";
import useWebSocket from "react-use-websocket";
import UserNamePrompt from "./UserNamePrompt";
import styles from "./BuddyListGroup.module.css";

const WEB_SOCKET_SERVER_URL = "ws://localhost:3000";

function App() {
  const [drawerIsOpen, setDrawerIsOpen] = useState<boolean>(false);
  const [promptedUserName, setPromptedUserName] = useState<string>("");
  const [promptIsOpen, setPromptIsOpen] = useState<boolean>(true);

  const { sendMessage, sendJsonMessage, lastJsonMessage } = useWebSocket(
    WEB_SOCKET_SERVER_URL,
    {
      onOpen: () => console.log("WebSocket connection established."),
      //Will attempt to reconnect on all close events, such as server shutting down
      shouldReconnect: () => true,
      onClose: () => console.log("web socket closed :("),
      onError: (error) => console.error(error),
    }
  );

  return (
    <Provider>
      <button
        className={[styles.button, appStyles.menuToggle].join(" ")}
        onClick={() => setDrawerIsOpen((prev) => !prev)}
      >
        <IconMenu />
      </button>
      <Drawer
        isOpen={drawerIsOpen}
        setDrawerIsOpenToFalse={() => setDrawerIsOpen(false)}
      />
      <ChatWindow lastJsonMessage={lastJsonMessage} sendMessage={sendMessage} promptedUserName={promptedUserName} />

      {promptIsOpen ? (
        <UserNamePrompt
          setPromptIsOpen={setPromptIsOpen}
          setPromptedUserName={setPromptedUserName}
          promptedUserName={promptedUserName}
        />
      ) : null}
    </Provider>
  );
}

export default App;
