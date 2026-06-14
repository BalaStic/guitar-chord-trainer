import { useMemo } from "react";
import type { ChordPosition } from "../types/chord";
import { STRING_COUNT } from "../lib/chordToPositions";

/** Felülről lefelé: vékony E → vastag E (szokásos tab sorrend) */
const STRING_LABELS = ["E", "H", "G", "D", "A", "E"] as const;

/** Húrnév és nyak-jelek (×, ○) — azonos megjelenés */
const STRING_LABEL_CLASS =
  "text-xl font-semibold leading-none tabular-nums";

/** Fehér bundjelölő pöttyök a G és D húr között */
const INLAY_FRETS: readonly number[] = [3, 5, 7, 9];
const DOUBLE_INLAY_FRET = 12;
const G_STRING_INDEX =
  STRING_COUNT - 1 - STRING_LABELS.indexOf("G");
const H_STRING_INDEX =
  STRING_COUNT - 1 - STRING_LABELS.indexOf("H");
const D_STRING_INDEX =
  STRING_COUNT - 1 - STRING_LABELS.indexOf("D");

function shouldShowInlay(stringIndex: number, fret: number): boolean {
  if (fret === DOUBLE_INLAY_FRET) {
    return stringIndex === H_STRING_INDEX || stringIndex === D_STRING_INDEX;
  }
  return stringIndex === G_STRING_INDEX && INLAY_FRETS.includes(fret);
}

export interface FretboardProps {
  fretCount?: number;
  positions?: ChordPosition[];
  barre?: number;
  className?: string;
}

export function Fretboard({
  fretCount = 12,
  positions = [],
  barre,
  className = "",
}: FretboardProps) {
  const strings = useMemo(
    () =>
      Array.from({ length: STRING_COUNT }, (_, i) => STRING_COUNT - 1 - i),
    [],
  );

  const positionMap = useMemo(() => {
    const map = new Map<string, ChordPosition>();
    for (const p of positions) {
      if (p.muted || p.open) {
        map.set(`s${p.stringIndex}-nut`, p);
      } else if (p.fret > 0) {
        map.set(`s${p.stringIndex}-f${p.fret}`, p);
      }
    }
    return map;
  }, [positions]);

  const fretNumbers = Array.from({ length: fretCount }, (_, i) => i + 1);

  return (
    <div
      className={`block w-full max-w-[118.8rem] rounded-2xl border border-amber-800/50 bg-gradient-to-b from-neck-light to-neck py-5 pl-2 pr-5 shadow-2xl shadow-black/60 ${className}`}
      role="img"
      aria-label="Gitárnyak diagram"
    >
      <div className="w-full overflow-x-auto">
        <div
          className="inline-grid w-full min-w-[105.6rem] gap-0"
          style={{
            gridTemplateColumns: `2.75rem 2.75rem repeat(${fretCount}, minmax(8.17rem, 1fr))`,
            gridTemplateRows: `3rem repeat(${STRING_COUNT}, 4rem)`,
          }}
        >
          {/* Sarok + bund feliratok */}
          <div />
          <div />
          {fretNumbers.map((n) => (
            <div
              key={`num-${n}`}
              className="flex items-end justify-center pb-1 text-xl font-semibold text-amber-200/80"
            >
              {n}
            </div>
          ))}

          {strings.map((stringIndex, row) => {
            const label = STRING_LABELS[row];
            const nutKey = `s${stringIndex}-nut`;
            const nutPos = positionMap.get(nutKey);
            const isEdgeString = row === 0 || row === STRING_COUNT - 1;

            return (
              <StringRowCells
                key={stringIndex}
                stringIndex={stringIndex}
                label={label}
                fretNumbers={fretNumbers}
                positionMap={positionMap}
                nutPos={nutPos}
                barre={barre}
                isEdgeString={isEdgeString}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

interface StringRowCellsProps {
  stringIndex: number;
  label: string;
  fretNumbers: number[];
  positionMap: Map<string, ChordPosition>;
  nutPos?: ChordPosition;
  barre?: number;
  isEdgeString: boolean;
}

function StringRowCells({
  stringIndex,
  label,
  fretNumbers,
  positionMap,
  nutPos,
  barre,
  isEdgeString,
}: StringRowCellsProps) {
  return (
    <>
      <div className={`flex items-center justify-end pr-1 ${STRING_LABEL_CLASS} text-amber-100`}>
        {label}
      </div>

      <div
        className={`relative flex items-center justify-center border-r-[3px] border-fret-wire ${STRING_LABEL_CLASS}`}
      >
        {nutPos?.muted && (
          <span className="text-slate-300" aria-label="némítva">
            X
          </span>
        )}
        {nutPos?.open && (
          <span className="text-emerald-400" aria-label="üres húr">
            ○
          </span>
        )}
      </div>

      {fretNumbers.map((fret, fretIdx) => {
        const pos = positionMap.get(`s${stringIndex}-f${fret}`);
        const isBarreFret = barre === fret;
        const barreContinues =
          isBarreFret &&
          !isEdgeString &&
          stringIndex > 0 &&
          stringIndex < STRING_COUNT - 1;

        return (
          <div
            key={fret}
            className="relative flex items-center justify-center"
          >
            {/* Bundfém (függőleges elválasztó) */}
            <div
              className="pointer-events-none absolute right-0 top-0 z-[1] h-full w-[2px] bg-fret-wire shadow-[0_0_4px_rgba(232,197,71,0.45)]"
              aria-hidden
            />

            {/* Húr */}
            <div className="pointer-events-none absolute inset-x-1 top-1/2 z-0 h-px bg-string/80" />

            {/* 1. bund bal oldali éle (nyak szélén) */}
            {fretIdx === 0 && (
              <div
                className="pointer-events-none absolute left-0 top-0 z-[1] h-full w-[3px] bg-fret-wire shadow-[0_0_4px_rgba(232,197,71,0.45)]"
                aria-hidden
              />
            )}

            {/* Bundjelölő (G–D, 12. bundon H–G + D–A) */}
            {shouldShowInlay(stringIndex, fret) && (
              <div
                className="pointer-events-none absolute bottom-0 left-1/2 z-[1] h-6 w-6 -translate-x-1/2 translate-y-1/2 rounded-full border border-white/40 bg-white shadow-[0_1px_4px_rgba(0,0,0,0.5)]"
                aria-hidden
              />
            )}

            {barreContinues && (
              <div className="absolute left-0 right-0 top-1/2 z-[1] h-3.5 -translate-y-1/2 rounded-full bg-orange-500" />
            )}

            {pos && !pos.muted && !pos.open && (
              <div
                className="relative z-[2] flex h-12 min-w-12 items-center justify-center rounded-full border-2 border-orange-200 bg-orange-500 px-1 text-sm font-bold leading-none text-white shadow-md"
                title={pos.note}
              >
                {pos.note ?? ""}
              </div>
            )}

            {isBarreFret && !pos && isEdgeString && (
              <div className="relative z-[2] h-12 w-12 rounded-full border-2 border-orange-200 bg-orange-500/80" />
            )}
          </div>
        );
      })}
    </>
  );
}
