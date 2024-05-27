import { ReactElement } from "react";
import { King, Pawn } from "./Pieces";
import { isEqualCoord } from "./util";
import { Square } from "./Square";

const pieceLookup: {
  [Key in PieceType]: (location: Coord) => ReactElement;
} = {
  king: (location) => <King location={location} />,
  pawn: (location) => <Pawn location={location} />,
};

function renderSquares(pieces: PieceRecord[]) {
  const squares = [];
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const squareCoord: Coord = [row, col];
      const piece = pieces.find((piece) =>
        isEqualCoord(piece.location, squareCoord)
      );

      squares.push(
        <Square key={`${row}-${col}`} location={squareCoord} pieces={pieces}>
          {piece && pieceLookup[piece.type](squareCoord)}
        </Square>
      );
    }
  }
  return squares;
}

function App() {
  const pieces: PieceRecord[] = [
    { type: "king", location: [3, 2] },
    { type: "pawn", location: [1, 6] },
  ];

  return (
    <div className="grid grid-cols-8 grid-rows-8 w-[500px] h-[500px] border-2 border-gray-200">
      {renderSquares(pieces)}
    </div>
  );
}

export default App;
