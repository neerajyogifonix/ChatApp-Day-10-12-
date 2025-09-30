import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import JoinChat from "./Components/JoinChat";
import ChatWindow from "./Components/ChatWindow";
import { ToastContainer, toast } from 'react-toastify';

const API_URL = import.meta.env.VITE_API_URL;


// Establishing connection with the server
const socket = io(API_URL, {
  transports: ["websocket"], // ensures WebSocket is used
});

console.log(API_URL);

function App() {
  const [name, setName] = useState("");
  const [roomID, setRoomID] = useState("");
  const [chatWindow, setChatWindow] = useState(false);
  const [msgList, setMsgList] = useState([]);

  function updateMsgList(data) {
    setMsgList([...msgList, data]);
  }; 

  function setData(NAME, ROOMID) {
    
    setName(NAME);
    setRoomID(ROOMID);
  }

  function setChatWindowHandler(NAME, ROOMID) {
    
    if(NAME.length == 0 || ROOMID.length == 0) {
      toast.error("Fill details properly !!");
      return;
    } else {
      socket.on("welcomeMessage", (msg) => {
        toast.success(msg.text)
      });
    }

    socket.on("chatHistory", (history) => {
      // console.log(history);
      setMsgList(history);
    });
    setChatWindow(true);
  }
  

  return (
    <div>
      {chatWindow ? (
        <ChatWindow socket={socket} name={name} roomID={roomID} msgList={msgList} setMsgList={setMsgList}/>
      ) : (
        <JoinChat
          socket={socket}
          setData={setData}
          setChatWindowHandler={setChatWindowHandler}
        />
      )}
       <ToastContainer />
    </div>
  );
}

export default App;
