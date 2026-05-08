// =============================================

// KONKER – Admin Panel Dashboard

// Generated: November 12, 2025 12:30 AM EAT

// =============================================

import { useState } from 'react';

import { api } from '@/lib/api';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { Button } from '@/components/ui/button';

import UserManagement from './Admin/UserManagement';

import GameMonitoring from './Admin/GameMonitoring';

import MetricsDashboard from './Admin/MetricsDashboard';

import LogsViewer from './Admin/LogsViewer';


import BackupControls from './Admin/BackupControls';

import Configuration from './Admin/Configuration';

export default function AdminPanel() {

const [activeTab, setActiveTab] = useState('users');

return (

<div className="min-h-screen bg-gray-900 text-white p-8">

<div className="max-w-7xl mx-auto">

<Card className="mb-8">

<CardHeader>

<CardTitle className="text-3xl flex justify-between items-center">

Konker Admin Panel

<Button variant="outline">Logout</Button>

</CardTitle>

</CardHeader>

</Card>

<Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">

<TabsList className="grid w-full grid-cols-5 mb-6">

<TabsTrigger value="users">Users</TabsTrigger>

<TabsTrigger value="games">Games</TabsTrigger>

<TabsTrigger value="metrics">Metrics</TabsTrigger>

<TabsTrigger value="logs">Logs</TabsTrigger>


<TabsTrigger value="config">Config</TabsTrigger>

</TabsList>

<TabsContent value="users">

<UserManagement />

</TabsContent>

<TabsContent value="games">

<GameMonitoring />

</TabsContent>

<TabsContent value="metrics">

<MetricsDashboard />

</TabsContent>

<TabsContent value="logs">

<LogsViewer />

</TabsContent>

<TabsContent value="config">

<Configuration />

</TabsContent>

</Tabs>

</div>


</div>

);

}
