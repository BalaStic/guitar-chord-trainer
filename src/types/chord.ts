/**
 * Egy húr állapota az akkorddiagramon.
 * -1 = némítva (X), 0 = üres (O), 1–12 = bund szám
 */
export type FretValue = -1 | 0 | number;

export interface StringPosition {
  /** 1 = vékony e, 6 = vastag E */
  string: number;
  fret: number;
  note: string;
}

/** Egy bejegyzés a chords.json fájlban */
export interface ChordEntry {
  name: string;
  notes: string[];
  positions: StringPosition[];
}

export type ChordDatabase = Record<string, ChordEntry>;

/** Belső, feldolgozott akkord (fretboard rajzoláshoz) */
export interface ChordDefinition {
  id: string;
  name: string;
  notes: string[];
  /** 6 elem: index 0 = 6. húr (vastag E), index 5 = 1. húr (vékony e) */
  frets: [FretValue, FretValue, FretValue, FretValue, FretValue, FretValue];
  /** Hangnév húronként, ahol a bund > 0 */
  fretNotes?: [
    string | undefined,
    string | undefined,
    string | undefined,
    string | undefined,
    string | undefined,
    string | undefined,
  ];
  fingers?: [number, number, number, number, number, number];
  barre?: number;
}

export interface ChordGroup {
  label: string;
  chords: ChordDefinition[];
}

export interface ChordPosition {
  stringIndex: number;
  fret: number;
  finger?: number;
  muted?: boolean;
  open?: boolean;
  note?: string;
}
