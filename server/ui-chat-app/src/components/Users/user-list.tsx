import React, { ChangeEventHandler, useEffect, useState } from "react";
import { IUser, IUserList } from "./IUser";
import { io } from "socket.io-client";

const UserList = (props: any) => {
  const { socket } = props;
  const [users, setUser] = useState<IUser[]>();
  const [userName, setUserName] = useState<string | null>();
  const [userAge, setUserAge] = useState<number | null>();
  // const [socket , setSocket] = useState<any | null>();
  useEffect(() => {
    if (socket) {
      socket.on("GetUsersList", (users) => {
        setUser(users);
      });
      socket.emit("getUserList", (data) => {
        console.log(data);
      });
    }
  }, [socket]);
  const NameChangeHandler = (e: any) => {
    setUserName(e.target.value);
  };
  const AgeChangeHandler = (e: any) => {
    setUserAge(e.target.value);
  };
  const AddUserHandle = () => {
    const user: IUser = {
      id: "",
      name: userName ? userName : "",
      age: userAge ? userAge : 1,
      isActive: true,
    };
    console.log(user);
    socket.emit("addUser", user);
  };
  return (
    <div>
      Add New User <br />
      <input
        onChange={NameChangeHandler}
        type="text"
        placeholder="Provide your name"
      ></input>
      <br />
      <input
        onChange={AgeChangeHandler}
        type="number"
        min={1}
        max={100}
        placeholder="Enter your Age"
      />
      <br />
      <button onClick={AddUserHandle}>Add User</button>
      {users &&
        users.length > 0 &&
        users.map((user) => {
          return (
            <>
              <div key={user.id}>{user.name}</div>
            </>
          );
        })}
    </div>
  );
};

export default UserList;
