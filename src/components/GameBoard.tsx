// import React from 'react';
// import { Tower } from './Tower';

// interface GameBoardProps {
//   towers: number[][];
//   selectedTower: number | null;
//   onTowerClick: (index: number) => void;
// }

// export function GameBoard({ towers, selectedTower, onTowerClick }: GameBoardProps) {
//   return (
//     <div className="flex gap-8 mb-8">
//       {towers.map((disks, index) => (
//         <Tower
//           key={index}
//           disks={disks}
//           towerIndex={index}
//           onDiskClick={onTowerClick}
//           isSelected={selectedTower === index}
//         />
//       ))}
//     </div>
//   );
// }
import React from 'react';
import { Tower } from './Tower';

interface GameBoardProps {
  towers: number[][];
  selectedTower: number | null;
  onTowerClick: (towerIndex: number) => void;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, diskSize: number, sourceTowerIndex: number) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>, targetTowerIndex: number) => void;
}

export function GameBoard({ towers, selectedTower, onTowerClick, onDragStart, onDrop }: GameBoardProps) {
  return (
    <div className="flex gap-8 mb-8">
      {towers.map((disks, index) => (
        <Tower
          key={index}
          disks={disks}
          towerIndex={index}
          onDiskClick={onTowerClick}
          onDiskDrop={onDrop}
          onDragStart={onDragStart}
          isSelected={selectedTower === index}
        />
      ))}
    </div>
  );
}

