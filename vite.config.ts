// =============================================

// KONKER – Vite Config (React + TypeScript)

// Generated: November 12, 2025 12:27 AM EAT

// =============================================


import { defineConfig } from 'vite';

import react from '@vitejs/plugin-react';

import path from 'path';

export default defineConfig({

plugins: [react()],

resolve: {

alias: {

'@': path.resolve(__dirname, './src'),

},

},

server: {

port: 5173,

host: true,

proxy: {

'/api': {

target: 'http://localhost:3001',

changeOrigin: true,

},

'/socket.io': {

target: 'http://localhost:3001',

ws: true,

},

},


## },

build: {

outDir: 'dist',

sourcemap: true,

rollupOptions: {

output: {

manualChunks: {

vendor: ['react', 'react-dom', 'zustand'],

ui: ['@radix-ui/react-icons', 'lucide-react'],

},

},

},

},

define: {

'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),

},

});
