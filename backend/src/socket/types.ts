export interface ClientEvents {

create_room: { nickname: string };

join_room: { room_code: string; nickname: string };

send_chat: { message: string };

'voice:offer': { to: string; offer: RTCSessionDescriptionInit };

'voice:answer': { to: string; answer: RTCSessionDescriptionInit };

'voice:ice': { to: string; candidate: RTCIceCandidate };

}

export interface ServerEvents {

room_created: { room_code: string };

player_joined: { player_id: string; nickname: string };


chat_message: { player_id: string; nickname: string; message: string; timestamp: string };

'voice:offer': { from: string; offer: RTCSessionDescriptionInit };

'voice:answer': { from: string; answer: RTCSessionDescriptionInit };

'voice:ice': { from: string; candidate: RTCIceCandidate };

}
