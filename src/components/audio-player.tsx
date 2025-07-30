'use client';

import { useState, useEffect, useRef } from 'react';
import * as Tone from 'tone';
import { Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export default function AudioPlayer() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const synthRef = useRef<Tone.PolySynth | null>(null);
  const loopRef = useRef<Tone.Sequence | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && isInitialized) {
      synthRef.current = new Tone.PolySynth(Tone.Synth, {
        oscillator: { type: 'fmsquare' },
        envelope: { attack: 0.01, decay: 0.1, sustain: 0.2, release: 2 },
      }).toDestination();
      synthRef.current.set({ volume: -20 });

      const notes = ['C2', 'E2', 'G2', 'B2', 'C3', 'E3', 'G3', 'B3'];
      loopRef.current = new Tone.Sequence(
        (time, note) => {
          synthRef.current?.triggerAttackRelease(note, '8n', time);
        },
        notes,
        '8n'
      ).start(0);
      Tone.Transport.bpm.value = 90;
    }

    return () => {
      loopRef.current?.dispose();
      synthRef.current?.dispose();
    };
  }, [isInitialized]);

  const toggleAudio = async () => {
    if (!isInitialized) {
      await Tone.start();
      setIsInitialized(true);
    }

    if (Tone.Transport.state !== 'started') {
      Tone.Transport.start();
      setIsPlaying(true);
    } else {
      Tone.Transport.stop();
      setIsPlaying(false);
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleAudio}
            className="fixed bottom-4 right-4 z-50 rounded-full glass-panel hidden md:flex"
          >
            {isPlaying ? <Volume2 /> : <VolumeX />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Toggle background synth</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
