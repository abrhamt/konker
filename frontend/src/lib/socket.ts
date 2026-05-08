// =============================================

// KONKER – Ethiopian Rummy 41

// Socket.io Connection Wrapper

// Generated: November 12, 2025 12:20 AM EAT

// =============================================


import { io, Socket } from 'socket.io-client';

import type { ServerEvents, ClientEvents } from '@/types/socket';

class SocketService {

private socket: Socket | null = null;

connect(token: string): Socket {

this.socket = io(import.meta.env.VITE_SOCKET_URL, {

auth: { token },

transports: ['websocket'],

reconnection: true,

reconnectionAttempts: 5,

reconnectionDelay: 1000

});

this.socket.on('connect', () => {

console.log('Connected to Konker server');

});

this.socket.on('connect_error', (err) => {

console.error('Connection error:', err.message);

});

return this.socket;


## }

getSocket(): Socket | null {

return this.socket;

}

disconnect(): void {

this.socket?.disconnect();

this.socket = null;

}

on<E extends keyof ServerEvents>(

event: E,

listener: (data: ServerEvents[E]) => void

): void {

this.socket?.on(event, listener);

}

off<E extends keyof ServerEvents>(

event: E,

listener?: (data: ServerEvents[E]) => void

): void {

this.socket?.off(event, listener);

}


emit<E extends keyof ClientEvents>(

event: E,

data: ClientEvents[E]

): void {

this.socket?.emit(event, data);

}

}

export const socketService = new SocketService();
