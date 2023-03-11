import React, { useState, useEffect, MouseEventHandler } from "react";
import styles from "./drawer.module.css";

interface IDrawerProps {
  isOpen: boolean;
  setDrawerIsOpenToFalse: () => void;
}

function Drawer({ isOpen, setDrawerIsOpenToFalse }: IDrawerProps) {
  const [selectedTab, setSelectedTab] = useState<number>(1);
  const [drawerStyles, setDrawerStyles] = useState<string>(styles.container);
  useEffect(() => {
    if (isOpen) {
      setDrawerStyles(`${styles.container} ${styles.slide}`);
    }
  }, [isOpen]);

  function maximizeDrawer() {
    setDrawerStyles(`${styles.container} ${styles.maximize}`);
  }

  function closeDrawer() {
    setDrawerStyles(styles.container);
    setDrawerIsOpenToFalse();
  }
  return (
    <div className={[drawerStyles, "window"].join(" ")}>
      <div className="title-bar" style={{ flexBasis: 0 }}>
        <div className="title-bar-text">AOL Instant Messenger</div>
        <div className="title-bar-controls">
          <button aria-label="Minimize" onClick={closeDrawer}></button>
          <button aria-label="Maximize" onClick={maximizeDrawer}></button>
          <button aria-label="Close" onClick={closeDrawer}></button>
        </div>
      </div>
      <div className="window-body" style={{ flexBasis: "100%" }}>
        <section className="tabs" style={{ height: "90%" }}>
          <menu role="tablist">
            <button
              aria-selected={selectedTab === 1}
              onClick={() => setSelectedTab(1)}
              aria-controls="music"
            >
              Online
            </button>
            <button
              aria-selected={selectedTab === 2}
              onClick={() => setSelectedTab(2)}
              aria-controls="dogs"
            >
              List Setup
            </button>
          </menu>

          <article
            role="tabpanel"
            style={{ height: "100%" }}
            id="tab-a"
          ></article>
        </section>
      </div>
    </div>
  );
}

export default Drawer;
