import React, { Dispatch } from "react";

interface IUserNamePromptProps {
  setPromptIsOpen: Dispatch<React.SetStateAction<boolean>>;
  setPromptedUserName: Dispatch<React.SetStateAction<string>>;
  promptedUserName: string;
}

function UserNamePrompt({
  promptedUserName,
  setPromptIsOpen,
  setPromptedUserName,
}: IUserNamePromptProps) {
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
          style={{fontSize: '1rem'}}
          value={promptedUserName}
          onChange={(e) => setPromptedUserName(e.target.value)}
        />
        <button
          onClick={() => {
            if (promptedUserName.length > 3) {
              setPromptIsOpen(false);
              return;
            }

            alert("You must set a username with at least 4 characters");
            setPromptedUserName("");
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default UserNamePrompt;
