import { useMemo, useState } from "react";
import { Fretboard } from "./components/Fretboard";
import { PracticePanel } from "./components/PracticePanel";
import chordDatabase from "./data/chords.json";
import practiceLevel1 from "./data/gyak-level-1.json";
import { chordToPositions } from "./lib/chordToPositions";
import {
  buildChordMap,
  usePracticeSession,
} from "./hooks/usePracticeSession";
import {
  flattenGroups,
  parseChordDatabase,
} from "./lib/parseChordDatabase";
import { NOTE_NAMING_HELP } from "./lib/notes";
import type { ChordDatabase } from "./types/chord";
import type { PracticeLevel } from "./types/practice";

const CHORD_TYPES = ["Dur", "Dur7", "Moll", "Moll7"] as const;

const groups = parseChordDatabase(chordDatabase as ChordDatabase);
const allChords = flattenGroups(groups);
const chordMap = buildChordMap(allChords);
const level1 = practiceLevel1 as PracticeLevel;

function App() {
  const [groupIndex, setGroupIndex] = useState(6);
  const [typeIndex, setTypeIndex] = useState(0);
  const [showEmptyNeck, setShowEmptyNeck] = useState(false);

  const practice = usePracticeSession(level1, chordMap);

  const group = groups[groupIndex];
  const browseChord = group?.chords[typeIndex] ?? allChords[0];
  const chord = practice.isPlaying ? practice.currentChord : browseChord;

  const positions = useMemo(
    () => (chord ? chordToPositions(chord) : []),
    [chord],
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <header className="border-b border-slate-800/80 bg-slate-950/80 px-6 py-8 backdrop-blur">
        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Gitár akkordok
        </h1>
        <p className="mt-2 max-w-xl text-slate-400">
          {allChords.length} akkord · 12 bundos gitárnyak · magyar hangjelölés
        </p>
      </header>

      <main className="mx-auto flex w-full max-w-[125.84rem] flex-col items-center gap-10 px-6 py-10">
        <PracticePanel
          level={level1}
          isPlaying={practice.isPlaying}
          sessionRemainingSec={practice.sessionRemainingSec}
          chordRemainingSec={practice.chordRemainingSec}
          chordsShown={practice.chordsShown}
          missingChords={practice.missingChords}
          onStart={practice.start}
          onStop={practice.stop}
        />

        <section className="w-full space-y-5">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-300">
              <input
                type="checkbox"
                checked={showEmptyNeck}
                onChange={(e) => setShowEmptyNeck(e.target.checked)}
                disabled={practice.isPlaying}
                className="rounded border-slate-600 bg-slate-800 text-orange-500 focus:ring-orange-500 disabled:opacity-40"
              />
              Üres nyak
            </label>
          </div>

          {!showEmptyNeck && !practice.isPlaying && (
            <>
              <div>
                <p className="mb-2 text-center text-xs font-medium uppercase tracking-wider text-slate-500">
                  Hangcsoport
                </p>
                <div className="flex flex-wrap justify-center gap-1.5">
                  {groups.map((g, i) => (
                    <button
                      key={g.label}
                      type="button"
                      onClick={() => {
                        setGroupIndex(i);
                        setTypeIndex(0);
                      }}
                      className={`rounded-lg px-2.5 py-1.5 text-xs font-medium transition sm:px-3 sm:text-sm ${
                        groupIndex === i
                          ? "bg-slate-700 text-white ring-1 ring-orange-500/50"
                          : "bg-slate-800/80 text-slate-400 hover:bg-slate-700 hover:text-slate-200"
                      }`}
                    >
                      {g.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-2 text-center text-xs font-medium uppercase tracking-wider text-slate-500">
                  Akkordtípus
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {group?.chords.map((c, i) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setTypeIndex(i)}
                      className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                        typeIndex === i
                          ? "bg-orange-500 text-white shadow-lg shadow-orange-900/40"
                          : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                      }`}
                    >
                      <span className="block text-[10px] font-normal uppercase tracking-wide opacity-70">
                        {CHORD_TYPES[i]}
                      </span>
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {practice.isPlaying && (
            <p className="text-center text-sm font-medium text-emerald-400/90">
              Gyakorlás folyamatban — véletlenszerű akkordok
            </p>
          )}
        </section>

        <section className="flex flex-col items-center gap-3">
          {chord && !showEmptyNeck && (
            <>
              <h2 className="text-4xl font-bold text-orange-400">{chord.name}</h2>
              <p className="text-sm text-slate-400">
                Hangok:{" "}
                <span className="font-medium text-slate-200">
                  {chord.notes.join(" · ")}
                </span>
              </p>
            </>
          )}
          <Fretboard
            fretCount={12}
            positions={showEmptyNeck ? [] : positions}
            barre={showEmptyNeck ? undefined : chord?.barre}
          />
        </section>

        <section className="w-full max-w-lg rounded-xl border border-slate-800 bg-slate-900/50 p-5 text-sm text-slate-400">
          <h3 className="mb-2 font-semibold text-slate-200">Adatforrás</h3>
          <p className="leading-relaxed">
            Akkordok: <code className="text-orange-300">src/data/chords.json</code>
            · Gyakorlás:{" "}
            <code className="text-orange-300">src/data/gyak-level-1.json</code>
          </p>
          <p className="mt-3">{NOTE_NAMING_HELP}</p>
        </section>
      </main>
    </div>
  );
}

export default App;
