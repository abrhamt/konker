// =============================================

// KONKER – Ethiopian Rummy 41

// Game Replay Viewer

// Generated: November 12, 2025 12:20 AM EAT


## // =============================================

import { useParams } from 'react-router-dom';

import { useEffect, useState } from 'react';

import { Card } from '@/components/ui/card';

export default function ReplayViewer() {

const { gameId } = useParams();

const [events, setEvents] = useState<any[]>([]);

const [currentTurn, setCurrentTurn] = useState(0);

// Load replay from DB or logs

useEffect(() => {

// TODO: Fetch from /api/replay/:gameId

}, [gameId]);

return (

<div className="min-h-screen bg-gray-900 text-white p-8">

<Card className="max-w-4xl mx-auto p-6">

<h1 className="text-2xl font-bold mb-4">Replay: Game {gameId}</h1>

<div className="bg-black/50 rounded-lg p-4 h-96 overflow-y-auto">

{/* Render turn-by-turn events */}

<p className="text-gray-400">Replay not implemented yet.</p>

</div>


</Card>

</div>

);

}
