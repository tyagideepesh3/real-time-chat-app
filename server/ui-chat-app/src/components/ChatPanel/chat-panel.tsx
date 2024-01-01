import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { IChatPanel } from "./interface";
import "./style.css";
const ChatPanel = (props: IChatPanel) => {
  const { selectedUser, setSelectedUser } = props;
  const [socket, setSocket] = useState<any | null>();
  const [userText, setUserText] = useState<string | null>();
  useEffect(() => {
    const socket = io("http://localhost:3001");
    setSocket(socket);
    if (selectedUser) {
      socket.emit(
        "GetUserDetails",
        { userId: selectedUser?.id },
        (response) => {
          console.log(response);
        }
      );
    }
    // socket.on("UserDetails", (data) => {
    //   console.log(data);
    // });
  }, [selectedUser]);
  const ChangeHandler = (e: any) => {
    // console.log(e.target.value);
    setUserText(e.target.value);
  };
  const SendButtonHandler = () => {
    // console.log("send ", userText);
  };
  return (
    <div className="chat-container">
      <div className="chat-panel-title">
        {selectedUser && <h2>{selectedUser.name.toLocaleUpperCase()}</h2>}
        <div>
          <input type="text" onChange={ChangeHandler} />
          <button onClick={SendButtonHandler}>Send</button>
        </div>
      </div>
      <div>Chat Section Main</div>
    </div>
  );
};

export default ChatPanel;
