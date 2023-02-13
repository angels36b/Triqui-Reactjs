import { WINNER_COMBOS } from "../constants"

export const checkWinnerFrom = (boardToCheck) => {
    //Revisamos y validamos las combinaciones ganadores
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo
      if (
        boardToCheck[a] &&
        boardToCheck[a] == boardToCheck[b] &&
        boardToCheck[a] == boardToCheck[c]
      ) {
        return boardToCheck[a]
      }
    }
    //si no hay ganador
    return null
  }

  export const checkEndGame = (newBoard) =>{
    //revisamos si hay un empate en el tablero

    return newBoard.every((square)=> square !== null) //si todas las newboard son diferentes de null - "X o O" ha terminado el juego
  }
