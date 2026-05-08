// =============================================

// KONKER – Ethiopian Rummy 41

// Prometheus Metrics Exporter

// Generated: November 12, 2025 12:20 AM EAT

// Target: Node.js + Prometheus Client

// =============================================

import { Registry, Counter, Gauge, Histogram, collectDefaultMetrics } from 'prom-client';

## // =============================================

## // 1. REGISTRY

## // =============================================

const register = new Registry();

collectDefaultMetrics({ register });

## // =============================================

## // 2. CUSTOM METRICS

## // =============================================


// Active game rooms

export const activeRooms = new Gauge({

name: 'konker_active_rooms_total',

help: 'Number of active game rooms',

labelNames: ['status'],

registers: [register]

});

// Connected players

export const connectedPlayers = new Gauge({

name: 'konker_connected_players_total',

help: 'Number of currently connected players',

registers: [register]

});

// Socket events

export const socketEvents = new Counter({

name: 'konker_socket_events_total',

help: 'Total socket.io events processed',

labelNames: ['event', 'status'],

registers: [register]

});

// Turn actions


export const turnActions = new Counter({

name: 'konker_turn_actions_total',

help: 'Total player actions per turn',

labelNames: ['action', 'source'],

registers: [register]

});

// Request latency

export const httpRequestDuration = new Histogram({

name: 'konker_http_request_duration_seconds',

help: 'Duration of HTTP requests in seconds',

labelNames: ['method', 'route', 'code'],

buckets: [0.1, 0.3, 0.5, 1, 2, 5],

registers: [register]

});

// Game lifecycle

export const gamesStarted = new Counter({

name: 'konker_games_started_total',

help: 'Total games started',

registers: [register]

});

export const gamesCompleted = new Counter({


name: 'konker_games_completed_total',

help: 'Total games completed',

labelNames: ['win_type'],

registers: [register]

});

// Errors

export const errorsTotal = new Counter({

name: 'konker_errors_total',

help: 'Total application errors',

labelNames: ['type', 'context'],

registers: [register]

});

## // =============================================

## // 3. EXPORT REGISTRY

## // =============================================

export { register };
