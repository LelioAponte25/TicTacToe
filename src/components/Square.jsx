/* Aqui tenemos las props que se le pasara a las funciones */
export const Square = ({children, isSelected, updateBoard, index}) => {
    const className = `square ${isSelected ? 'is-selected' : '' }`
  
    //un envento que se le dara a un boton para ue cambie de estado
    const handleClick = () => {
  
      /* Esto lo que hace es actualizar el turno cada
      vez que yo le de click en el Square ya que se le esta pasando la
      funcion. */
      updateBoard(index)
    }
  
    return (
      <div onClick={handleClick} className={className}>
        {children}
      </div>
    )
  }