import React, { useState, useEffect, useRef } from "react";
import BuddyListGroup from "./BuddyListGroup";
import { useClickOutside } from "./hooks/useClickOutside";
import styles from "./drawer.module.css";

// https://botoxparty.github.io/XP.css/
// https://github.com/botoxparty/XP.css
import "xp.css/dist/XP.css";

interface IDrawerProps {
  isOpen: boolean;
  setDrawerIsOpenToFalse: () => void;
}

function Drawer({ isOpen, setDrawerIsOpenToFalse }: IDrawerProps) {
  const drawerRef = useRef(null);
  const [selectedTab, setSelectedTab] = useState<number>(1);
  const [drawerStyles, setDrawerStyles] = useState<string>(styles.container);

  useEffect(() => {
    if (isOpen) {
      setDrawerStyles(`${styles.container} ${styles.slide}`);
    }
  }, [isOpen]);

  useClickOutside(drawerRef, closeDrawer);

  function maximizeDrawer() {
    setDrawerStyles(`${styles.container} ${styles.maximize}`);
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
              aria-selected={selectedTab === 1}
              onClick={() => setSelectedTab(1)}
              aria-controls="music"
            >
              Online
            </button>
            <button
              style={{ background: "rgb(214,214,206)", fontSize: "1rem" }}
              aria-selected={selectedTab === 2}
              onClick={() => setSelectedTab(2)}
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
                  <BuddyListGroup
                    groupName="Buddies (4/14)"
                    buddies={[
                      "PixieGal999",
                      "CatLoverrr04",
                      "DancingGirl229",
                      "PrincessJ9966532",
                    ]}
                  />

                  <BuddyListGroup
                    groupName="Co-workers (3/7)"
                    buddies={[
                      "RollTheDice9285",
                      "FairyQueen2286532",
                      "DanTheMan29012",
                    ]}
                  />
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
