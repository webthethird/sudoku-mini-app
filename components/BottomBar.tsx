"use client";

import styles from "./BottomBar.module.css";

interface BottomBarProps {
  onPuzzlesClick: () => void;
  onNotesClick: () => void;
  externalUrl: string;
}

export function BottomBar({
  onPuzzlesClick,
  onNotesClick,
  externalUrl,
}: BottomBarProps) {
  return (
    <nav className={styles.bottomBar}>
      <button
        className={styles.barButton}
        onClick={onPuzzlesClick}
        type="button"
      >
        <svg
          className={styles.icon}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
        </svg>
        <span className={styles.label}>Puzzles</span>
      </button>

      <button
        className={styles.barButton}
        onClick={onNotesClick}
        type="button"
      >
        <svg
          className={styles.icon}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
          <polyline points="14,2 14,8 20,8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <line x1="10" y1="9" x2="8" y2="9" />
        </svg>
        <span className={styles.label}>Notes</span>
      </button>

      <a
        className={styles.barButton}
        href={externalUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        <svg
          className={styles.icon}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          <polyline points="15,3 21,3 21,9" />
          <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
        <span className={styles.label}>SudokuPad</span>
      </a>
    </nav>
  );
}
