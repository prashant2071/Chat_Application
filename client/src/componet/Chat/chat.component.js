import React, { useState, useEffect } from "react"; //USE Effect hooks is for component Life Cycle
import "./chat.component.css";
import io from "socket.io-client";
import queryString from "query-string";
import "./chat.component.css";
import InfoBar from "./../InfoBar/infoBar";
import Input from "./../Input/input.component";
import Messages from "./../Messages/messages.component";
import TextContainer from "./../TextContainer/TextContainer";
let socket;

const Chat = (props) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const ENDPOINT = "https://node-chatapp1.herokuapp.com/";

  useEffect(() => {
    //useEffect componetDidMount and ComponentDidUpdatejasto work garxa
    console.log(props);
    //query-string convert the query into object type
    const { name, room } = queryString.parse(props.location.search); //location props we get from router we can write props.location also search data query ma aauxa
    console.log("query string value", queryString.parse(props.location.search));

    socket = io(ENDPOINT);
    // object shorthand

    setName(name);
    setRoom(room);
    socket.emit("join", { name, room }, (error) => {});

    return () => {
      // to finish useEffect we use return statement its like componentDidUnmount
      socket.emit("disconnect");
      socket.off();
    };
  }, [ENDPOINT, props.location.search]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, [message]); //if present message will only activate

  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit("sendmessage", message, () => setMessage(""));
    }
  };

  console.log(message, messages);

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room} />
        <Messages messages={messages} name={name} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
      <TextContainer users={users} />
    </div>
  );
};
export default Chat;
