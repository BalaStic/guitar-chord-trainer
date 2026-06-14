# Fejlesztői dokumentáció

## Áttekintés

| Mező | Érték |
|------|-------|
| Név | guitar-chord-trainer |
| Stack | React 19, TypeScript, Vite 6, Tailwind CSS 4 |
| Deploy | GitHub Pages (GitHub Actions) |
| Repo | https://github.com/BalaStic/guitar-chord-trainer |
| Nyelv / hangjelölés | Magyar (H = si, Bb = leszállított si) |

---

## Projektstruktúra

```
guitar-chord-trainer/
├── .github/workflows/deploy.yml   # CI → GitHub Pages
├── docs/                          # Dokumentáció
├── src/
│   ├── App.tsx                    # Fő UI: böngészés + gyakorlás
│   ├── components/
│   │   ├── Fretboard.tsx          # 12 bundos nyak, inlay pöttyök, barré
│   │   └── PracticePanel.tsx      # Gyakorló vezérlő
│   ├── data/
│   │   ├── chords.json            # 48 akkord (forrás-adatbázis)
│   │   ├── gyak-level-1.json      # Gyakorló szint 1
│   │   └── gyak-level-2.json      # Gyakorló szint 2
│   ├── hooks/
│   │   └── usePracticeSession.ts  # Időzítő, véletlen akkordváltás
│   ├── lib/
│   │   ├── parseChordDatabase.ts  # JSON → belső ChordDefinition
│   │   ├── chordToPositions.ts    # ChordDefinition → Fretboard pozíciók
│   │   └── notes.ts               # Hangjelölési konstansok
│   └── types/
│       ├── chord.ts               # Akkord típusok
│       └── practice.ts            # Gyakorló szint típusok
├── vite.config.ts                 # base path GitHub Pages-hez
└── package.json
```

---

## Adatfolyam

```
chords.json (ChordDatabase)
    ↓ parseChordDatabase()
ChordGroup[] + ChordDefinition[]
    ↓ chordToPositions()
ChordPosition[] → Fretboard

gyak-level-N.json (PracticeLevel)
    ↓ usePracticeSession() + chordMap
véletlen ChordDefinition → Fretboard
```

---

## Adatformátumok

### `chords.json` — akkord adatbázis

Gyökér: **objektum** (nem tömb). Kulcs = akkord id/név.

```json
"Dm": {
  "name": "Dm",
  "notes": ["D", "F", "A"],
  "positions": [
    { "string": 4, "fret": 0, "note": "D" },
    { "string": 3, "fret": 2, "note": "A" },
    { "string": 2, "fret": 3, "note": "D" },
    { "string": 1, "fret": 1, "note": "F" }
  ]
}
```

| Mező | Jelentés |
|------|----------|
| `string` | 1 = vékony e … 6 = vastag E |
| `fret` | 0 = üres; 1–12 = bund |
| `note` | Megjelenített hangnév a karikában |
| Hiányzó húr a listából | némított (X) |

**Belső index:** `stringNumberToIndex(s) = 6 - s` → 0 = vastag E, 5 = vékony e

**`fretNotes`:** csak `fret > 0` pozíciókból töltődik (`positionsToFretNotes`). Üres húrok a nyak tetején ○-val jelennek meg, nem karikával.

### `gyak-level-N.json` — gyakorló szint

```json
{
  "id": "level-1",
  "title": "1. szint — nyitott akkordok",
  "description": "...",
  "settings": {
    "totalMinutes": 5,
    "chordDisplaySeconds": 8
  },
  "chords": ["C", "G", "Am", "Em", "Dm"]
}
```

A `chords` elemeknek egyezniük kell a `chords.json` kulcsaival.

---

## Fő komponensek

### `Fretboard.tsx`

- CSS Grid: húrcímke + nyak (X/○) + 12 bund oszlop
- `INLAY_FRETS = [3, 5, 7, 9]` — fehér pöttyök G és D húr között
- Barré: vízszintes narancssárga sáv + üres karikák a széleken
- `startFret` / „X. bundtól” felirat **eltávolítva** (mindig teljes 12 bund)

### `parseChordDatabase.ts`

- `detectBarre()`: 3+ húr ugyanazon a minimum bundon **ÉS** nincs nyitott húr (`fret === 0`)
  - Megakadályozza hamis barrét A, Am stb. nyitott akkordoknál
- Csoportosítás: 4-esével (Dur, Dur7, Moll, Moll7) kvintkör sorrendben

### `usePracticeSession.ts`

- `sessionEndRef` + `chordEndRef` alapú visszaszámlálás (250 ms tick)
- Véletlen akkord, kerüli az azonnali ismétlést
- `buildChordMap()`: `id` → `ChordDefinition`

---

## Új gyakorló szint hozzáadása

1. Hozz létre `src/data/gyak-level-3.json`-t a `PracticeLevel` séma szerint
2. Importáld `App.tsx`-ben, add hozzá a `practiceLevels` tömbhöz
3. Push → automatikus deploy

## Új akkord hozzáadása

1. Bővítsd `chords.json`-t (ellenőrizd a `note` mezőket minden pozíciónál!)
2. Ha új gyakorló szintben kell, add a nevet a `chords` listához

## Barré finomhangolás

Ha `detectBarre` tévesen jelez vagy nem jelez:

- Jelenlegi szabály: `countAtMin >= 3` és nincs `fret === 0`
- F maj7, Ab stb. barré akkordoknál működik
- Nyitott akkordoknál kikapcsolva

---

## Build és deploy

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # dist/
```

**GitHub Pages:** `VITE_BASE_PATH=/${repo-name}/` a workflow-ban. Lokálisan `/`.

**Követelmény:** `@types/node` a `vite.config.ts` `process.env` használatához.

---

## Ismert hibák / javított problémák

| Probléma | Megoldás |
|----------|----------|
| Dm 2× F, 0× D a karikában | `chords.json`: string 2, fret 3 → `note: "D"` (volt `F`) |
| A dur hamis barré | `detectBarre`: skip ha van nyitott húr |
| × jel túl kicsi | `X` betű, `STRING_LABEL_CLASS` (text-xl) |
| GitHub build: `process` nem található | `@types/node` + `tsconfig.node.json` types |

---

## Lehetséges továbbfejlesztések

- 3+ gyakorló szint, „Kész vagyok” gomb szintlépéshez
- Ujjszámok megjelenítése (`fingers` mező már a típusban van)
- Hang lejátszás (Web Audio API)
- 12. bund dupla inlay pötty
- Akkord-adat validátor (note vs. fret ellenőrzés)
- `localStorage` — utoljára gyakorolt szint megjegyzése
- PWA / offline mód

---

## Konvenciók

- UI szövegek: magyar
- Hangjelölés: magyar (H, Bb, H#)
- Minimális diff, nincs over-engineering
- Commit csak kérésre
