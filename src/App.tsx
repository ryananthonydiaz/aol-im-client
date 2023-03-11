import React, { useState } from "react";
import Drawer from "./Drawer";

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
    </>
  );
}

export default App;
