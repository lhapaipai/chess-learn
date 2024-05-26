import { ReactElement } from "react";
import { King, Pawn } from "./Pieces";
import { isEqualCoord } from "./util";
import clsx from "clsx";

const pieceLookup: {
  [Key in PieceType]: () => ReactElement;
} = {
  king: () => <King />,
  pawn: () => <Pawn />,
};

function renderSquares(pieces: PieceRecord[]) {
  const squares = [];
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const squareCoord: Coord = [row, col];
      const piece = pieces.find((piece) =>
        isEqualCoord(piece.location, squareCoord)
      );

      const isDark = (row + col) % 2 === 1;

      squares.push(
        <div
          key={`${row}-${col}`}
          className={clsx(
            "w-full h-full flex items-center justify-center",
            isDark ? "bg-gray-200" : "bg-gray-50"
          )}
        >
          {piece && pieceLookup[piece.type]()}
        </div>
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
