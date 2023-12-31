import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { IUser } from "../Users/IUser";
import "./style.css";
import { IUserPanel } from "./interface";
const UserPanel = (props: IUserPanel) => {
  const { socket, selectedUser, setSelectedUser } = props;
  const [users, setUsers] = useState<IUser[]>();
  useEffect(() => {
    console.log(socket);
    if (socket) {
      socket.on("GetUsersList", (users) => {
        console.log(users);
        setUsers(users);
      });
      socket.emit("getUserList", (data) => {
        console.log(data);
        setUsers(data);
      });
    }
  }, [socket]);
  const cardClickHandler = (user: IUser) => {
    setSelectedUser(user);
  };
  return (
    <div>
      {users?.map((user) => {
        return (
          <div
            key={user.id}
            className="team-card"
            onClick={() => {
              cardClickHandler(user);
            }}
          >
            {user.name}
          </div>
        );
      })}
    </div>
  );
};

export default UserPanel;
