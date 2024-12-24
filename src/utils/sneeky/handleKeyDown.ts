import { directionMap, DirectionKey } from "@/types/sneeky";

export const handleKeyDown = (
  e: KeyboardEvent,
  direction: number[],
  setDirection: React.Dispatch<React.SetStateAction<number[]>>
) => {
  const newDirection = directionMap[e.key as DirectionKey];

  if (newDirection) {
    const oppositeDirection = direction.map((d) => -d);

    if (
      newDirection[0] !== oppositeDirection[0] ||
      newDirection[1] !== oppositeDirection[1]
    ) {
      setDirection(newDirection);
    }
  }
};
