"use client";

import { useState } from "react";
import { Puzzle } from "@/lib/types";
import { getAllPuzzles } from "@/lib/puzzles";
import { useViewportHeight } from "@/hooks/useViewportHeight";
import { useCompletedPuzzles } from "@/hooks/useCompletedPuzzles";
import { BottomBar } from "./BottomBar";
import { BottomSheet } from "./BottomSheet";
import { PuzzlePicker } from "./PuzzlePicker";
import styles from "./MobileLayout.module.css";

interface MobileLayoutProps {
  puzzle: Puzzle;
  onPuzzleSelect: (puzzle: Puzzle) => void;
}

export function MobileLayout({ puzzle, onPuzzleSelect }: MobileLayoutProps) {
  useViewportHeight();

  const [showNotes, setShowNotes] = useState(true);
  const [showPuzzles, setShowPuzzles] = useState(false);
  const { isCompleted, toggleCompleted } = useCompletedPuzzles();

  const allPuzzles = getAllPuzzles();
  const completed = isCompleted(puzzle.id);

  const handlePuzzleSelect = (selected: Puzzle) => {
    onPuzzleSelect(selected);
    setShowPuzzles(false);
  };

  return (
    <div className={styles.container}>
      {/* Minimal Header */}
      <header className={styles.header}>
        <h1 className={styles.title}>{puzzle.title}</h1>
        <span className={styles.author}>by {puzzle.author}</span>
      </header>

      {/* Puzzle iframe - fills available space */}
      <main className={styles.puzzleArea}>
        <iframe
          className={styles.iframe}
          src={puzzle.sudokupadUrl}
          title={`${puzzle.title} (SudokuPad)`}
          allow="fullscreen"
        />
      </main>

      {/* Fixed Bottom Bar */}
      <BottomBar
        onPuzzlesClick={() => setShowPuzzles(true)}
        onNotesClick={() => setShowNotes(true)}
        externalUrl={puzzle.sudokupadUrl}
      />

      {/* Notes Bottom Sheet */}
      <BottomSheet
        isOpen={showNotes}
        onClose={() => setShowNotes(false)}
        title="Setter's Notes"
      >
        {puzzle.notes && puzzle.notes.length > 0 ? (
          <>
            <ul className={styles.notesList}>
              {puzzle.notes.map((note, index) => (
                <li key={index} className={styles.noteItem}>
                  {note}
                </li>
              ))}
            </ul>
            <div className={styles.completionSection}>
              <button
                className={`${styles.completionButton} ${
                  completed ? styles.completed : ""
                }`}
                onClick={() => toggleCompleted(puzzle.id)}
                type="button"
              >
                {completed ? (
                  <>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20,6 9,17 4,12" />
                    </svg>
                    Completed
                  </>
                ) : (
                  <>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                    </svg>
                    Mark as Completed
                  </>
                )}
              </button>
            </div>
          </>
        ) : (
          <p className={styles.noNotes}>No notes for this puzzle.</p>
        )}
      </BottomSheet>

      {/* Puzzles Bottom Sheet */}
      <BottomSheet
        isOpen={showPuzzles}
        onClose={() => setShowPuzzles(false)}
        title="Puzzles"
      >
        <PuzzlePicker
          puzzles={allPuzzles}
          currentPuzzleId={puzzle.id}
          onSelect={handlePuzzleSelect}
          isCompleted={isCompleted}
        />
      </BottomSheet>
    </div>
  );
}
