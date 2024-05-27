import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import clsx from "clsx";
import { ReactNode, useEffect, useRef, useState } from "react";
import { canMove, isCoord, isPieceType } from "./util";

type SquareProps = {
  pieces: PieceRecord[];
  location: Coord;
  children: ReactNode;
};

type HoveredState = "idle" | "validMove" | "invalidMove";

function getBgColor(state: HoveredState, isDark: boolean): string {
  if (state === "validMove") {
    return "bg-green-300";
  } else if (state === "invalidMove") {
    return "bg-red-300";
  }

  return isDark ? "bg-gray-200" : "bg-gray-50";
}

export function Square({ location, children, pieces }: SquareProps) {
  const ref = useRef<HTMLDivElement>(null!);
  const [state, setState] = useState<HoveredState>("idle");

  useEffect(() => {
    const el = ref.current;

    return dropTargetForElements({
      element: el,
      onDragEnter: ({ source }) => {
        // source is the draggable element (the piece being dragged)
        if (
          !isCoord(source.data.location) ||
          !isPieceType(source.data.pieceType)
        ) {
          return;
        }

        if (
          canMove(source.data.location, location, source.data.pieceType, pieces)
        ) {
          setState("validMove");
        } else {
          setState("invalidMove");
        }
      },
      onDragLeave: () => setState("idle"),
      onDrop: () => setState("idle"),
    });
  }, [location, pieces]);

  const [row, col] = location;
  const isDark = (row + col) % 2 === 1;

  return (
    <div
      ref={ref}
      className={clsx(
        "w-full h-full flex items-center justify-center",
        getBgColor(state, isDark)
      )}
    >
      {children}
    </div>
  );
}
