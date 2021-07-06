import React from "react";
import "./input.component.css";

const Input = ({ message, setMessage, sendMessage }) => (
  <form className="form">
    <input
      className="input"
      type="text"
      value={message}
      onChange={(event) => setMessage(event.target.value)}
      onKeyPress={(event) => (event.key === "Enter" ? sendMessage(event) : "")}
    />
    <button className="sendButton" onClick={(event) => sendMessage(event)}>
      send
    </button>
  </form>
);

export default Input;
