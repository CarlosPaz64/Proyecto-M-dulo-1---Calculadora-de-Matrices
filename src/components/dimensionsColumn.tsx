import React, { Component } from 'react';

// Interfaz que define las props que el componente recibirá
interface DimensionsColumnProps {
  setMatrixSize: (rows: number, cols: number) => void; // Función que el componente padre pasa para actualizar el tamaño de la matriz
}

// Interfaz que define el estado del componente
interface DimensionsColumnState {
  rows: number; // Cantidad de filas en la matriz
  cols: number; // Cantidad de columnas en la matriz
}

// Componente de clase DimensionsColumn
// Este es un componente de clase porque extiende de `React.Component` y usa `state` y `props`.
// Los componentes de clase permiten manejar el estado de una manera más explícita y hacen uso del ciclo de vida de React.
class DimensionsColumn extends Component<DimensionsColumnProps, DimensionsColumnState> {
  // El constructor es donde inicializamos el estado y recibimos las props que vienen del componente padre.
  // Es necesario usar `super(props)` para llamar al constructor de la clase `Component`.
  constructor(props: DimensionsColumnProps) {
    super(props); // Llamada al constructor padre `Component`
    this.state = {
      rows: 2, // Estado inicial de las filas (2)
      cols: 2, // Estado inicial de las columnas (2)
    };
  }

  // Este método maneja los cambios en el input de filas.
  // `setState` actualiza el estado local del componente cuando el valor de las filas cambia.
  handleRowChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ rows: parseInt(e.target.value) });
  };

  // Este método maneja los cambios en el input de columnas.
  // `setState` actualiza el estado local del componente cuando el valor de las columnas cambia.
  handleColChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ cols: parseInt(e.target.value) });
  };

  // Este método llama a la función `setMatrixSize` que fue pasada como prop.
  // Utiliza los valores actuales de `rows` y `cols` almacenados en el estado para actualizar el tamaño de la matriz en el componente padre.
  handleUpdateMatrixSize = () => {
    const { rows, cols } = this.state; // Extraemos `rows` y `cols` del estado
    this.props.setMatrixSize(rows, cols); // Llamada a la función prop para actualizar el tamaño de la matriz
  };

  // El método `render` es obligatorio en un componente de clase.
  // Define qué elementos se van a renderizar en el DOM y se actualiza cuando cambia el estado o las props.
  render() {
    const { rows, cols } = this.state; // Obtenemos los valores del estado para mostrarlos en los inputs

    return (
      <div className="dimensions-column-container">
        {/* Input para filas */}
        <label>
          Filas:
          <input
            type="number"
            value={rows} // El valor del input se enlaza al estado `rows`
            min={1}
            max={3}
            onChange={this.handleRowChange} // Llama a `handleRowChange` cuando cambia el valor del input
          />
        </label>

        {/* Input para columnas */}
        <label>
          Columnas:
          <input
            type="number"
            value={cols} // El valor del input se enlaza al estado `cols`
            min={1}
            max={3}
            onChange={this.handleColChange} // Llama a `handleColChange` cuando cambia el valor del input
          />
        </label>

        {/* Botón para actualizar el tamaño de la matriz */}
        <button onClick={this.handleUpdateMatrixSize}>Actualizar Matriz</button>
      </div>
    );
  }
}

export default DimensionsColumn;