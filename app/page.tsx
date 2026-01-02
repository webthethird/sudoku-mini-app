"use client";

import { useEffect, useMemo, useState } from "react";
import { useMiniKit } from "@coinbase/onchainkit/minikit";
import styles from "./page.module.css";

const PUZZLE = {
  title: "Based Blue Lightning",
  author: "WEBthe3rd",
  sudokupadUrl: "https://sudokupad.app/r5fv1ebr5n",
  rules: [
    "Place the digits 1-9 once each in every row, column, and 3x3 box.",
    "Region Sum Lines - Region boundaries split the digits on a blue line into segments of the same sum.",
    "Kropki Dots - Digits separated by a white dot are consecutive.",
  ],
  notes: [
    "This one is fairly approachable, but still tricky, especially if you're new to region sum lines. Here is a quick explaination of region sum lines:",
    "Each time a region sum line crosses from one 3x3 box to another, it splits the digits in the two boxes into segments of the same sum.",
    "For example, the long blue line at the top of the puzzle is split into the following six segments:",
    "{r3c3, r3c2, r2c3}, {r1c4, r1c5, r1c6}, {r1c7, r1c8, r2c7}, {r3c6}, {r3c7, r3c8}, {r4c7}",
    "Note that two of these segments just contain a single cell, i.e., r3c6 and r4c7. This implies two things:",
    "1. These two cells must contain the same digit.",
    "2. The longer segments each cannot sum to more than 9, because otherwise the two single-cell segments would need to contain digits greater than 9, which is impossible.",
    "Note also that the minimum sum of any 3-cell segment is 6, i.e., the sum of the digits 1, 2, and 3. This implies that r3c6 and r4c7 cannot be lower than 6, so they must be from the set {6, 7, 8, 9}."
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
          <div className={styles.kicker}>New puzzle most days. Follow @webthe3rd.eth to catch the next one.</div>
          <h1 className={styles.title}>{PUZZLE.title}</h1>
          <div className={styles.meta}>
            <span>By {PUZZLE.author}</span>
            <span className={styles.dot}>•</span>
            <span>Hi {displayName}, enjoy the puzzle!</span>
          </div>
        </header>

        <section className={styles.card}>
          <h2 className={styles.sectionTitle}>Setter&apos;s Note</h2>
          <ul className={styles.rules}>
                {PUZZLE.notes.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
        </section>

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
