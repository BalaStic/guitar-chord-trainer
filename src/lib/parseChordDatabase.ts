import type {
  ChordDatabase,
  ChordDefinition,
  ChordEntry,
  ChordGroup,
  FretValue,
} from "../types/chord";

/** JSON string (1–6) → belső index (0 = vastag E, 5 = vékony e) */
export function stringNumberToIndex(stringNum: number): number {
  return 6 - stringNum;
}

export function positionsToFrets(
  positions: ChordEntry["positions"],
): ChordDefinition["frets"] {
  const frets: FretValue[] = [-1, -1, -1, -1, -1, -1];
  for (const p of positions) {
    frets[stringNumberToIndex(p.string)] = p.fret;
  }
  return frets as ChordDefinition["frets"];
}

export function positionsToFretNotes(
  positions: ChordEntry["positions"],
): ChordDefinition["fretNotes"] {
  const notes: NonNullable<ChordDefinition["fretNotes"]> = [
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
  ];
  for (const p of positions) {
    if (p.fret > 0) {
      notes[stringNumberToIndex(p.string)] = p.note;
    }
  }
  return notes;
}

export function detectBarre(
  frets: ChordDefinition["frets"],
): number | undefined {
  const atFret = new Map<number, number>();
  for (const f of frets) {
    if (f > 0) {
      atFret.set(f, (atFret.get(f) ?? 0) + 1);
    }
  }
  if (atFret.size === 0) return undefined;

  const minFret = Math.min(...atFret.keys());
  const countAtMin = atFret.get(minFret) ?? 0;
  return countAtMin >= 3 ? minFret : undefined;
}

export function parseChord(id: string, entry: ChordEntry): ChordDefinition {
  const frets = positionsToFrets(entry.positions);
  return {
    id,
    name: entry.name,
    notes: entry.notes,
    frets,
    fretNotes: positionsToFretNotes(entry.positions),
    barre: detectBarre(frets),
  };
}

export function parseChordDatabase(db: ChordDatabase): ChordGroup[] {
  const entries = Object.entries(db);
  const groups: ChordGroup[] = [];

  for (let i = 0; i < entries.length; i += 4) {
    const slice = entries.slice(i, i + 4);
    const chords = slice.map(([id, entry]) => parseChord(id, entry));
    const major = chords[0]?.name ?? "";
    const minor = chords[2]?.name ?? "";
    groups.push({
      label: minor ? `${major} / ${minor}` : major,
      chords,
    });
  }

  return groups;
}

export function flattenGroups(groups: ChordGroup[]): ChordDefinition[] {
  return groups.flatMap((g) => g.chords);
}
