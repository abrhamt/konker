// =============================================

// KONKER – Admin: Game Monitoring

// Generated: November 12, 2025 12:30 AM EAT

// =============================================

import { useEffect, useState } from 'react';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from
'@/components/ui/table';

import { Button } from '@/components/ui/button';

import { api } from '@/lib/api';

interface ActiveRoom {


room_code: string;

player_count: number;

status: string;

started_at: string;

}

export default function GameMonitoring() {

const [activeRooms, setActiveRooms] = useState<ActiveRoom[]>([]);

const [replays, setReplays] = useState<any[]>([]);

useEffect(() => {

api.get('/admin/rooms/active').then(res => setActiveRooms(res.data));

api.get('/admin/games/completed').then(res => setReplays(res.data));

}, []);

const endRoom = (code: string) => {

api.post('/admin/rooms/end', { room_code: code }).then(() => {

setActiveRooms(prev => prev.filter(r => r.room_code !== code));

});

};

return (

<div className="space-y-6">

<h3 className="text-xl font-semibold">Active Rooms ({activeRooms.length})</h3>


<Table>

<TableHeader>

<TableRow>

<TableHead>Room Code</TableHead>

<TableHead>Players</TableHead>

<TableHead>Status</TableHead>

<TableHead>Started</TableHead>

<TableHead>Actions</TableHead>

</TableRow>

</TableHeader>

<TableBody>

{activeRooms.map(room => (

<TableRow key={room.room_code}>

<TableCell>{room.room_code}</TableCell>

<TableCell>{room.player_count}</TableCell>

<TableCell>{room.status}</TableCell>

<TableCell>{new Date(room.started_at).toLocaleString()}</TableCell>

<TableCell>

<Button size="sm" onClick={() => endRoom(room.room_code)}>

End Room

</Button>

</TableCell>

</TableRow>

))}


</TableBody>

</Table>

<h3 className="text-xl font-semibold">Recent Replays ({replays.length})</h3>

<Table>

<TableHeader>

<TableRow>

<TableHead>Game ID</TableHead>

<TableHead>Winner</TableHead>

<TableHead>Ended</TableHead>

<TableHead>Actions</TableHead>

</TableRow>

</TableHeader>

<TableBody>

{replays.slice(0, 10).map(game => (

<TableRow key={game.game_id}>

<TableCell>{game.game_id}</TableCell>

<TableCell>{game.winner_nickname}</TableCell>

<TableCell>{new Date(game.ended_at).toLocaleString()}</TableCell>

<TableCell>

<Button size="sm" variant="outline">View Replay</Button>

</TableCell>

</TableRow>

))}


</TableBody>

</Table>

</div>

);

}
