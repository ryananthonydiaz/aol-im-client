import React, { useState, MouseEvent } from "react";
import {
  useChatWindowDispatch,
  ChatWindowActionType,
} from "./hooks/createChatWindowStore";
import IconArrowRight from "./icons/IconArrowRight";
import IconArrowDropDown from "./icons/IconArrowDropDown";
import styles from "./BuddyListGroup.module.css";

import "xp.css/dist/XP.css";

interface IBuddyListGroupProps {
  buddies: Array<string>;
  groupName: string;
  closeDrawer: () => void;
}

function BuddyListGroup({
  buddies,
  groupName,
  closeDrawer,
}: IBuddyListGroupProps) {
  const [buddiesAreShowing, setBuddiesAreShowing] = useState<boolean>(false);
  const chatWindowDispatch = useChatWindowDispatch();

  function createNewChat(e: MouseEvent<HTMLLIElement>, buddy: string) {
    e.stopPropagation();
    chatWindowDispatch({
      type: ChatWindowActionType.CREATE_NEW_CHAT_WINDOW,
      payload: {
        windowIsOpen: true,
        recipient: buddy,
        chatRoomId: Math.floor(Math.random() * 100),
      },
    });

    closeDrawer();
  }

  return (
    <li>
      <button
        className={styles.button}
        onClick={() => setBuddiesAreShowing((prev) => !prev)}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          {buddiesAreShowing ? <IconArrowDropDown /> : <IconArrowRight />}
          <div
            style={{
              fontFamily: "Trebuchet MS",
              fontSize: "1rem",
              fontWeight: 700,
            }}
          >
            {groupName}
          </div>
        </div>
        {buddiesAreShowing ? (
          <ul
            style={{
              paddingLeft: "1.25rem",
              display: "flex",
              flexFlow: "column",
              textAlign: "left",
              gap: "0.125rem 0",
            }}
          >
            {buddies.map((buddy, index) => (
              <li key={buddy + index} onClick={(e) => createNewChat(e, buddy)}>
                {buddy}
              </li>
            ))}
          </ul>
        ) : null}
      </button>
    </li>
  );
}

export default BuddyListGroup;
