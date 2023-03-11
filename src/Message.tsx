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
    <div
      style={{ display: "flex", fontFamily: 'Georgia', fontSize: '1rem', marginTop: isFirstChild ? "auto" : "" }}
    >
      <span
        style={{
          color: direction === Direction.OUT_BOUND ? "blue" : "red",
          fontWeight: 700,
        }}
      >
        {userName}: <span style={{ color: "black", fontWeight: "300" }}>{message}</span>
      </span>
    </div>
  );
}

export default Message;
