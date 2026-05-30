export interface PracticeSettings {
  /** Összes gyakorlási idő percben */
  totalMinutes: number;
  /** Egy akkord megjelenítési ideje másodpercben */
  chordDisplaySeconds: number;
}

export interface PracticeLevel {
  id: string;
  title: string;
  description?: string;
  settings: PracticeSettings;
  /** Akkordnevek — a chords.json kulcsaival egyeznek */
  chords: string[];
}
