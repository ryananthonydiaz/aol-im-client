import React, { useState } from "react";
import Drawer from "./Drawer";
import ChatWindow from "./ChatWindow";
import Provider from "./Provider";

function App() {
  const [drawerIsOpen, setDrawerIsOpen] = useState<boolean>(false);
  return (
    <Provider>
      <button onClick={() => setDrawerIsOpen((prev) => !prev)}>
        Open Drawer
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
