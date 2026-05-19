import { useState } from 'react';

import { Button } from '@/components/ui/button';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import { ScrollArea } from '@/components/ui/scroll-area';

import { Smile } from 'lucide-react';

const EMOJIS = ['grinning', 'smile', 'laughing', 'heart_eyes', 'thumbsup', 'clap', 'fire', 'ethiopia',
'coffee'];

export default function EmojiPicker({ onSelect }: { onSelect: (emoji: string) => void }) {

const [search, setSearch] = useState('');

const filtered = EMOJIS.filter(e => e.includes(search));


return (

<Popover>

<PopoverTrigger asChild>

<Button variant="ghost" size="icon" aria-label="Pick an emoji" title="Pick an emoji"><Smile /></Button>

</PopoverTrigger>

<PopoverContent className="w-64">

<input placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)}
className="w-full p-2 mb-2" />

<ScrollArea className="h-48">

<div className="grid grid-cols-6 gap-1">

{filtered.map(e => (

<button key={e} onClick={() => onSelect(e)} className="text-2xl hover:bg-gray-100
p-1 rounded">

{e}

</button>

))}

</div>

</ScrollArea>

</PopoverContent>

</Popover>

);

}
