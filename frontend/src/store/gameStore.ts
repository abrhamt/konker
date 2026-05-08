// =============================================

// KONKER – Ethiopian Rummy 41

// Modular Zustand Game Store

// Generated: November 12, 2025 12:20 AM EAT

// =============================================

import { create } from 'zustand';

import { devtools } from 'zustand/middleware';

import { io, Socket } from 'socket.io-client';

import type { GameState, ServerEvents, ClientEvents } from '@/types/socket';

interface GameStore {

// State

socket: Socket | null;


gameState: GameState | null;

playerId: string | null;

isConnected: boolean;

// Actions

connect: (token: string) => void;

disconnect: () => void;

send: <T extends keyof ClientEvents>(event: T, data: ClientEvents[T]) => void;

setGameState: (state: GameState) => void;

updateState: (diff: ServerEvents.StateUpdate['diff']) => void;

}

export const useGameStore = create<GameStore>()(

devtools((set, get) => ({

socket: null,

gameState: null,

playerId: null,

isConnected: false,

connect: (token) => {

const socket = io(import.meta.env.VITE_SOCKET_URL, {

auth: { token },

transports: ['websocket']

});


socket.on('connect', () => {

console.log('Socket connected');

set({ isConnected: true });

});

socket.on('disconnect', () => {

set({ isConnected: false });

});

socket.on('state:init', (data: ServerEvents.StateInit) => {

set({ gameState: data.state, playerId: data.your_player_id });

});

socket.on('state:update', (data: ServerEvents.StateUpdate) => {

get().updateState(data.diff);

});

set({ socket });

},

disconnect: () => {

get().socket?.disconnect();

set({ socket: null, gameState: null, playerId: null, isConnected: false });


## },

send: (event, data) => {

get().socket?.emit(event, data);

},

setGameState: (state) => set({ gameState: state }),

updateState: (diff) => set((state) => ({

gameState: state.gameState? { ...state.gameState, ...diff } : null

}))

}), { name: 'konker-game-store' })

);
