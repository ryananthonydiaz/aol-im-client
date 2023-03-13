import React, { ReactNode } from "react";
import { ChatWindowProvider } from "./hooks/createChatWindowStore";
import { WebSocketProvider } from "./hooks/createWebSocketStore";

interface IProviderProps {
  children: Array<ReactNode>;
}

function Provider({ children }: IProviderProps) {
  return (
    <WebSocketProvider>
      <ChatWindowProvider>{children}</ChatWindowProvider>
    </WebSocketProvider>
  );
}

export default Provider;
