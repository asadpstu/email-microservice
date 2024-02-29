import React, { useEffect } from 'react';
import {io} from 'socket.io-client';

export default function Home() {
  useEffect(() => {
    console.log("Trying to connect sockket...")
    const socket = io('http://localhost:3002',{
      transports: ['websocket']
   });
    socket.on("connect", () => {
      console.log("Connected!")
    })
    
    socket.on('EMAIL_SENT', (msg) => {
      console.log('Received message by client:', msg);
      alert(msg)
    });

    socket.on("connect_error", async err => {
      console.log(`connect_error due to ${err.message}`)
    })

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-10`}
    >
        hello there
    </main>
  );
}
