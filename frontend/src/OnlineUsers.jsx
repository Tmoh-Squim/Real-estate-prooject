import React, { useEffect, useState } from 'react'
import socket from './socket';

const OnlineUsers = () => {
    const [onlineUsers,setOnlineUsers] = useState([]);

    useEffect(()=>{
        socket.on("getUsers",(users)=>setOnlineUsers(users))
      },[])
  return (
   onlineUsers
  )
}

export default OnlineUsers