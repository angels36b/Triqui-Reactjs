import './App.css'
import { useState } from 'react'
import './index.css'
import confetti from "canvas-confetti"
import { Square } from './components/Square'
import { TURNS} from './constants'
import { checkWinnerFrom } from './logic/board'
import { WinnerModal } from './components/Winner'


function App() {

  const [board, setBoard] = useState( ()=>{
    const boardFromStorage = window.localStorage.getItem('board')
    if(boardFromStorage) return JSON.parse(boardFromStorage)
    return Array(9).fill(null)
  })


  const [turn, setTurn] = useState( () => {
    const turnFromStorage = window.localStorage.getItem('turn') 
    return turnFromStorage ?? TURNS.X
  })

  const [winner, setWinner] = useState(null) //null =no hay ganador - fale = hay ganador

  
  const restGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
  }
 



  const updateBoard = (index) => {
    //Bloqueamos la actualizacion de valor del index, cuando ya cuenta con un valos
    if (board[index]||winner) return

    const newBoard = [...board] //se pasa el array a un nuevo array (spread y rest operator) los estados se tratan siempre inmutable
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn = turn == TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    //guardamos partida
    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', turn)
    
    //revisamos si hay ganador

    const newWinner = checkWinnerFrom(newBoard)

    if (newWinner) {
      confetti(),
      setWinner(newWinner)//actualiza el estado
      
    }else if (checkEndGame(newBoard)) {
      setWinner(false)
    }
    //check if game is over


  }

  return (

    <main className='board'>
      <h1> Triqui </h1>
      <button onClick={restGame}> Reset del juego </button>
      <section className='game'>
        {
          board.map((square, index) => {
            return (

              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {square}
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

      <WinnerModal restGame = {restGame} winner={winner} />
    </main>
  )
}

export default App
