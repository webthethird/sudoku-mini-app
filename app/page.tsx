"use client";

import { useEffect, useState } from "react";
import { useMiniKit } from "@coinbase/onchainkit/minikit";
import { getPuzzleOfTheDay } from "@/lib/puzzles";
import { Puzzle } from "@/lib/types";
import { MobileLayout } from "@/components/MobileLayout";

export default function Home() {
  const { isFrameReady, setFrameReady } = useMiniKit();
  const [currentPuzzle, setCurrentPuzzle] = useState<Puzzle>(() =>
    getPuzzleOfTheDay()
  );

  useEffect(() => {
    if (!isFrameReady) setFrameReady();
  }, [isFrameReady, setFrameReady]);

  const handlePuzzleSelect = (puzzle: Puzzle) => {
    setCurrentPuzzle(puzzle);
  };

  return (
    <MobileLayout puzzle={currentPuzzle} onPuzzleSelect={handlePuzzleSelect} />
  );
}
