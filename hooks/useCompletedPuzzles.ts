"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "sudoku-completed-puzzles";

export function useCompletedPuzzles() {
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setCompleted(new Set(JSON.parse(stored)));
      }
    } catch (e) {
      console.error("Failed to load completed puzzles from localStorage:", e);
    }
    setIsLoaded(true);
  }, []);

  const markCompleted = useCallback((puzzleId: string) => {
    setCompleted((prev) => {
      const next = new Set(prev).add(puzzleId);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
      } catch (e) {
        console.error("Failed to save completed puzzles to localStorage:", e);
      }
      return next;
    });
  }, []);

  const unmarkCompleted = useCallback((puzzleId: string) => {
    setCompleted((prev) => {
      const next = new Set(prev);
      next.delete(puzzleId);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
      } catch (e) {
        console.error("Failed to save completed puzzles to localStorage:", e);
      }
      return next;
    });
  }, []);

  const toggleCompleted = useCallback((puzzleId: string) => {
    setCompleted((prev) => {
      const next = new Set(prev);
      if (next.has(puzzleId)) {
        next.delete(puzzleId);
      } else {
        next.add(puzzleId);
      }
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
      } catch (e) {
        console.error("Failed to save completed puzzles to localStorage:", e);
      }
      return next;
    });
  }, []);

  const isCompleted = useCallback(
    (puzzleId: string) => completed.has(puzzleId),
    [completed]
  );

  return {
    completed,
    isLoaded,
    markCompleted,
    unmarkCompleted,
    toggleCompleted,
    isCompleted,
  };
}
