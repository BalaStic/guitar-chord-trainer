import type { ChordDefinition, ChordPosition } from "../types/chord";

const STRING_COUNT = 6;

export function chordToPositions(chord: ChordDefinition): ChordPosition[] {
  const positions: ChordPosition[] = [];

  chord.frets.forEach((fret, stringIndex) => {
    if (fret === -1) {
      positions.push({ stringIndex, fret: 0, muted: true });
      return;
    }
    if (fret === 0) {
      positions.push({ stringIndex, fret: 0, open: true });
      return;
    }
    const finger = chord.fingers?.[stringIndex];
    positions.push({
      stringIndex,
      fret,
      finger: finger && finger > 0 ? finger : undefined,
      note: chord.fretNotes?.[stringIndex],
    });
  });

  return positions;
}

export { STRING_COUNT };
