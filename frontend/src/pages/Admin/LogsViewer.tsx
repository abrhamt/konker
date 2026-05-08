// =============================================

// KONKER – Admin: Logs Viewer

// Generated: November 12, 2025 12:30 AM EAT

// =============================================

import { useEffect, useState } from 'react';

import { ScrollArea } from '@/components/ui/scroll-area';

import { Button } from '@/components/ui/button';

import { api } from '@/lib/api';

export default function LogsViewer() {

const [logs, setLogs] = useState<string[]>([]);

const [filter, setFilter] = useState('all');

useEffect(() => {

const ws = new WebSocket(`${import.meta.env.VITE_API_URL}/admin/logs?filter=${filter}`);

ws.onmessage = (event) => {

setLogs(prev => [...prev, event.data].slice(-100));


## };

return () => ws.close();

}, [filter]);

return (

<div className="space-y-4">

<div className="flex gap-2">

<Button variant={filter === 'all'? 'default' : 'outline'} onClick={() => setFilter('all')}>

All

</Button>

<Button variant={filter === 'error'? 'default' : 'outline'} onClick={() => setFilter('error')}>

Errors

</Button>

<Button variant={filter === 'warn'? 'default' : 'outline'} onClick={() => setFilter('warn')}>

Warnings

</Button>

</div>

<ScrollArea className="h-96 bg-black/50 rounded-lg p-4">

{logs.map((log, i) => (

<div key={i} className="text-sm mb-1">

{log}

</div>

))}

</ScrollArea>


</div>

);

}
