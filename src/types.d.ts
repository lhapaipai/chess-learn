type Coord = [number, number];
type PieceType = "king" | "pawn";

type PieceRecord = {
  type: PieceType;
  location: Coord;
};
