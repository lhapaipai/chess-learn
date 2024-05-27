import { useEffect, useRef, useState } from "react";
import kingSrc from "./assets/king.png";
import pawnSrc from "./assets/pawn.png";
import { draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import clsx from "clsx";

type BasePieceProps = {
  location: Coord;
  pieceType: PieceType;
  image: string;
  alt: string;
};

function Piece({ location, pieceType, image, alt }: BasePieceProps) {
  const ref = useRef<HTMLImageElement>(null!);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const el = ref.current;

    return draggable({
      getInitialData: () => ({ location, pieceType }),
      element: el,
      onDragStart: () => setDragging(true),
      onDrop: () => setDragging(false),
    });
  }, [location, pieceType]);

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

interface PieceProps {
  location: Coord;
}

export function King({ location }: PieceProps) {
  return (
    <Piece image={kingSrc} alt="King" location={location} pieceType="king" />
  );
}

export function Pawn({ location }: PieceProps) {
  return (
    <Piece image={pawnSrc} alt="Pawn" location={location} pieceType="pawn" />
  );
}
