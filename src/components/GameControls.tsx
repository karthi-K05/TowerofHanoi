import React from 'react';
import { RotateCcw, Play, Pause, Trophy } from 'lucide-react';
import { cn } from '../utils/cn';

interface GameControlsProps {
  moves: number;
  minMoves: number;
  onReset: () => void;
  autoPlay: boolean;
  onAutoPlayToggle: () => void;
}

export function GameControls({ moves, minMoves, onReset, autoPlay, onAutoPlayToggle }: GameControlsProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-6">
        <button
          onClick={onReset}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-full",
            "bg-rose-500 text-white shadow-lg",
            "hover:bg-rose-600 transition-all",
            "active:scale-95"
          )}
        >
          <RotateCcw size={18} />
          Reset
        </button>
        <button
          onClick={onAutoPlayToggle}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-full",
            "bg-indigo-500 text-white shadow-lg",
            "hover:bg-indigo-600 transition-all",
            "active:scale-95"
          )}
        >
          {autoPlay ? <Pause size={18} /> : <Play size={18} />}
          {autoPlay ? 'Stop' : 'Auto Solve'}
        </button>
      </div>
      
      <div className="flex items-center gap-4 text-gray-600">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Moves:</span>
          <span className="text-2xl font-bold text-indigo-600">{moves}</span>
        </div>
        <div className="w-px h-6 bg-gray-300" />
        <div className="flex items-center gap-2">
          <Trophy size={16} className="text-amber-500" />
          <span className="text-sm font-medium">Target: {minMoves}</span>
        </div>
      </div>
    </div>
  );
}