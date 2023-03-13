import React, { useState, useEffect, useRef } from "react";
import BuddyListGroup from "./BuddyListGroup";
import { useClickOutside } from "./hooks/useClickOutside";
import {useWebSocketContext} from './hooks/createWebSocketStore';
import { useUserState } from "./hooks/createUserStore";
import styles from "./drawer.module.css";

// https://botoxparty.github.io/XP.css/
// https://github.com/botoxparty/XP.css
import "xp.css/dist/XP.css";

const drawerStylesConstants = {
  MAXIMIZED: `${styles.container} ${styles.maximize}`,
  NON_MAXIMIZED: `${styles.container} ${styles.slide}`,
};

interface IDrawerProps {
  isOpen: boolean;
  setDrawerIsOpenToFalse: () => void;
}

function Drawer({ isOpen, setDrawerIsOpenToFalse }: IDrawerProps) {
  const { userName } = useUserState();
  const {lastJsonMessage} = useWebSocketContext();
  const [usersOnline, setUsersOnline] = useState<Array<string>>([]);
  const [usersOffline, setUsersOffline] = useState<Array<string>>([]);
  const drawerRef = useRef(null);
  const [drawerStyles, setDrawerStyles] = useState<string>(styles.container);

  useEffect(() => {
    if (isOpen) {
      setDrawerStyles(drawerStylesConstants.NON_MAXIMIZED);
    }
  }, [isOpen]);

  useEffect(() => {
    //@ts-ignore
    if (lastJsonMessage?.onlineUsers) {
        //@ts-ignore
        setUsersOnline(lastJsonMessage?.onlineUsers);
    }
  }, [lastJsonMessage]);

  useClickOutside(drawerRef, closeDrawer);

  function maximizeDrawer() {
    if (drawerStyles !== drawerStylesConstants.MAXIMIZED) {
      setDrawerStyles(drawerStylesConstants.MAXIMIZED);
    } else {
      setDrawerStyles(drawerStylesConstants.NON_MAXIMIZED);
    }
  }

  function closeDrawer() {
    setDrawerStyles(styles.container);
    setDrawerIsOpenToFalse();
  }
  return (
    <div
      className={[drawerStyles, "window"].join(" ")}
      style={{ background: "rgb(214,214,206)" }}
      ref={drawerRef}
    >
      <div className="title-bar" style={{ flexBasis: 0 }}>
        <div className="title-bar-text">AOL Instant Messenger</div>
        <div className="title-bar-controls">
          <button aria-label="Minimize" onClick={closeDrawer}></button>
          <button aria-label="Maximize" onClick={maximizeDrawer}></button>
          <button aria-label="Close" onClick={closeDrawer}></button>
        </div>
      </div>
      <div
        className="window-body"
        style={{ flexBasis: "100%", background: "rgb(214,214,206)" }}
      >
        <section className="tabs" style={{ height: "90%" }}>
          <menu role="tablist">
            <button
              style={{ background: "rgb(214,214,206)", fontSize: "1rem" }}
              // onClick={() => setSelectedTab(1)}
              aria-controls="music"
            >
              Online
            </button>
            <button
              style={{ background: "rgb(214,214,206)", fontSize: "1rem" }}
              // onClick={() => setSelectedTab(2)}
              aria-controls="dogs"
            >
              List Setup
            </button>
          </menu>

          <article
            role="tabpanel"
            style={{
              height: "100%",
              background: "rgb(214,214,206)",
              padding: ".5rem .5rem 2.5rem .5rem",
            }}
            id="tab-a"
          >
            <div
              style={{
                height: "100%",
                background: "white",
                borderTop: "1.5px solid black",
                borderLeft: "1.5px solid black",
                borderRight: "1.5px solid white",
                borderBottom: "1.5px solid white",
              }}
            >
              <div
                style={{
                  height: "100%",
                  borderRight: "1.5px solid rgb(214,214,206)",
                  borderBottom: "1.5px solid rgb(214,214,206)",
                }}
              >
                <ul
                  style={{
                    display: "flex",
                    flexFlow: "column",
                    width: "12rem",
                    gap: ".5rem 0",
                  }}
                >
                  {[
                    {
                      groupName: "Buddies",
                      buddies: usersOnline.filter(user => user !== userName),
                    },
                    {
                      groupName: "offline",
                      buddies: usersOffline,
                    },
                  ].map((buddyListGroup, key) => (
                    <BuddyListGroup
                      key={key}
                      groupName={buddyListGroup.groupName}
                      closeDrawer={closeDrawer}
                      buddies={buddyListGroup.buddies}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </article>
        </section>
      </div>
    </div>
  );
}

export default Drawer;
