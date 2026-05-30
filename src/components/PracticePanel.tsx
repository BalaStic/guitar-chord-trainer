import type { PracticeLevel } from "../types/practice";
import { formatTime } from "../hooks/usePracticeSession";

interface PracticePanelProps {
  level: PracticeLevel;
  isPlaying: boolean;
  sessionRemainingSec: number;
  chordRemainingSec: number;
  chordsShown: number;
  missingChords: string[];
  onStart: () => void;
  onStop: () => void;
}

export function PracticePanel({
  level,
  isPlaying,
  sessionRemainingSec,
  chordRemainingSec,
  chordsShown,
  missingChords,
  onStart,
  onStop,
}: PracticePanelProps) {
  const canStart = missingChords.length === 0;

  return (
    <section className="w-full max-w-2xl rounded-xl border border-slate-800 bg-slate-900/60 p-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-white">{level.title}</h3>
          {level.description && (
            <p className="mt-1 text-sm text-slate-400">{level.description}</p>
          )}
        </div>
        <div className="text-right text-sm text-slate-400">
          <p>
            Időtartam:{" "}
            <span className="font-medium text-slate-200">
              {level.settings.totalMinutes} perc
            </span>
          </p>
          <p>
            Akkordonként:{" "}
            <span className="font-medium text-slate-200">
              {level.settings.chordDisplaySeconds} mp
            </span>
          </p>
        </div>
      </div>

      <p className="mt-3 text-sm text-slate-400">
        Akkordok:{" "}
        <span className="font-medium text-orange-300/90">
          {level.chords.join(" · ")}
        </span>
      </p>

      {missingChords.length > 0 && (
        <p className="mt-2 text-sm text-red-400">
          Hiányzó akkordok az adatbázisból: {missingChords.join(", ")}
        </p>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-3">
        {!isPlaying ? (
          <button
            type="button"
            onClick={onStart}
            disabled={!canStart}
            className="rounded-lg bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-900/30 transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-40"
          >
            ▶ Lejátszás
          </button>
        ) : (
          <button
            type="button"
            onClick={onStop}
            className="rounded-lg bg-slate-700 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-600"
          >
            ■ Stop
          </button>
        )}

        {isPlaying && (
          <div className="flex flex-wrap gap-4 text-sm text-slate-300">
            <span>
              Hátralévő:{" "}
              <strong className="text-white">
                {formatTime(sessionRemainingSec)}
              </strong>
            </span>
            <span>
              Következő akkord:{" "}
              <strong className="text-orange-400">{chordRemainingSec} mp</strong>
            </span>
            <span>
              Mutatva: <strong className="text-white">{chordsShown}</strong>
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
