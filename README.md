# Gitár akkord tanító

Böngészőben futó React alkalmazás 12 bundos gitárnyak diagrammal.

## Indítás

```bash
npm install
npm run dev
```

## Akkord adat

A `src/data/chords.json` fájl 48 akkordot tartalmaz (objektum formátum):

```json
"C": {
  "name": "C",
  "notes": ["C", "E", "G"],
  "positions": [
    { "string": 5, "fret": 3, "note": "C" },
    { "string": 3, "fret": 0, "note": "G" }
  ]
}
```

- `string`: 1 = vékony e, 6 = vastag E
- `fret`: 0 = üres húr; a listában nem szereplő húrok némítva
- `notes`: az akkord hangjai (megjelenítéshez)

## Gyakorlás

`src/data/gyak-level-1.json` — szint definíció:

```json
{
  "id": "level-1",
  "title": "1. szint — nyitott akkordok",
  "settings": {
    "totalMinutes": 5,
    "chordDisplaySeconds": 8
  },
  "chords": ["C", "G", "Am", "Em", "Dm"]
}
```

A **Lejátszás** gomb véletlenszerűen mutatja az akkordokat a beállított ideig.

**2. szint** (`gyak-level-2.json`): D, A, Hm, F — 7 perc, 7 mp/akkord.

## GitHub Pages (ingyenes hosting)

### 1. Repó létrehozása GitHubon

1. Jelentkezz be: [github.com](https://github.com)
2. **New repository** → pl. név: `guitar-chord-trainer`
3. **Public** → Create (README nélkül is jó)

### 2. Kód feltöltése (első alkalommal)

PowerShell a projekt mappában:

```powershell
cd C:\Users\zsely\guitar-chord-trainer
git init
git add .
git commit -m "Gitár akkord tanító — kezdeti verzió"
git branch -M main
git remote add origin https://github.com/FELHASZNÁLÓNÉV/guitar-chord-trainer.git
git push -u origin main
```

A `FELHASZNÁLÓNÉV` helyére a saját GitHub nevedet írd.

### 3. GitHub Pages bekapcsolása

1. A repóban: **Settings** → **Pages**
2. **Build and deployment** → Source: **GitHub Actions**
3. A `main` branchre push után automatikusan fut a deploy (`.github/workflows/deploy.yml`)

### 4. Az oldal címe

Néhány perc múlva:

`https://FELHASZNÁLÓNÉV.github.io/guitar-chord-trainer/`

(A repó neve legyen ugyanaz, mint a fenti — a build ezt használja útvonalnak.)

### Későbbi frissítés

```powershell
git add .
git commit -m "Változtatás leírása"
git push
```

Minden push után újra deployol.

## Hangjelölés

Magyar rendszer: törzshangok **C D E F G A H**, felemelt **C# … H#**, leszállított **Cb … Bb**.
A si hang **H** (nem B); a leszállított si **Bb** (nem Hb). Példák: `H`, `Hm`, `H7`, `Bb`, `Bbm`.
