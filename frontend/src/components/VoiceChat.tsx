import { useEffect, useRef, useState } from 'react';

import { Button } from '@/components/ui/button';

import { Mic, MicOff, Volume2 } from 'lucide-react';

import { useGameStore } from '@/store/gameStore';

export default function VoiceChat() {

const { socket, gameState } = useGameStore();

const [muted, setMuted] = useState(true);

const [peers, setPeers] = useState<Map<string, RTCPeerConnection>>(new Map());

const localStream = useRef<MediaStream | null>(null);

useEffect(() => {

if (!socket || !gameState) return;

navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {

localStream.current = stream;

setMuted(false);

});

const handleOffer = async ({ from, offer }: any) => {


const pc = new RTCPeerConnection();

pc.ontrack = e => {

const audio = new Audio();

audio.srcObject = e.streams[0];

audio.play();

};

await pc.setRemoteDescription(offer);

const answer = await pc.createAnswer();

await pc.setLocalDescription(answer);

socket.emit('voice:answer', { to: from, answer });

setPeers(p => new Map(p).set(from, pc));

};

socket.on('voice:offer', handleOffer);

return () => socket.off('voice:offer', handleOffer);

}, [socket, gameState]);

const toggleMute = () => {

localStream.current?.getAudioTracks().forEach(t => t.enabled = muted);

setMuted(!muted);

};

return (

<div className="flex items-center gap-2">


<Button
  size="sm"
  variant={muted ? "destructive" : "default"}
  onClick={toggleMute}
  aria-label={muted ? "Unmute microphone" : "Mute microphone"}
  title={muted ? "Unmute microphone" : "Mute microphone"}
>

{muted? <MicOff /> : <Mic />}

</Button>

{Array.from(peers.keys()).map(id => (

<div key={id} className="w-6 h-6 bg-green-500 rounded-full flex items-center
justify-center">

<Volume2 className="w-4 h-4 text-white" />

</div>

))}

</div>

);

}
