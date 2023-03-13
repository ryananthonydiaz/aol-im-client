import React, {useState} from "react";
import {
  useUserDispatch,
  useUserState,
  UserActionType,
} from "./hooks/createUserStore";
import { Navigate } from "react-router-dom";

function UserNamePrompt() {
  const [localUserName, setLocalUserName] = useState<string>('')
  const userDispatch = useUserDispatch();
  const {userName} = useUserState();

  if (userName) {
    return <Navigate to="/home" replace={true} />
  }

  return (
    <div
      className="window"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
      }}
    >
      <div className="field-row-stacked" style={{ width: "200px" }}>
        <label htmlFor="text22" style={{ fontSize: "1rem" }}>
          Provide your username
        </label>
        <input
          id="text22"
          type="text"
          style={{ fontSize: "1rem" }}
          value={localUserName}
          onChange={(e) =>
            setLocalUserName(e.target.value)
          }
        />
        <button
          onClick={() => {
            if ((localUserName?.length ?? "") > 3) {
              userDispatch({
                type: UserActionType.SET_USER_NAME,
                payload: localUserName,
              });
              return;
            }

            alert("You must set a username with at least 4 characters");
            userDispatch({
              type: UserActionType.SET_USER_NAME,
              payload: "",
            });
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default UserNamePrompt;
