import React, {
  createContext,
  Reducer,
  ReducerState,
  useContext,
  useReducer,
  Dispatch,
  ReducerAction,
} from "react";

// For larger more complex colocated stores.
export function createReducerStore<
  State,
  Action,
  _Reducer extends Reducer<Partial<State>, Action>
>(initialState: ReducerState<_Reducer>, reducer: _Reducer) {
  type DispatchType = Dispatch<ReducerAction<_Reducer>>;
  const StateContext = createContext<ReducerState<_Reducer>>(initialState);
  const DispatchContext = createContext<DispatchType>(() => {});

  const Provider: React.FC<{ children: any }> = ({ children }) => {
    const [state, dispatch] = useReducer<_Reducer>(reducer, initialState);

    return (
      <StateContext.Provider value={state}>
        <DispatchContext.Provider value={dispatch}>
          {children}
        </DispatchContext.Provider>
      </StateContext.Provider>
    );
  };

  const useStateContext = () => {
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

  const useDispatchContext = () => {
    const context = useContext(DispatchContext);
    if (context === undefined) {
      if (
        process.env.NODE_ENV === "development" ||
        process.env.NODE_ENV === "test"
      ) {
        throw new Error(
          "useDispatchContext cannot be used outside of provider"
        );
      }
    }

    return context;
  };

  return {
    Provider,
    useStateContext,
    useDispatchContext,
  };
}
