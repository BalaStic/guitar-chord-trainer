# Gitár akkord tanító

Böngészőben futó React alkalmazás 12 bundos gitárnyak diagrammal és gyakorló móddal. Magyar hangjelölés (H = si).

**Élő:** https://balastic.github.io/guitar-chord-trainer/

## Dokumentáció

| Dokumentum | Célcsoport |
|------------|------------|
| [Felhasználói útmutató](docs/FELHASZNALOI_UTMUTATO.md) | Gitárosok, tanulók |
| [Fejlesztői dokumentáció](docs/FEJLESZTOI_DOKUMENTACIO.md) | Programozók, bővítés |
| [AI kontextus átadó](docs/AI_KONTEXTUS.md) | Új AI session indításához |

## Gyors indítás

```bash
npm install
npm run dev
```

## Deploy

Push a `main` branchre → GitHub Actions automatikusan deployol GitHub Pages-re.

Részletek: [Fejlesztői dokumentáció — Build és deploy](docs/FEJLESZTOI_DOKUMENTACIO.md#build-és-deploy)

## Hangjelölés

Törzshangok: **C D E F G A H** · Felemelt: **C# … H#** · Leszállított: **Cb … Bb**  
A si = **H** (nem B); leszállított si = **Bb**
