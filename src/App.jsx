import { useState } from 'react'
import confetti from 'canvas-confetti'

//componentes
import { Square } from './components/Square'
import { TURNS } from './constants'
import { checkWinnerFrom } from './logic/board'
import { WinnerModal } from './components/WinnerModal'


function App() {

  /* Se utiliza para tene un estado inicla de 9 poisicones 
   y fuera de eso se pone que inica en null */
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    if(boardFromStorage) return JSON.parse(boardFromStorage)
    return  Array(9).fill(null)
    
   })

    //este estado es para cambiar y poner de estado
    //inicial el turno de las X
    const [turn, setTurn] = useState(() => {
      const turnFromStorage = window.localStorage.getItem('turn')
      return turnFromStorage ?? TURNS.X      
    })
      
    //aqui vamos a crear un estado para 
    //cuando haya un ganador.
    /*utilizamos el null para cuando no hay ganador, false cuando hay un empate
    y el true cuando hay una gandor */
    const [winner, setWinner] = useState(null)


    // Aquie reseteamos de nuevo el juego sin que recarguemos 
    // de nuevo la pagina
    const resetGame = () => {
      setBoard(Array(9).fill(null))
      setTurn(TURNS.O)
      setWinner(null)

      //aqui resetemaos el local storage
      window.localStorage.removeItem('board')
      window.localStorage.removeItem('turn')

    }

    const checkEndGame = (newBoard) => {
      /* Revisamos si hay una empate 
      si no hay mas aspectos vacios 
      en el tablero */
      return newBoard.every((square) => square !== null)
    }

    const updateBoard = (index) => {

      /* NO actualiza la posicion si ya tiene algo */
      if(board[index] || winner) return

      /* Lo que significa es que con esto se le va a guadar
      en el newBoard el indice en el cual el usuario a dado el click
       que puede ser X u O.*/
      const newBoard = [...board]
      newBoard[index] = turn
      //con esta linea actualizarioamos el board.
      setBoard(newBoard);

      //esto quiere decir que si el turno es de las X despues parsara
      //hacer turno de las O.
       const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X

       /*ahora le pasamos el setTurn para poder cambiar de estado
       cada vez que se le de click al square */
       setTurn(newTurn);

       //vamos a guardar la partida en local storage
       window.localStorage.setItem('board', JSON.stringify(newBoard))
       window.localStorage.setItem('turn', newTurn)

       //vamos a revisar si tenemos una ganador.
       const newWinner = checkWinnerFrom(newBoard)
       if (newWinner){
        //esto sirve ue cuanado alla un ganador salga el confetti
        confetti()
        setWinner(newWinner)
        //esto lo que hace es que revisa si ha habido aldun ganador
       }else if (checkEndGame(newBoard)) {
        setWinner(false);
       }
    }

  return(

    //la etiqueta main es el tablero 
    <main className='board'>

      <h1>Tic tac toe</h1>

      <button onClick={resetGame}>Reset of Game</button>

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
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

        <WinnerModal resetGame={resetGame} winner={winner}/>

    </main>
  )
}

export default App
