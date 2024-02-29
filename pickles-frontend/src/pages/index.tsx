import { StatusData } from '@/type';
import React, { useState, useEffect, useCallback } from 'react';
import {io} from 'socket.io-client';
import config from '../config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  const [statusData, setStatusData] = useState<StatusData[]>([]);

  const fetchStatusData = useCallback(async () => {
      try {
          const response = await fetch(`${config.API_SERVICE_ENDPOINT}/email-delievery-service`);
          const data = await response.json();
          setStatusData(data);
      } catch (error) {
          console.error('Error fetching status data:', error);
      }
  }, []);

  useEffect(() => {
    fetchStatusData();
    const socket = io(config.SOCKET_SERVICE_ENDPOINT,{
      transports: ['websocket']
   });
    socket.on("connect", () => {
      console.log("Connected!")
    })
    
    socket.on('EMAIL_SENT', (msg) => {
      console.log('Received message by client:', msg);
      toast(msg)
      fetchStatusData();
    });

    socket.on('NEW_REQUEST_SAVED', (msg) => {
      console.log('Received message by client:', msg);
      toast(msg)
      fetchStatusData();
    });

    socket.on("connect_error", async err => {
      console.log(`connect_error due to ${err.message}`)
    })

    return () => {
      socket.disconnect();
    };
  }, []);
  const notify = () => toast("Wow so easy!");
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-10`}
    >
        <div className="container mx-auto">
            <h2 className="text-2xl font-bold mb-4">Email Delivery Status</h2>
            <ToastContainer />
            <table className="min-w-full">
                <thead>
                    <tr>
                        <th className="px-4 py-2">ID</th>
                        <th className="px-4 py-2">Receiver</th>
                        <th className="px-4 py-2">Subject</th>
                        <th className="px-4 py-2">Body</th>
                        <th className="px-4 py-2">Status</th>
                        <th className="px-4 py-2">Created At</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {statusData.map((status) => (
                        <tr key={status.id}>
                            <td className="border px-4 py-2">{status.id}</td>
                            <td className="border px-4 py-2">{status.receiver}</td>
                            <td className="border px-4 py-2">{status.subject}</td>
                            <td className="border px-4 py-2">{status.body}</td>
                            <td className="border px-4 py-2">{status.status ? 'Sent' : 'In-progress'}</td>
                            <td className="border px-4 py-2">{new Date(status.createdAt).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </main>
  );
}
