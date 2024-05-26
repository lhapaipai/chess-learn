import { useEffect, useRef, useState } from "react";
import kingSrc from "./assets/king.png";
import pawnSrc from "./assets/pawn.png";
import { draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import clsx from "clsx";

type PieceProps = {
  image: string;
  alt: string;
};

function Piece({ image, alt }: PieceProps) {
  const ref = useRef<HTMLImageElement>(null!);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const el = ref.current;

    return draggable({
      element: el,
      onDragStart: () => setDragging(true),
      onDrop: () => setDragging(false),
    });
  }, []);

  return (
    <img
      className={clsx(
        "w-12 h-12 p-1 rounded-md shadow-md hover:bg-gray-500/25",
        dragging && "opacity-40"
      )}
      src={image}
      alt={alt}
      ref={ref}
    />
  );
}

export function King() {
  return <Piece image={kingSrc} alt="King" />;
}

export function Pawn() {
  return <Piece image={pawnSrc} alt="Pawn" />;
}
