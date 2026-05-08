// =============================================

// KONKER – Admin: User Management

// Generated: November 12, 2025 12:30 AM EAT

// =============================================

import { useEffect, useState } from 'react';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from
'@/components/ui/table';

import { Button } from '@/components/ui/button';

import { Input } from '@/components/ui/input';

import { Badge } from '@/components/ui/badge';

import { api } from '@/lib/api';

interface User {

id: number;

nickname: string;


games_played: number;

wins: number;

avg_score: number;

is_admin: boolean;

}

export default function UserManagement() {

const [users, setUsers] = useState<User[]>([]);

const [search, setSearch] = useState('');

const [loading, setLoading] = useState(true);

useEffect(() => {

api.get('/admin/users').then(res => {

setUsers(res.data);

setLoading(false);

});

}, []);

const filteredUsers = users.filter(u =>
u.nickname.toLowerCase().includes(search.toLowerCase()));

const toggleAdmin = (id: number) => {

api.put(`/admin/users/${id}/admin`, { is_admin: true }).then(() => {

setUsers(users.map(u => u.id === id? { ...u, is_admin: true } : u));

});


## };

return (

<div className="space-y-6">

<div className="flex justify-between">

<Input

placeholder="Search users..."

value={search}

onChange={e => setSearch(e.target.value)}

className="max-w-md"

/>

<Button onClick={() => {/* Reload */}}>Refresh</Button>

</div>

{loading? (

<p>Loading users...</p>

) : (

<Table>

<TableHeader>

<TableRow>

<TableHead>ID</TableHead>

<TableHead>Nickname</TableHead>

<TableHead>Games</TableHead>

<TableHead>Wins</TableHead>


<TableHead>Avg Score</TableHead>

<TableHead>Admin</TableHead>

<TableHead>Actions</TableHead>

</TableRow>

</TableHeader>

<TableBody>

{filteredUsers.map(user => (

<TableRow key={user.id}>

<TableCell>{user.id}</TableCell>

<TableCell>{user.nickname}</TableCell>

<TableCell>{user.games_played}</TableCell>

<TableCell>{user.wins}</TableCell>

<TableCell>{user.avg_score.toFixed(1)}</TableCell>

<TableCell>

<Badge variant={user.is_admin? 'default' : 'secondary'}>

{user.is_admin? 'Yes' : 'No'}

</Badge>

</TableCell>

<TableCell>

<Button size="sm" onClick={() => toggleAdmin(user.id)}>

{user.is_admin? 'Demote' : 'Promote'}

</Button>

</TableCell>

</TableRow>


## ))}

</TableBody>

</Table>

)}

</div>

);

}
