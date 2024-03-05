import { Server } from 'socket.io';

let socketIO: Server | null = null;

export const initializeSocketIO = (io: Server) => {
    socketIO = io;
};

export const getSocketIO = () => {
    if (!socketIO) {
        throw new Error('SocketIO is not initialized');
    }
    return socketIO;
};
