# AI session átadó — Gitár akkord tanító

> **Cél:** Ezt a fájlt másold be egy új Cursor / AI beszélgetés elejére, ha a kontextus megtelt vagy új sessiont indítasz.

---

## Projekt egy mondatban

Magyar hangjelölésű, böngészős gitárakkord-tanító React app 48 akkorddal, interaktív 12 bundos nyakkal és 2 szintű gyakorló móddal; deploy: GitHub Pages.

**Mappa:** `C:\Users\zsely\guitar-chord-trainer`  
**Live:** https://balastic.github.io/guitar-chord-trainer/  
**Repo:** https://github.com/BalaStic/guitar-chord-trainer

---

## Stack

React 19 + TypeScript + Vite 6 + Tailwind 4. Nincs router, nincs backend.

---

## Mit építettünk fel (kronológia)

1. Fretboard komponens — 12 bund, 6 húr, magyar húrnevek (e,H,G,D,A,E)
2. `chords.json` bekötés — 48 akkord, `positions` formátum
3. UI finomítások: szélesség (~1.5× + 10%), bundvonalak arany szín, nyak teteje keskeny, X/○ jelek nagyok
4. Karikákban hangnevek (`fretNotes` a JSON `note` mezőből)
5. Fehér inlay pöttyök: 3, 5, 7, 9. bund, G–D között
6. Barré jelölés (vízszintes sáv) — hamis pozitív javítva nyitott akkordoknál
7. Gyakorló mód: `gyak-level-1.json`, `gyak-level-2.json`, Play/Stop, véletlen akkordok
8. GitHub Pages deploy (Actions workflow, `@types/node` fix)
9. Dm hiba javítva: JSON adathiba (F→D a 2. húr 3. bundján)
10. A dur hamis barré javítva: `detectBarre` kihagyja a nyitott húras akkordokat

---

## Kritikus technikai döntések

| Döntés | Részlet |
|--------|---------|
| Húr index JSON | `string` 1–6 (e=1, E=6); belső 0–5 (E=0, e=5) |
| Nyitott húr | `fret: 0` → ○ a nyak tetején, **nem** narancssárga karika |
| Némított | nincs a `positions` listában |
| Hangjelölés | H=si, Bb=leszállított si, **nem** angol B |
| Barré detektálás | ≥3 húr min bundon + **nincs** nyitott húr |
| GitHub Pages base | `VITE_BASE_PATH=/${repo}/` |

---

## Fájlok, amiket leggyakrabban kell szerkeszteni

| Fájl | Mikor |
|------|-------|
| `src/data/chords.json` | Új/javított akkord |
| `src/data/gyak-level-N.json` | Új gyakorló szint |
| `src/components/Fretboard.tsx` | Nyak megjelenés |
| `src/App.tsx` | UI, szintek listája |
| `src/lib/parseChordDatabase.ts` | Barré logika, parsing |

---

## Gyakorló szintek (aktuális)

- **Level 1:** C, G, Am, Em, Dm — 5 perc, 8 mp/akkord
- **Level 2:** D, A, Hm, F — 7 perc, 7 mp/akkord

Szintváltás manuális; nincs auto-progress.

---

## Felhasználói preferenciák

- Magyar nyelv, magyar hangjelölés
- Lépésről lépésre tanulás, nem ugrik szintet automatikusan
- Minimális, célzott kódváltoztatások
- Commit/push csak kérésre

---

## Nyitott / jövőbeli ötletek

- További gyakorló szintek (level 3+)
- „Kész vagyok” gomb szintlépéshez
- Akkord-adat validáció (note vs fret)
- Ujjszámok, hang lejátszás
- 12. bund dupla inlay

---

## Gyors parancsok

```powershell
cd C:\Users\zsely\guitar-chord-trainer
npm run dev
git add . ; git commit -m "..." ; git push   # csak ha kéri
```

---

## További dokumentáció

- `docs/FELHASZNALOI_UTMUTATO.md` — végfelhasználóknak
- `docs/FEJLESZTOI_DOKUMENTACIO.md` — architektúra, API, bővítés
- `README.md` — gyors indítás, deploy
