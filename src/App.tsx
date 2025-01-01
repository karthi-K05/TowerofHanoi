import React, { useState, useEffect, useCallback } from 'react';
import { GameBoard } from './components/GameBoard';
import { GameControls } from './components/GameControls';
import { GameRules } from './components/GameRules';
import { useHanoiSolver } from './hooks/useHanoiSolver';

const NUM_DISKS = 3;
const MIN_MOVES = Math.pow(2, NUM_DISKS) - 1;

export default function App() {
  const [towers, setTowers] = useState<number[][]>([
    Array.from({ length: NUM_DISKS }, (_, i) => NUM_DISKS - i),
    [],
    [],
  ]);
  const [selectedTower, setSelectedTower] = useState<number | null>(null);
  const [moves, setMoves] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);
  const [autoPlayIndex, setAutoPlayIndex] = useState(0);
  
  const solution = useHanoiSolver(NUM_DISKS);

  const isValidMove = (fromTower: number, toTower: number) => {
    if (towers[fromTower].length === 0) return false;
    if (towers[toTower].length === 0) return true;
    return towers[fromTower][towers[fromTower].length - 1] < towers[toTower][towers[toTower].length - 1];
  };

  const moveDisk = useCallback((fromTower: number, toTower: number) => {
    if (!isValidMove(fromTower, toTower)) return false;
    
    setTowers(prev => {
      const newTowers = prev.map(tower => [...tower]);
      const disk = newTowers[fromTower].pop()!;
      newTowers[toTower].push(disk);
      return newTowers;
    });
    setMoves(prev => prev + 1);
    return true;
  }, [towers]);

  const handleTowerClick = (towerIndex: number) => {
    if (autoPlay) return;
    
    if (selectedTower === null) {
      if (towers[towerIndex].length > 0) {
        setSelectedTower(towerIndex);
      }
    } else {
      if (towerIndex !== selectedTower) {
        moveDisk(selectedTower, towerIndex);
      }
      setSelectedTower(null);
    }
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, diskSize: number, sourceTowerIndex: number) => {
    e.dataTransfer.setData('diskSize', diskSize.toString());
    e.dataTransfer.setData('sourceTowerIndex', sourceTowerIndex.toString());
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetTowerIndex: number) => {
    const diskSize = parseInt(e.dataTransfer.getData('diskSize'), 10);
    const sourceTowerIndex = parseInt(e.dataTransfer.getData('sourceTowerIndex'), 10);

    if (sourceTowerIndex !== targetTowerIndex) {
      moveDisk(sourceTowerIndex, targetTowerIndex);
    }
  };

  const resetGame = () => {
    setTowers([
      Array.from({ length: NUM_DISKS }, (_, i) => NUM_DISKS - i),
      [],
      [],
    ]);
    setMoves(0);
    setSelectedTower(null);
    setAutoPlay(false);
    setAutoPlayIndex(0);
  };

  useEffect(() => {
    if (!autoPlay) return;
    
    const timer = setInterval(() => {
      if (autoPlayIndex >= solution.length) {
        setAutoPlay(false);
        return;
      }
      
      const [from, to] = solution[autoPlayIndex];
      moveDisk(from, to);
      setAutoPlayIndex(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [autoPlay, autoPlayIndex, moveDisk, solution]);

  const checkWin = useCallback(() => {
    return towers[2].length === NUM_DISKS && 
           towers[2].every((disk, index) => disk === NUM_DISKS - index);
  }, [towers]);

  useEffect(() => {
    if (checkWin()) {
      const message = moves === MIN_MOVES 
        ? `Perfect! You solved it in the minimum ${moves} moves!` 
        : `Congratulations! You solved the puzzle in ${moves} moves!`;
      setTimeout(() => alert(message), 500);
    }
  }, [towers, moves, checkWin]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-12">
          Tower of Hanoi
        </h1>
        
        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl">
          <GameBoard
            towers={towers}
            selectedTower={selectedTower}
            onTowerClick={handleTowerClick}
            onDragStart={handleDragStart}
            onDrop={handleDrop}
          />
          
          <GameControls
            moves={moves}
            minMoves={MIN_MOVES}
            onReset={resetGame}
            autoPlay={autoPlay}
            onAutoPlayToggle={() => setAutoPlay(!autoPlay)}
          />
        </div>
        
        <GameRules />
      </div>
    </div>
  );
}
