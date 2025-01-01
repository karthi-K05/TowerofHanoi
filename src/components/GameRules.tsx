import React from 'react';
import { Info } from 'lucide-react';

export function GameRules() {
  return (
    <div className="mt-8 text-gray-600 max-w-md text-center px-4">
      <div className="flex items-center justify-center gap-2 mb-3">
        <Info size={18} className="text-indigo-500" />
        <h2 className="font-semibold">How to Play</h2>
      </div>
      <ul className="text-sm space-y-1">
        <li>Move all disks to the rightmost tower</li>
        <li>Move only one disk at a time</li>
        <li>A larger disk cannot be placed on top of a smaller disk</li>
      </ul>
    </div>
  );
}