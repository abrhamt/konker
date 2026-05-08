// =============================================

// KONKER – Admin: Metrics Dashboard

// Generated: November 12, 2025 12:30 AM EAT

// =============================================

import { useEffect, useState } from 'react';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer }
from 'recharts';

import { Card, CardContent } from '@/components/ui/card';

import { api } from '@/lib/api';

interface MetricData {

timestamp: string;

value: number;


## }

export default function MetricsDashboard() {

const [metrics, setMetrics] = useState<{ active_rooms: MetricData[]; connections: MetricData[]
}>({

active_rooms: [],

connections: [],

});

useEffect(() => {

api.get('/admin/metrics').then(res => setMetrics(res.data));

}, []);

return (

<div className="space-y-6">

<Card>

<CardContent className="p-6">

<h3 className="text-xl font-semibold mb-4">Active Rooms Over Time</h3>

<ResponsiveContainer width="100%" height={300}>

<LineChart data={metrics.active_rooms}>

<CartesianGrid strokeDasharray="3 3" />

<XAxis dataKey="timestamp" />

<YAxis />

<Tooltip />

<Legend />


<Line type="monotone" dataKey="value" stroke="#10b981" />

</LineChart>

</ResponsiveContainer>

</CardContent>

</Card>

<Card>

<CardContent className="p-6">

<h3 className="text-xl font-semibold mb-4">Connections</h3>

<ResponsiveContainer width="100%" height={300}>

<LineChart data={metrics.connections}>

<CartesianGrid strokeDasharray="3 3" />

<XAxis dataKey="timestamp" />

<YAxis />

<Tooltip />

<Legend />

<Line type="monotone" dataKey="value" stroke="#3b82f6" />

</LineChart>

</ResponsiveContainer>

</CardContent>

</Card>

</div>

);

}
