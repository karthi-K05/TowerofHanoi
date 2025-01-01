export function useHanoiSolver(numDisks: number) {
  const moves: [number, number][] = [];
  const stack: [number, number, number, number][] = [];

  stack.push([numDisks, 0, 1, 2]);

  while (stack.length > 0) {
    const [n, source, auxiliary, target] = stack.pop()!;

    if (n === 1) {
      moves.push([source, target]);
    } else {
      // Step 3
      stack.push([n - 1, auxiliary, source, target]);
      // Step 2
      stack.push([1, source, auxiliary, target]);
      // Step 1
      stack.push([n - 1, source, target, auxiliary]);
    }
  }

  return moves;
}
