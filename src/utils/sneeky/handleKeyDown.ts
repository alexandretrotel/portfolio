import { DirectionKey } from "@/types/games/sneeky";

export const handleKeyDown = (
  e: KeyboardEvent,
  currentDirection: DirectionKey,
  setDirection: React.Dispatch<React.SetStateAction<DirectionKey>>,
  snakeLength: number,
) => {
  const key = e.key as DirectionKey;

  const oppositeDirection = {
    ArrowUp: "ArrowDown",
    ArrowDown: "ArrowUp",
    ArrowLeft: "ArrowRight",
    ArrowRight: "ArrowLeft",
  };

  if (oppositeDirection[key] === currentDirection && snakeLength > 1) return;

  setDirection(key as DirectionKey);
};
