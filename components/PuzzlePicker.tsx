"use client";

import { Puzzle } from "@/lib/types";
import { getPuzzleOfTheDayId } from "@/lib/puzzles";
import styles from "./PuzzlePicker.module.css";

interface PuzzlePickerProps {
  puzzles: Puzzle[];
  currentPuzzleId: string;
  onSelect: (puzzle: Puzzle) => void;
  isCompleted: (puzzleId: string) => boolean;
}

const difficultyColors: Record<string, string> = {
  easy: "#4ade80",
  medium: "#fbbf24",
  hard: "#f97316",
  expert: "#ef4444",
};

export function PuzzlePicker({
  puzzles,
  currentPuzzleId,
  onSelect,
  isCompleted,
}: PuzzlePickerProps) {
  const puzzleOfTheDayId = getPuzzleOfTheDayId();
  const puzzleOfTheDay = puzzles.find((p) => p.id === puzzleOfTheDayId);
  const archivePuzzles = puzzles.filter((p) => p.id !== puzzleOfTheDayId);

  return (
    <div className={styles.container}>
      {puzzleOfTheDay && (
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.star}>*</span>
            <span>Puzzle of the Day</span>
          </div>
          <PuzzleCard
            puzzle={puzzleOfTheDay}
            isActive={currentPuzzleId === puzzleOfTheDay.id}
            isCompleted={isCompleted(puzzleOfTheDay.id)}
            onClick={() => onSelect(puzzleOfTheDay)}
          />
        </div>
      )}

      {archivePuzzles.length > 0 && (
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <span>Archive</span>
          </div>
          <div className={styles.puzzleList}>
            {archivePuzzles.map((puzzle) => (
              <PuzzleCard
                key={puzzle.id}
                puzzle={puzzle}
                isActive={currentPuzzleId === puzzle.id}
                isCompleted={isCompleted(puzzle.id)}
                onClick={() => onSelect(puzzle)}
              />
            ))}
          </div>
        </div>
      )}

      {puzzles.length === 0 && (
        <div className={styles.empty}>No puzzles available</div>
      )}
    </div>
  );
}

interface PuzzleCardProps {
  puzzle: Puzzle;
  isActive: boolean;
  isCompleted: boolean;
  onClick: () => void;
}

function PuzzleCard({
  puzzle,
  isActive,
  isCompleted,
  onClick,
}: PuzzleCardProps) {
  return (
    <button
      className={`${styles.puzzleCard} ${isActive ? styles.active : ""}`}
      onClick={onClick}
      type="button"
    >
      <div className={styles.puzzleInfo}>
        <div className={styles.puzzleTitleRow}>
          {isCompleted && (
            <svg
              className={styles.checkIcon}
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20,6 9,17 4,12" />
            </svg>
          )}
          <span className={styles.puzzleTitle}>{puzzle.title}</span>
        </div>
        <div className={styles.puzzleMeta}>
          <span>By {puzzle.author}</span>
          {puzzle.difficulty && (
            <>
              <span className={styles.dot}>·</span>
              <span
                className={styles.difficulty}
                style={{
                  color: difficultyColors[puzzle.difficulty] || "#888",
                }}
              >
                {puzzle.difficulty.charAt(0).toUpperCase() +
                  puzzle.difficulty.slice(1)}
              </span>
            </>
          )}
        </div>
      </div>
      <svg
        className={styles.chevron}
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="9,18 15,12 9,6" />
      </svg>
    </button>
  );
}
