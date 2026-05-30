/** Magyar hangjelölés: H = si (angol B), leszállított H = Bb (nem Hb). */

export const NATURAL_NOTES = ["C", "D", "E", "F", "G", "A", "H"] as const;
export const SHARP_NOTES = [
  "C#",
  "D#",
  "E#",
  "F#",
  "G#",
  "A#",
  "H#",
] as const;
export const FLAT_NOTES = [
  "Cb",
  "Db",
  "Eb",
  "Fb",
  "Gb",
  "Ab",
  "Bb",
] as const;

export const NOTE_NAMING_HELP =
  "Törzshangok: C D E F G A H · Felemelt: C# D# E# F# G# A# H# · Leszállított: Cb Db Eb Fb Gb Ab Bb";
