"use client";

import { useEffect, useMemo, useState } from "react";
import { useMiniKit } from "@coinbase/onchainkit/minikit";
import styles from "./page.module.css";

const PUZZLE = {
  title: "Countdown to 2026",
  author: "WEBthe3rd",
  sudokupadUrl: "https://sudokupad.app/w17uwve3sq",
  rules: [
    "Normal sudoku rules apply.",
    "Note: All lines have a maximum length of 4 cells.",
    "Dynamic Fog - The grid is covered in fog. A correctly placed digit will clear any fog in that cell, and potentially in other cells as well. No guessing is required.",
    "Sandwich Sums - Digits outside the grid indicate the sum of the digits found between the 1 and the 9 in the indicated row or column.",
    "Anti-Kropki - Digits separated by a red ❌ are not consecutive and are not in a 1:2 ratio.",
    "German Whisper - Digits along a green line must differ from their neighbors by at least 5.",
    "Parity Lines - Digits along a red line must alternate between even and odd.",
    "Renban Lines - Digits along a pink line must form a consecutive, non-repeating set in any order.",
    "Region Sum Lines - Digits along a blue line are divided into segments with equal sums by the box boundaries.",
  ],
};

export default function Home() {
  const { isFrameReady, setFrameReady, context } = useMiniKit();
  const [showRules, setShowRules] = useState(true);

  useEffect(() => {
    if (!isFrameReady) setFrameReady();
  }, [isFrameReady, setFrameReady]);

  const displayName = useMemo(
    () => context?.user?.displayName || "there",
    [context?.user?.displayName]
  );

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <header className={styles.header}>
          <div className={styles.kicker}>Daily logic puzzle</div>
          <h1 className={styles.title}>{PUZZLE.title}</h1>
          <div className={styles.meta}>
            <span>By {PUZZLE.author}</span>
            <span className={styles.dot}>•</span>
            <span>Hi {displayName}, enjoy the puzzle!</span>
          </div>
        </header>

        <section className={styles.card}>
          {showRules && (
            <>
              <h2 className={styles.sectionTitle}>Rules</h2>
              <ul className={styles.rules}>
                {PUZZLE.rules.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </>
          )}
          <div className={styles.actions}>
            <a
              className={styles.primaryButton}
              href={PUZZLE.sudokupadUrl}
              target="_blank"
              rel="noreferrer"
            >
              Solve on SudokuPad →
            </a>

            <button
              className={styles.secondaryButton}
              type="button"
              onClick={() => setShowRules((v) => !v)}
            >
              {showRules ? "Hide rules" : "Show rules"}
            </button>
          </div>
        </section>

        <section className={styles.embedWrap}>
          <div className={styles.embedHint}>
            If the embed doesn’t load, use “Solve on SudokuPad” above.
          </div>
          <iframe
            className={styles.iframe}
            src={PUZZLE.sudokupadUrl}
            title={`${PUZZLE.title} (SudokuPad)`}
            allow="fullscreen"
          />
        </section>
      </div>
    </div>
  );
}
