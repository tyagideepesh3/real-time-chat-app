import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { IChatPanel } from "./interface";

const ChatPanel = (props: IChatPanel) => {
  const { selectedUser, setSelectedUser } = props;
  const [socket, setSocket] = useState<any | null>();
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
  return (
    <div>
      <div className="chat-panel-title">
        {selectedUser && <h2>{selectedUser.name.toLocaleUpperCase()}</h2>}
      </div>
      <div>Chat Section Main</div>
    </div>
  );
};

export default ChatPanel;
