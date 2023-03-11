import React, { ReactNode } from "react";
import { ChatWindowProvider } from "./hooks/createChatWindowStore";

interface IProviderProps {
  children: Array<ReactNode>;
}

function Provider({ children }: IProviderProps) {
  return <ChatWindowProvider>{children}</ChatWindowProvider>;
}

export default Provider;
