import React, { useState } from "react";
import Drawer from "./Drawer";
import ChatWindow from "./ChatWindow";

function App() {
  const [drawerIsOpen, setDrawerIsOpen] = useState<boolean>(false);
  return (
    <>
      <button onClick={() => setDrawerIsOpen((prev) => !prev)}>
        Open Drawer
      </button>
      <Drawer
        isOpen={drawerIsOpen}
        setDrawerIsOpenToFalse={() => setDrawerIsOpen(false)}
      />

      <ChatWindow />
    </>
  );
}

export default App;
