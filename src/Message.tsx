import React from "react";

export enum Direction {
  OUT_BOUND = "OUT_BOUND",
  IN_BOUND = "IN_BOUND",
}

interface IMessage {
  userName: string;
  message: string;
  direction: Direction;
  key: number;
  isFirstChild: boolean;
}

function Message({ userName, message, direction, isFirstChild }: IMessage) {
  return (
    <div className="title-bar-text" style={{ display: "flex", marginTop: isFirstChild ? 'auto' : ''}}>
      <div
        style={{
          color: direction === Direction.OUT_BOUND ? "blue" : "red",
          fontWeight: 700,
        }}
      >
        {userName}:{" "}
      </div>
      <div style={{ color: "black", fontWeight: "300" }}>{message}</div>
    </div>
  );
}

export default Message;
