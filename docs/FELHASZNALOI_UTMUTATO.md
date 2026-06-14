# Felhasználói útmutató — Gitár akkord tanító

## Mi ez az alkalmazás?

Böngészőben futó gitárakkord-tanító **magyar hangjelöléssel**. Megmutatja, hol kell lefogni a húrokat egy 12 bundos gitárnyakon, és van benne **gyakorló mód** véletlenszerű akkordváltással.

**Élő verzió:** https://balastic.github.io/guitar-chord-trainer/

---

## A gitárnyak értelmezése

### Húrok (felülről lefelé)

| Felirat | Gitárhúr |
|---------|----------|
| e | vékony e (1. húr) |
| H | H húr (2.) |
| G | G húr (3.) |
| D | D húr (4.) |
| A | A húr (5.) |
| E | vastag E (6.) |

### Jelek a nyak tetején (0. bund)

| Jel | Jelentés |
|-----|----------|
| **X** | némított húr — ne szólaljon meg |
| **○** | üres húr — meg kell pengetni nyitva |

### Lefogott pozíciók

- **Narancssárga karika** a bundon: lefogott hang
- A karikában a **hang neve** látszik (pl. `C#`, `Bb`, `H`)
- **Narancssárga vízszintes sáv**: barré (egy ujj több húron)

### Bundjelölő pöttyök

A nyakon **4 fehér pötty** van, mint igazi gitáron: a **3., 5., 7. és 9.** bundnál, a G és D húr között.

### Bundszámok

Felül 1–12: melyik bundon fogod le a húrt.

---

## Hangjelölés (magyar)

| Típus | Példák |
|-------|--------|
| Törzshangok | C D E F G A **H** |
| Felemelt | C# D# … H# |
| Leszállított | Cb Db … **Bb** |

Fontos: a si hang **H** (nem angol B). A leszállított si **Bb** (nem Hb).

---

## Böngészés mód (kézi akkordválasztás)

1. **Hangcsoport** — pl. `C / Am`, `G / Em` (12 csoport, kvintkör szerint)
2. **Akkordtípus** — Dur, Dur7, Moll, Moll7
3. A nyakon megjelenik az akkord, alatta a hangjai (pl. `C · E · G`)

Az **Üres nyak** jelölőnégyzet csak a nyakat mutatja, akkord nélkül.

---

## Gyakorlás mód

### Szintek

| Szint | Akkordok | Idő | Akkordonként |
|-------|----------|-----|--------------|
| **1.** | C, G, Am, Em, Dm | 5 perc | 8 mp |
| **2.** | D, A, Hm, F | 7 perc | 7 mp |

### Használat

1. Válaszd ki a **Gyakorlási szint** gombok közül a kívánt szintet
2. Kattints a **▶ Lejátszás** gombra
3. Véletlenszerű akkordok jelennek meg a beállított ideig
4. **■ Stop** — megállítás
5. A képernyőn látszik: hátralévő idő, következő akkord visszaszámláló, mutatott akkordok száma

### Tanulási filozófia

Lépésről lépésre haladunk. **Ne ugorj a következő szintre**, amíg az aktuális akkordokat magabiztosan nem fogod. A szinteket te választod — az app nem léptet automatikusan tovább.

---

## Tippek gyakorláshoz

- Először nézd a diagramot, próbáld lefogni a gitáron, majd ellenőrizd a hangokat
- A 2. szint **F** akkordja az első barré — időt érdemes szánni rá
- Ismételd a szintet többször; a véletlenszerű sorrend segít, hogy ne memorizáld a sorrendet

---

## Ismert korlátok

- Nincs hang lejátszás (csak vizuális diagram)
- Nincs ujjszám megjelenítés (csak hangnevek a karikákban)
- 48 akkord van az adatbázisban; a gyakorló szintek csak egy részét használják
- A 12. bundon nincs dupla fehér pötty (az igazi gitáron szokott lenni)
