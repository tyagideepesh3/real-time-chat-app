import React, { useEffect } from "react";
import { useState } from "react";
import { io } from "socket.io-client";
import UserList from "../components/Users/user-list.tsx";
import UserPanel from "./UserPanel/user-panel.tsx";
import ChatPanel from "./ChatPanel/chat-panel.tsx";
import "./style.css";
import { IUser } from "./Users/IUser.ts";

const Welcome = () => {
  const [input, setInput] = useState();
  const [socket, setSocket] = useState<null | any>();
  const [selectedUser, setSelectedUser] = useState<IUser | null>();
  useEffect(() => {
    const socket = io("http://localhost:3001");
    setSocket(socket);
    socket.on("event_response", (data) => {
      console.log("data recieved from backend code ", data);
    });
  }, []);
  const inputchangeHandler = (e: any) => {
    const inputData = e.target.value;
    setInput(inputData);
  };
  const clickMeHandler = () => {
    console.log("click me ", input);
    socket.emit("event", { data: input });
  };
  return (
    <div>
      <input type="text" onChange={inputchangeHandler}></input>
      <button onClick={clickMeHandler}>Click Me</button>
      <UserList socket={socket} />
      <div className="container">
        <UserPanel
          socket={socket}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
        />
        <ChatPanel
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
        />
      </div>
    </div>
  );
};

export default Welcome;
