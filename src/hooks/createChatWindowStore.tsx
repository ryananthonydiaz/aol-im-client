import { Reducer } from "react";
import { createReducerStore } from "./createReducerStore";

export enum ChatWindowActionType {
  CREATE_NEW_CHAT_WINDOW = "CREATE_NEW_CHAT_WINDOW",
  CLOSE_WINDOW_CHAT = "CLOSE_WINDOW_CHAT",
}

interface IChatWindowState {
  recipient: string;
  chatRoomId: number;
  windowIsOpen: boolean;
}

interface IChatWindowAction {
  type: ChatWindowActionType;
  payload: any;
}

const initialChatWindowState: IChatWindowState = {
  recipient: "",
  chatRoomId: 0,
  windowIsOpen: false,
};

const chatWindowReducer: Reducer<
  Partial<IChatWindowState>,
  IChatWindowAction
> = (state: Partial<IChatWindowState>, action: IChatWindowAction) => {
  switch (action.type) {
    case ChatWindowActionType.CREATE_NEW_CHAT_WINDOW:
      // { recipient: <<userName>>, chatRoomId: <<chat-room-id-from-server>>, windowIsOpen: true }
      return {
        ...state,
        ...action.payload,
      };
    case ChatWindowActionType.CLOSE_WINDOW_CHAT:
      // You don't have to use the payload and we can always just set to false
      return {
        ...state,
        windowIsOpen: false,
      };
    default:
      throw new Error(`Action Type of: ${action.type} is not known.`);
  }
};

const createChatWindowStore = () => {
  const {
    useStateContext: useChatWindowState,
    useDispatchContext: useChatWindowDispatch,
    Provider: ChatWindowProvider,
  } = createReducerStore<
    IChatWindowState,
    IChatWindowAction,
    Reducer<Partial<IChatWindowState>, IChatWindowAction>
  >(initialChatWindowState, chatWindowReducer);

  return {
    ChatWindowProvider,
    useChatWindowState,
    useChatWindowDispatch,
  };
};

const { ChatWindowProvider, useChatWindowState, useChatWindowDispatch } =
  createChatWindowStore();

export { ChatWindowProvider, useChatWindowState, useChatWindowDispatch };
