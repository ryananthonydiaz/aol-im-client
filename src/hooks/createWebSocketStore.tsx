import React, { createContext, useContext } from "react";
import useWebSocket, { SendMessage } from "react-use-websocket";
import { JsonValue } from "react-use-websocket/dist/lib/types";

const WEB_SOCKET_SERVER_URL = "ws://localhost:3000";

function createWebSocketStore() {
  const StateContext = createContext<{
    sendMessage: SendMessage;
    lastJsonMessage: JsonValue | null;
  }>({
    sendMessage: () => {},
    lastJsonMessage: null,
  });

  const WebSocketProvider: React.FC<{ children: any }> = ({ children }) => {
    const { sendMessage, lastJsonMessage } = useWebSocket(WEB_SOCKET_SERVER_URL, {
      onOpen: () => {
        console.log("WebSocket connection established.");
        // sendMessage({
  
        // })
      },
      //Will attempt to reconnect on all close events, such as server shutting down
      shouldReconnect: () => true,
      onClose: () => console.log("web socket closed :("),
      onError: (error) => console.error(error),
    });
    return (
      <StateContext.Provider value={{
        sendMessage,
        lastJsonMessage,
      }}>
        {children}
      </StateContext.Provider>
    );
  };

  const useWebSocketContext = () => {
    const context = useContext(StateContext);
    if (context === undefined) {
      if (
        process.env.NODE_ENV === "development" ||
        process.env.NODE_ENV === "test"
      ) {
        throw new Error("useStateContext cannot be used outside of provider");
      }
    }

    return context;
  };

  return {
    WebSocketProvider,
    useWebSocketContext,
  };
}

const { WebSocketProvider, useWebSocketContext } = createWebSocketStore();

export { WebSocketProvider, useWebSocketContext };
