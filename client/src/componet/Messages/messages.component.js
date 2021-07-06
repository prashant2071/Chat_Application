import React from "react";
import ScrollToButton from "react-scroll-to-bottom";
import "./messages.component.css";
import Message from "../Message/message.component";

const Messages = ({ messages, name }) => {
  return (
    <ScrollToButton className="messages">
      {messages.map((message, i) => (
        <div key={i}>
          <Message message={message} name={name}></Message>
        </div>
      ))}
    </ScrollToButton>
  );
};
export default Messages;
