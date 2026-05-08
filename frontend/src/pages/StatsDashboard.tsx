// =============================================

// KONKER – Ethiopian Rummy 41

// Player Stats Dashboard

// Generated: November 12, 2025 12:20 AM EAT

// =============================================

import { useEffect, useState } from 'react';

import { api } from '@/lib/api';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from
'@/components/ui/table';

import { Badge } from '@/components/ui/badge';

import { Skeleton } from '@/components/ui/skeleton';

interface LeaderboardEntry {

nickname: string;


wins: number;

avg_score: number;

}

export default function StatsDashboard() {

const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

const [loading, setLoading] = useState(true);

useEffect(() => {

api.getLeaderboard()

.then(res => {

setLeaderboard(res.data);

setLoading(false);

})

.catch(() => setLoading(false));

}, []);

return (

<div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 p-8">

<div className="max-w-6xl mx-auto">

<Card className="mb-8">

<CardHeader>

<CardTitle className="text-3xl">Konker Leaderboard</CardTitle>

</CardHeader>


<CardContent>

{loading? (

<div className="space-y-2">

{[...Array(5)].map((_, i) => (

<Skeleton key={i} className="h-12 w-full" />

))}

</div>

) : (

<Table>

<TableHeader>

<TableRow>

<TableHead>Rank</TableHead>

<TableHead>Player</TableHead>

<TableHead>Wins</TableHead>

<TableHead>Avg Score</TableHead>

</TableRow>

</TableHeader>

<TableBody>

{leaderboard.map((entry, i) => (

<TableRow key={i}>

<TableCell>

<Badge variant={i === 0? 'default' : 'secondary'}>

#{i + 1}

</Badge>


</TableCell>

<TableCell className="font-medium">{entry.nickname}</TableCell>

<TableCell>{entry.wins}</TableCell>

<TableCell>{entry.avg_score.toFixed(1)}</TableCell>

</TableRow>

))}

</TableBody>

</Table>

)}

</CardContent>

</Card>

</div>

</div>

);

}
