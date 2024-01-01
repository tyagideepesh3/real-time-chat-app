import React, {
  ChangeEvent,
  InputHTMLAttributes,
  useEffect,
  useState,
} from "react";
import { io } from "socket.io-client";
const LoginUser = () => {
  const [loginUser, setLoginUser] = useState<string>();
  const [socket, setSocket] = useState<any | null>();
  useEffect(() => {
    const socket = io("http://localhost:3001");
    setSocket(socket);
  }, []);
  const loginHandler = () => {
    console.log(loginUser);
    socket.emit("GetUserDetailsByUserName", loginUser, (response) => {
      console.log(response);
      console.log(JSON.stringify(response));
      localStorage.setItem("userDetails", JSON.stringify(response));
    });
  };
  return (
    <div>
      <h1>Login User</h1>
      <input
        type="text"
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setLoginUser(e.target.value);
        }}
      />
      <button onClick={loginHandler}>Login</button>
    </div>
  );
};

export default LoginUser;
