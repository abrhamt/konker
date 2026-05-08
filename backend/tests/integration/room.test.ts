// =============================================

// KONKER – Ethiopian Rummy 41

// Integration Tests: Room Flow

// Generated: November 12, 2025 12:20 AM EAT

// =============================================

import { io as Client } from 'socket.io-client';

import { Server } from 'socket.io';

import http from 'http';

import { describe, beforeAll, afterAll, test, expect } from '@jest/globals';

describe('Room Integration', () => {

let io: Server, server: http.Server, client1: any, client2: any;

beforeAll((done) => {


server = http.createServer();

io = new Server(server);

// Register handlers here

server.listen(() => {

const port = server.address().port;

client1 = Client(`http://localhost:${port}`, { auth: { token: 'test1' } });

client2 = Client(`http://localhost:${port}`, { auth: { token: 'test2' } });

client1.on('connect', () => client2.on('connect', done));

});

});

afterAll(() => {

io.close();

client1.close();

client2.close();

});

test('create and join room', (done) => {

client1.emit('create_room', { nickname: 'Host' });

client1.on('state:init', (data: any) => {

const roomCode = data.state.room_code;

client2.emit('join_room', { room_code: roomCode, nickname: 'Guest' });

client2.on('state:init', () => {

expect(data.state.players.length).toBe(2);


done();

});

});

});

});
