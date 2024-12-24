import { DirectionKey } from "@/types/sneeky";

export const handleKeyDown = (
  e: KeyboardEvent,
  currentDirection: DirectionKey,
  setDirection: React.Dispatch<React.SetStateAction<DirectionKey>>
) => {
  const key = e.key as DirectionKey;

  const oppositeDirection = {
    ArrowUp: "ArrowDown",
    ArrowDown: "ArrowUp",
    ArrowLeft: "ArrowRight",
    ArrowRight: "ArrowLeft",
  };

  if (oppositeDirection[key] === currentDirection) return;

  setDirection(key as DirectionKey);
};
