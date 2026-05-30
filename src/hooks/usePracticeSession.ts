import { useCallback, useEffect, useRef, useState } from "react";
import type { ChordDefinition } from "../types/chord";
import type { PracticeLevel } from "../types/practice";

function pickRandomChord(
  names: string[],
  chordMap: Map<string, ChordDefinition>,
  avoidId?: string,
): ChordDefinition | null {
  const available = names
    .map((name) => chordMap.get(name))
    .filter((c): c is ChordDefinition => c !== undefined);

  if (available.length === 0) return null;
  if (available.length === 1) return available[0];

  let next = available[Math.floor(Math.random() * available.length)];
  if (avoidId && available.length > 1) {
    let attempts = 0;
    while (next.id === avoidId && attempts < 8) {
      next = available[Math.floor(Math.random() * available.length)];
      attempts++;
    }
  }
  return next;
}

export function usePracticeSession(
  level: PracticeLevel,
  chordMap: Map<string, ChordDefinition>,
) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentChord, setCurrentChord] = useState<ChordDefinition | null>(null);
  const [sessionRemainingSec, setSessionRemainingSec] = useState(0);
  const [chordRemainingSec, setChordRemainingSec] = useState(0);
  const [chordsShown, setChordsShown] = useState(0);

  const sessionEndRef = useRef(0);
  const chordEndRef = useRef(0);
  const lastChordIdRef = useRef<string | undefined>(undefined);

  const missingChords = level.chords.filter((name) => !chordMap.has(name));

  const showNextChord = useCallback(() => {
    const next = pickRandomChord(
      level.chords,
      chordMap,
      lastChordIdRef.current,
    );
    if (!next) return false;

    lastChordIdRef.current = next.id;
    setCurrentChord(next);
    chordEndRef.current =
      Date.now() + level.settings.chordDisplaySeconds * 1000;
    setChordRemainingSec(level.settings.chordDisplaySeconds);
    setChordsShown((n) => n + 1);
    return true;
  }, [level.chords, level.settings.chordDisplaySeconds, chordMap]);

  const stop = useCallback(() => {
    setIsPlaying(false);
    setCurrentChord(null);
    setSessionRemainingSec(0);
    setChordRemainingSec(0);
    sessionEndRef.current = 0;
    chordEndRef.current = 0;
    lastChordIdRef.current = undefined;
  }, []);

  const start = useCallback(() => {
    if (missingChords.length > 0) return;
    const totalSec = level.settings.totalMinutes * 60;
    sessionEndRef.current = Date.now() + totalSec * 1000;
    setSessionRemainingSec(totalSec);
    setChordsShown(0);
    lastChordIdRef.current = undefined;
    setIsPlaying(true);
    showNextChord();
  }, [level.settings.totalMinutes, missingChords.length, showNextChord]);

  useEffect(() => {
    if (!isPlaying) return;

    const tick = window.setInterval(() => {
      const now = Date.now();
      const sessionLeft = Math.max(
        0,
        Math.ceil((sessionEndRef.current - now) / 1000),
      );
      setSessionRemainingSec(sessionLeft);

      if (sessionLeft <= 0) {
        stop();
        return;
      }

      const chordLeft = Math.max(
        0,
        Math.ceil((chordEndRef.current - now) / 1000),
      );
      setChordRemainingSec(chordLeft);

      if (chordLeft <= 0) {
        showNextChord();
      }
    }, 250);

    return () => window.clearInterval(tick);
  }, [isPlaying, showNextChord, stop]);

  return {
    isPlaying,
    currentChord,
    sessionRemainingSec,
    chordRemainingSec,
    chordsShown,
    missingChords,
    start,
    stop,
  };
}

export function buildChordMap(
  chords: ChordDefinition[],
): Map<string, ChordDefinition> {
  return new Map(chords.map((c) => [c.id, c]));
}

export function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}
