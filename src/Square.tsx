import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import clsx from "clsx";
import { ReactNode, useEffect, useRef, useState } from "react";

type SquareProps = {
  location: Coord;
  children: ReactNode;
};

function getBgColor(isDraggedOver: boolean, isDark: boolean): string {
  if (isDraggedOver) {
    return "bg-blue-300";
  }

  return isDark ? "bg-gray-200" : "bg-gray-50";
}

export function Square({ location, children }: SquareProps) {
  const ref = useRef<HTMLDivElement>(null!);
  const [isDraggedOver, setIsDraggedOver] = useState(false);

  useEffect(() => {
    const el = ref.current;

    return dropTargetForElements({
      element: el,
      onDragEnter: () => setIsDraggedOver(true),
      onDragLeave: () => setIsDraggedOver(false),
      onDrop: () => setIsDraggedOver(false),
    });
  }, []);

  const [row, col] = location;
  const isDark = (row + col) % 2 === 1;

  return (
    <div
      ref={ref}
      className={clsx(
        "w-full h-full flex items-center justify-center",
        getBgColor(isDraggedOver, isDark)
      )}
    >
      {children}
    </div>
  );
}
