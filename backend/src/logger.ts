// =============================================


// KONKER – Ethiopian Rummy 41

// Structured Logger (Winston + Loki)

// Generated: November 12, 2025 12:20 AM EAT

// =============================================

import winston from 'winston';

import LokiTransport from 'winston-loki';

## // =============================================

## // 1. FORMAT

## // =============================================

const { combine, timestamp, json, errors, printf } = winston.format;

const logFormat = printf(({ level, message, timestamp, ...meta }) => {

return JSON.stringify({

level,

timestamp,

message,

service: 'konker-backend',

...meta

});

});

## // =============================================


## // 2. TRANSPORTS

## // =============================================

const transports: winston.transport[] = [

new winston.transports.Console({

format: combine(

timestamp(),

errors({ stack: true }),

process.env.NODE_ENV === 'development'? winston.format.colorize() :
winston.format.uncolorize(),

logFormat

)

})

];

// Add Loki in production

if (process.env.NODE_ENV === 'production' && process.env.LOKI_URL) {

transports.push(

new LokiTransport({

host: process.env.LOKI_URL,

labels: { app: 'konker', env: process.env.NODE_ENV },

json: true,

format: winston.format.json(),

replaceTimestamp: true,

onConnectionError: (err) => console.error('Loki connection error:', err)

})


## );

## }

## // =============================================

## // 3. LOGGER INSTANCE

## // =============================================

const logger = winston.createLogger({

level: process.env.LOG_LEVEL || 'info',

format: combine(timestamp(), errors({ stack: true }), json()),

transports,

exceptionHandlers: [new winston.transports.Console()],

rejectionHandlers: [new winston.transports.Console()]

});

## // =============================================

## // 4. EXPORT

## // =============================================

export default logger;
