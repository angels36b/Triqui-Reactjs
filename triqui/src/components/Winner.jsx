import { Square } from "./Square"

export function WinnerModal ({winner, restGame}) 
    {
        if (winner == null) return null

        const winnerText = winner ==false ? 'Empate' : 'Gano'
        return(
      
          <section className="winner">
            <div className="text">
              <h2>
                {winnerText}
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
