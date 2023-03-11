import React from "react";
import aolSendIcon from './assets/images/aolSendIcon.png';
import styles from './ChatWindow.module.css';

function ChatWindow() {
  return (
    <div
      draggable
      className="window"
      style={{
        width: "400px",
        cursor: "move",
        height: "300px",
        background: "rgb(214,214,206)",
      }}
    >
      <div className="title-bar" style={{ flexBasis: 0 }}>
        <div className="title-bar-text">Instance Message</div>
        <div className="title-bar-controls">
          <button aria-label="Minimize"></button>
          <button aria-label="Maximize"></button>
          <button aria-label="Close"></button>
        </div>
      </div>
      <div
        className="window-body"
        style={{
          display: "flex",
          flexFlow: "column",
          gap: '1rem 0',
          height: "80%",
          flexBasis: 1,
          background: "rgb(214,214,206)",
        }}
      >
        <section
          style={{
            background: "rgb(214,214,206)",
            display: "flex",
            flexFlow: "column",
            flexBasis: '100%',
            height: '400px',
            gap: "1rem 0",
          }}
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
              HI
            </div>
          </div>
        </section>

        <section
          style={{
            background: "rgb(214,214,206)",
            display: "flex",
            flexFlow: "column",
          }}
        >
        <div
            style={{
              background: "white",
              borderTop: "1.5px solid black",
              borderLeft: "1.5px solid black",
              borderRight: "1.5px solid white",
              borderBottom: "1.5px solid white",
            }}
          >
            <div
              style={{
                borderRight: "1.5px solid rgb(214,214,206)",
                borderBottom: "1.5px solid rgb(214,214,206)",
              }}
            >
              <div className="field-row-stacked" style={{ width: "100%" }}>
                <textarea id="text24" rows={4} className={styles.textarea}></textarea>
              </div>
            </div>
          </div>
        </section>

        <section
          className="field-row"
          style={{ justifyContent: "flex-end", background: "rgb(214,214,206)" }}
        >
          <button style={{display: 'flex', padding: 0, alignItems: 'center'}}>
            <img width='30px' src={aolSendIcon} style={{background: 'inherit'}} alt="AOL Send Icon" />
            <div>
              Send
            </div>
          </button>
        </section>
      </div>
    </div>
  );
}

export default ChatWindow;
