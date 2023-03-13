import { Reducer } from "react";
import { createReducerStore } from "./createReducerStore";

export enum UserActionType {
  SET_USER_NAME = "SET_USER_NAME",
}

interface IUserState {
  userName: string;
}

interface IUserAction {
  type: UserActionType;
  payload: any;
}

const initialUserState: IUserState = {
  userName: "",
};

const userReducer: Reducer<Partial<IUserState>, IUserAction> = (
  state: Partial<IUserState>,
  action: IUserAction
) => {
  switch (action.type) {
    case UserActionType.SET_USER_NAME:
      return {
        ...state,
        userName: action.payload,
      };
    default:
      throw new Error(`Action Type of: ${action.type} is not known.`);
  }
};

const createUserStore = () => {
  const {
    useStateContext: useUserState,
    useDispatchContext: useUserDispatch,
    Provider: UserProvider,
  } = createReducerStore<
    IUserState,
    IUserAction,
    Reducer<Partial<IUserState>, IUserAction>
  >(initialUserState, userReducer);

  return {
    UserProvider,
    useUserState,
    useUserDispatch,
  };
};

const { UserProvider, useUserState, useUserDispatch } = createUserStore();

export { UserProvider, useUserState, useUserDispatch };
