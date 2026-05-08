// =============================================

// KONKER – Admin: Backup Controls

// Generated: November 12, 2025 12:30 AM EAT

// =============================================

import { useEffect, useState } from 'react';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from
'@/components/ui/table';

import { Button } from '@/components/ui/button';

import { api } from '@/lib/api';

interface Backup {

file: string;

size: string;

date: string;

}


export default function BackupControls() {

const [backups, setBackups] = useState<Backup[]>([]);

useEffect(() => {

api.get('/admin/backups').then(res => setBackups(res.data));

}, []);

const triggerBackup = () => {

api.post('/admin/backup').then(() => {

// Refresh list

});

};

const restore = (file: string) => {

if (confirm(`Restore from ${file}?`)) {

api.post('/admin/restore', { file }).then(() => alert('Restore initiated'));

}

};

return (

<div className="space-y-6">

<Button onClick={triggerBackup}>Create Backup</Button>


<Table>

<TableHeader>

<TableRow>

<TableHead>File</TableHead>

<TableHead>Size</TableHead>

<TableHead>Date</TableHead>

<TableHead>Actions</TableHead>

</TableRow>

</TableHeader>

<TableBody>

{backups.map(backup => (

<TableRow key={backup.file}>

<TableCell>{backup.file}</TableCell>

<TableCell>{backup.size}</TableCell>

<TableCell>{backup.date}</TableCell>

<TableCell>

<Button size="sm" variant="destructive" onClick={() => restore(backup.file)}>

Restore

</Button>

</TableCell>

</TableRow>

))}

</TableBody>

</Table>


</div>

);

}
