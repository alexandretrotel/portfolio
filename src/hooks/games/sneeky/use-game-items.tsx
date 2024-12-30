import {
  APPLE_SCORE,
  APPLE_SEGMENT,
  GOLD_APPLE_PROBABILITY,
  GOLD_APPLE_SCORE,
  GOLD_APPLE_SEGMENT,
} from "@/data/games/sneeky/parameters";
import { Item } from "@/types/games/sneeky";
import { checkCollision } from "@/utils/sneeky/checkCollision";
import { spawnItem } from "@/utils/sneeky/spawnItem";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

interface GameItemsProps {
  snake: number[][];
  setSnake: React.Dispatch<React.SetStateAction<number[][]>>;
  speed: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
}

export const useGameItems = ({
  snake,
  setSnake,
  speed,
  setScore,
}: GameItemsProps) => {
  const [activeItems, setActiveItems] = useState<
    { type: Item; position: number[]; expiration: number }[]
  >([]);
  const recentCollisions = useRef<Set<string>>(new Set());

  const activeItemPositions = useMemo(
    () => activeItems.map((item) => item.position),
    [activeItems]
  );

  const handleSpawnItems = useCallback(() => {
    const now = Date.now();

    setActiveItems((prev) => {
      const newItems = prev.filter((item) => item.expiration > now);

      if (!newItems.some((item) => item.type === "apple")) {
        newItems.push({
          type: "apple",
          position: spawnItem(
            snake,
            newItems.map((item) => item.position)
          ),
          expiration: Infinity,
        });
      }

      if (
        Math.random() < GOLD_APPLE_PROBABILITY &&
        !newItems.some((item) => item.type === "goldApple")
      ) {
        newItems.push({
          type: "goldApple",
          position: spawnItem(
            snake,
            newItems.map((item) => item.position)
          ),
          expiration: Infinity,
        });
      }

      return newItems;
    });
  }, [snake]);

  useEffect(() => {
    handleSpawnItems();
  }, [handleSpawnItems]);

  const resetItems = useCallback(() => {
    setActiveItems([]);
  }, []);

  const handleItemEffect = useCallback(
    (item: { type: Item; position: number[] }) => {
      switch (item.type) {
        case "apple":
          setScore((s: number) => s + APPLE_SCORE);
          setSnake((prev) => [
            ...prev,
            ...Array(APPLE_SEGMENT).fill(prev[prev.length - 1]),
          ]);
          break;
        case "goldApple":
          setScore((s: number) => s + GOLD_APPLE_SCORE);
          setSnake((prev) => [
            ...prev,
            ...Array(GOLD_APPLE_SEGMENT).fill(prev[prev.length - 1]),
          ]);
          break;
      }

      setActiveItems((prev) => prev.filter((i) => i !== item));
    },
    [setScore, setSnake]
  );

  const handleItemCollisions = useCallback(
    (newHead: number[]) => {
      activeItems.forEach((item) => {
        const itemKey = `${item.position[0]}-${item.position[1]}`;
        if (
          checkCollision(newHead, item.position) &&
          !recentCollisions.current.has(itemKey)
        ) {
          handleItemEffect(item);
          recentCollisions.current.add(itemKey);

          setTimeout(() => {
            recentCollisions.current.delete(itemKey);
          }, speed);
        }
      });
    },
    [activeItems, handleItemEffect, speed]
  );

  return {
    activeItems,
    setActiveItems,
    activeItemPositions,
    resetItems,
    handleItemEffect,
    handleItemCollisions,
  };
};
