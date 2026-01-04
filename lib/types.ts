export interface Puzzle {
  id: string;
  title: string;
  author: string;
  sudokupadUrl: string;
  difficulty?: "easy" | "medium" | "hard" | "expert";
  notes?: string[];
  dateAdded?: string;
}

export interface PuzzlesData {
  puzzleOfTheDayId: string;
  puzzles: Puzzle[];
}
