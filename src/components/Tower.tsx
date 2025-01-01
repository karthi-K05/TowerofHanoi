import React from 'react';
import { cn } from '../utils/cn';

interface TowerProps {
  disks: number[];
  towerIndex: number;
  onDiskClick: (towerIndex: number) => void;
  onDiskDrop: (e: React.DragEvent<HTMLDivElement>, towerIndex: number) => void; 
  onDragStart: (e: React.DragEvent<HTMLDivElement>, size: number, sourceIndex: number) => void; 
  isSelected: boolean;
}

export function Tower({ disks, towerIndex, onDiskClick, onDiskDrop, onDragStart, isSelected }: TowerProps) {
  return (
    <div 
      className={cn(
        "flex flex-col justify-end items-center w-[200px] h-[300px] relative",
        "transition-all duration-300 ease-in-out",
        "hover:bg-blue-50/50 cursor-pointer rounded-lg",
        isSelected && "bg-blue-100/70"
      )}
      onClick={() => onDiskClick(towerIndex)}
      onDrop={(e) => onDiskDrop(e, towerIndex)} 
      onDragOver={(e) => e.preventDefault()}
    >
      {/* Tower pole */}
      <div className="absolute w-3 h-[280px] bg-indigo-900/80 rounded-full" />
      
      {/* Base */}
      <div className="w-[220px] h-4 bg-gradient-to-r from-indigo-900 to-indigo-700 rounded-xl z-10" style={{ marginBottom: '-20px' }}/>
      
      {/* Disks */}
      <div className="relative flex flex-col items-center gap-4 mb-4">
        {disks.map((size, index) => (
          <div
            key={size}
            className={cn(
              "absolute shadow-lg transition-all duration-300",
              "rounded-full border border-white/20"
            )}
            style={{
              width: `${size * 32}px`,
              height: '24px',
              background: `linear-gradient(to right, 
                hsl(${size * 25}, 95%, 65%), 
                hsl(${size * 25}, 95%, 75%))`,
              bottom: `${index * 28}px`,
              // left: `${(200 - size * 32) / 2}px`,
            }}
            draggable 
            onDragStart={(e) => onDragStart(e, size, towerIndex)}
          />
        ))}
      </div>
    </div>
  );
}
