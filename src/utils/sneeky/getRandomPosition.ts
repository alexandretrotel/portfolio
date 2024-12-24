import { BOARD_SIZE } from "@/data/games/sneeky/parameters";

export const getRandomPosition = () => [
  Math.floor(Math.random() * BOARD_SIZE),
  Math.floor(Math.random() * BOARD_SIZE),
];
