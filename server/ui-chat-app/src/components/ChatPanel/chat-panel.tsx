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
      socket.emit("GetUserDetails", { userId: selectedUser?.id });
    }
    socket.on("UserDetails", (data) => {
      console.log(data);
    });
  }, [
    selectedUser,
    // GetUserDetails
  ]);
  return <div>Hi This is the main component for chat</div>;
};

export default ChatPanel;
