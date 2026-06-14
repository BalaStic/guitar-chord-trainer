# TODO — guitar-chord-trainer

A code review alapján összegyűjtött fejlesztési feladatok, prioritás szerint.

---

## 🔴 High Priority

- [ ] **Decouple chord ID from chord name** — `buildChordMap` keys by `c.id`, but practice levels reference chords by name (e.g. `"Am"`, `"Em"`). These only match by accident. Either enforce the invariant with a comment/assertion, or key the map explicitly by `name`.
- [ ] **Add an Error Boundary** — wrap the app in a React `<ErrorBoundary>` so that a malformed `chords.json` or a parsing error doesn't crash the entire UI silently.
- [ ] **Fix `pickRandomChord` repeat logic** — instead of a retry loop with 8 attempts, filter out `avoidId` from the candidate list upfront when `available.length > 1`. More reliable and cleaner.

---

## 🟡 Medium Priority

- [ ] **Session end feedback** — when the timer hits 0 and `stop()` is called, show a visible message (e.g. `"Vége! Szép munka!"`) instead of silently returning to idle state.
- [ ] **Explain disabled `showEmptyNeck` checkbox** — add a `title="Gyakorlás alatt nem érhető el"` attribute to the `<label>` so users understand why it's greyed out during a session.
- [ ] **Add `type` field to `ChordDefinition`** — the `CHORD_TYPES` array in `App.tsx` (`["Dur", "Dur7", "Moll", "Moll7"]`) is positionally coupled to the JSON order. Adding a `type` field to `ChordEntry` / `ChordDefinition` would make it explicit and order-independent.
- [ ] **Warn on unexpected group sizes in `parseChordDatabase`** — the current hardcoded `i += 4` grouping silently drops chords if the JSON doesn't divide evenly into groups of 4. Add a `console.warn` or assertion for unexpected slice sizes.

---

## 🟢 Low Priority

- [ ] **Move `STRING_COUNT` to a shared constants file** — it's a domain constant currently exported from `lib/chordToPositions.ts`. A dedicated `lib/constants.ts` would be a more logical home.
- [ ] **Review magic `max-w` values** — `max-w-[125.84rem]` and `min-w-[105.6rem]` in `Fretboard.tsx` are unusual. Verify the layout renders correctly on small mobile screens (≤ 375px) and very wide displays.
- [ ] **Move `chords.sample.json` to `docs/`** — if it's only a reference/example and not used at runtime, it shouldn't live in `src/data/`. Moving it to `docs/` keeps the data folder clean.
- [ ] **Document the ID = name invariant** — if chord IDs and names are intentionally kept in sync, add a comment in `parseChordDatabase.ts` and/or `usePracticeSession.ts` so future contributors don't break it unknowingly.

---

## 💡 Nice to Have

- [ ] **Add more practice levels** — only 2 levels exist (`gyak-level-1.json`, `gyak-level-2.json`). A level 3+ with barre chords or 7th chords would extend the app's usefulness.
- [ ] **Keyboard shortcut to start/stop practice** — e.g. `Space` to toggle play/stop for a better desktop experience.
- [ ] **Progress indicator for chord timer** — a visual countdown bar under the fretboard would make the remaining chord time more intuitive than a raw number.
- [ ] **Persist last selected level** — save `levelIndex` to `localStorage` so it survives a page refresh.
