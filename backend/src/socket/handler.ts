import { Server, Socket } from 'socket.io';

import { validate } from 'zod-validation-error';

import { ClientSchemas } from '../validation';


import { profanityFilter } from '../utils/profanity';

import { rateLimiter } from '../middleware/rateLimit';

import logger from '../logger';

import { activeRooms, socketEvents } from '../metrics';

const rooms = new Map<string, any>();

const players = new Map<string, any>();

export function setupSocket(io: Server) {

io.on('connection', (socket: Socket) => {

logger.info(`Player connected: ${socket.id}`);

socket.on('create_room', rateLimiter('create', 1, async (data) => {

const result = ClientSchemas.create_room.safeParse(data);

if (!result.success) return socket.emit('error', { message: 'Invalid data' });

const roomCode = `KNK-${Math.random().toString(36).substr(2, 4).toUpperCase()}`;

rooms.set(roomCode, { host: socket.id, players: [socket.id] });

socket.join(roomCode);

socket.emit('room_created', { room_code: roomCode });

activeRooms.inc({ status: 'waiting' });

}));

socket.on('join_room', rateLimiter('join', 3, async (data) => {


const result = ClientSchemas.join_room.safeParse(data);

if (!result.success || !rooms.has(data.room_code)) return socket.emit('error', { message:
'Invalid room' });

const room = rooms.get(data.room_code);

if (room.players.length >= 6) return socket.emit('error', { message: 'Room full' });

room.players.push(socket.id);

socket.join(data.room_code);

players.set(socket.id, { id: socket.id, nickname: data.nickname, room_code: data.room_code
});

io.to(data.room_code).emit('player_joined', { player_id: socket.id, nickname: data.nickname
});

}));

socket.on('send_chat', rateLimiter('chat', 1, async (data) => {

const player = players.get(socket.id);

if (!player) return;

const clean = profanityFilter(data.message);

if (!clean) return;

const msg = { player_id: player.id, nickname: player.nickname, message: clean, timestamp:
new Date().toISOString() };

io.to(player.room_code).emit('chat_message', msg);

socketEvents.inc({ event: 'chat', status: 'sent' });


## }));

// Voice signaling

socket.on('voice:offer', (data) => {

io.to(data.to).emit('voice:offer', { from: socket.id, offer: data.offer });

});

socket.on('voice:answer', (data) => {

io.to(data.to).emit('voice:answer', { from: socket.id, answer: data.answer });

});

socket.on('voice:ice', (data) => {

io.to(data.to).emit('voice:ice', { from: socket.id, candidate: data.candidate });

});

socket.on('disconnect', () => {

const player = players.get(socket.id);

if (player) {

const room = rooms.get(player.room_code);

if (room) {

room.players = room.players.filter((p: string) => p !== socket.id);

if (room.players.length === 0) rooms.delete(player.room_code);

}

players.delete(socket.id);


logger.info(`Player disconnected: ${socket.id}`);

}

});

});

}
