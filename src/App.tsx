import React, { useState } from "react";
import Drawer from "./Drawer";
import ChatWindow from "./ChatWindow";
import IconMenu from "./icons/IconMenu";
import Provider from "./Provider";
import appStyles from "./App.module.css";
import styles from "./BuddyListGroup.module.css";

function App() {
  const [drawerIsOpen, setDrawerIsOpen] = useState<boolean>(false);
  return (
    <Provider>
      <button
        className={[styles.button, appStyles.menuToggle].join(" ")}
        onClick={() => setDrawerIsOpen((prev) => !prev)}
      >
        <IconMenu />
      </button>
      <Drawer
        isOpen={drawerIsOpen}
        setDrawerIsOpenToFalse={() => setDrawerIsOpen(false)}
      />

      <ChatWindow />
    </Provider>
  );
}

export default App;
