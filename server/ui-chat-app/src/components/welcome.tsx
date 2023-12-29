import React, { useEffect } from 'react'
import { useState } from 'react';
import { io } from "socket.io-client";

const Welcome = () => {
    const [input , setInput] = useState();
    const [socket, setSocket] = useState<null | any>();
    useEffect(() => {
      const socket = io("http://localhost:3001")
      setSocket(socket);
      socket.on("event_response", (data) => {
        console.log("data recieved from backend code ", data);
      })
    },[])
    const inputchangeHandler = (e : any) => {
        const inputData = e.target.value;
        setInput(inputData);
    }
    const clickMeHandler = () => {
        console.log("click me " , input);
        socket.emit("event",{data:input})
    }
  return (
    <div>
      <input type="text" onChange={inputchangeHandler}></input>
      <button onClick={clickMeHandler}>Click Me</button>
    </div>
  )
}

export default Welcome
