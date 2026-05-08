// =============================================


// KONKER – Ethiopian Rummy 41

// Zod Validation Schemas

// Generated: November 12, 2025 12:20 AM EAT

// =============================================

import { z } from 'zod';

## // =============================================

## // 1. COMMON

## // =============================================

const PlayerIdSchema = z.string().regex(/^\d+$/).transform(Number);

const CardIdSchema = z.number().int().min(1).max(54);

const SeatSchema = z.number().int().min(0).max(5);

## // =============================================

## // 2. CLIENT → SERVER

## // =============================================

export const CreateRoomSchema = z.object({

nickname: z.string().min(1).max(32)

});

export const JoinRoomSchema = z.object({

room_code: z.string().length(8).regex(/^KNK-[A-Z0-9]{4}$/),

nickname: z.string().min(1).max(32)


## });

export const ReadyToggleSchema = z.object({

is_ready: z.boolean()

});

export const StartGameSchema = z.object({});

export const DrawCardSchema = z.object({

source: z.enum(['DECK', 'DISCARD', 'HALF_COVERED']),

proposed_set: z.array(CardIdSchema).min(3).optional(),

proposed_type: z.enum(['SEQUENCE', 'GROUP', 'THREE_ACES']).optional()

}).refine(

(data) => data.source !== 'DISCARD' || !!data.proposed_set,

{ message: 'proposed_set required for DISCARD' }

);

export const PlaceSetSchema = z.object({

type: z.enum(['SEQUENCE', 'GROUP', 'THREE_ACES']),

cards: z.array(CardIdSchema).min(3)

});

export const ExtendSetSchema = z.object({

set_id: z.string().regex(/^\d+$/).transform(Number),


cards: z.array(CardIdSchema).min(1)

});

export const DiscardCardSchema = z.object({

card_id: CardIdSchema,

is_final_move: z.boolean().optional()

});

export const DeclareWinSchema = z.object({});

export const SendChatSchema = z.object({

message: z.string().min(1).max(280)

});

## // =============================================

## // 3. EXPORT ALL

## // =============================================

export const ClientSchemas = {

create_room: CreateRoomSchema,

join_room: JoinRoomSchema,

ready_toggle: ReadyToggleSchema,

start_game: StartGameSchema,

draw_card: DrawCardSchema,

place_set: PlaceSetSchema,


extend_set: ExtendSetSchema,

discard_card: DiscardCardSchema,

declare_win: DeclareWinSchema,

send_chat: SendChatSchema

};
