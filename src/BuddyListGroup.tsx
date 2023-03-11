import React, { useState } from "react";
import IconArrowRight from "./icons/IconArrowRight";
import IconArrowDropDown from "./icons/IconArrowDropDown";
import styles from "./BuddyListGroup.module.css";

import "xp.css/dist/XP.css";

interface IBuddyListGroupProps {
  buddies: Array<string>;
  groupName: string;
}

function BuddyListGroup({ buddies, groupName }: IBuddyListGroupProps) {
  const [buddiesAreShowing, setBuddiesAreShowing] = useState<boolean>(false);

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
            {buddies.map((buddy) => (
              <li>{buddy}</li>
            ))}
          </ul>
        ) : null}
      </button>
    </li>
  );
}

export default BuddyListGroup;