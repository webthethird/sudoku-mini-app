import puzzlesData from "@/data/puzzles.json";
import { Puzzle, PuzzlesData } from "./types";

const data = puzzlesData as PuzzlesData;

export function getPuzzleOfTheDay(): Puzzle {
  return (
    data.puzzles.find((p) => p.id === data.puzzleOfTheDayId) || data.puzzles[0]
  );
}

export function getPuzzleById(id: string): Puzzle | undefined {
  return data.puzzles.find((p) => p.id === id);
}

export function getAllPuzzles(): Puzzle[] {
  return data.puzzles;
}

export function getArchivePuzzles(): Puzzle[] {
  return data.puzzles.filter((p) => p.id !== data.puzzleOfTheDayId);
}

export function getPuzzleOfTheDayId(): string {
  return data.puzzleOfTheDayId;
}
