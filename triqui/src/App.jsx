import './App.css'
import { useState } from 'react'
import './index.css'


const TURNS = {
  X: 'x',
  O: 'o'
}



const Square = ({ children, isSelected, updateBoard, index }) => {

  const className = `square ${isSelected ? 'is-selected' : ''}`
  //llamar la version 

  const handleClick = () => {
    updateBoard(index)
  }

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}

const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

function App() {

  const [board, setBoard] = useState(Array(9).fill(null))

  const [turn, setTurn] = useState(TURNS.X)

  const [winner, setWinner] = useState(null) //null =no hay ganador - fale = hay ganador

  const checkWinner = (boardToCheck) => {

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

  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }


  const updateBoard = (index) => {
    //Bloqueamos la actualizacion de valor del index, cuando ya cuenta con un valos
    if (board[index]||winner) return

    const newBoard = [...board] //se pasa el array a un nuevo array (spread y rest operator) los estados se tratan siempre inmutable
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn = turn == TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    //revisamos si hay ganador
    const newWinner = checkWinner(newBoard)

    if (newWinner) {

      setWinner(newWinner)//actualiza el estado
      
    }
    //check if game is over


  }

  return (

    <main className='board'>
      <h1> Triqui </h1>
      <button> Reset del juego </button>
      <section className='game'>
        {
          board.map((_, index) => {
            return (

              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {board[index]}
              </Square>
            )
          })
        }
      </section>

      <section className='turn'>
        <Square isSelected={turn == TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn == TURNS.O}>
          {TURNS.O}
        </Square>
      </section>

      {
        winner ===! null && (
          <section className="winner">
            <div className="text">
              <h2>
                {winner == false ? 'Empate' : 'Gano:'}
              </h2>
              <header className='Win'>
                {winner && <Square> {winner} </Square>}
              </header>
              <footer>

                <button onClick={restGame}> Empezar de nuevo </button>

              </footer>
            </div>

          </section>
        )
      }
    </main>
  )
}

export default App
