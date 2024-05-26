import kingSrc from "./assets/king.png";
import pawnSrc from "./assets/pawn.png";

type PieceProps = {
  image: string;
  alt: string;
};

function Piece({ image, alt }: PieceProps) {
  return (
    <img
      className="w-12 h-12 p-1 rounded-md shadow-md bg-gray-500/25"
      src={image}
      alt={alt}
      draggable="false"
    />
  );
}

export function King() {
  return <Piece image={kingSrc} alt="King" />;
}

export function Pawn() {
  return <Piece image={pawnSrc} alt="Pawn" />;
}
