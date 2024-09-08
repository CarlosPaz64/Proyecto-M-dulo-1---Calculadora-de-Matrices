import React, { Component } from 'react';

// Definimos la interfaz DimensionsColumnProps para describir las props que el componente recibirá.
// En este caso, la función `setMatrixSize` se pasará como prop para ajustar el tamaño de la matriz.
interface DimensionsColumnProps {
  setMatrixSize: (rows: number, cols: number) => void;
}

// Definimos la interfaz DimensionsColumnState para describir el estado del componente.
// En este caso, el componente mantendrá `rows` y `cols` en su estado.
interface DimensionsColumnState {
  rows: number;
  cols: number;
}

// Aquí creamos un componente de clase que extiende `React.Component`.
// Utilizamos la estructura `Component<props, state>` donde le pasamos las interfaces correspondientes.
class DimensionsColumn extends Component<DimensionsColumnProps, DimensionsColumnState> {
  // El constructor inicializa el estado y recibe `props` del padre.
  // Un componente de clase siempre tiene un constructor que llama a `super(props)` para heredar de `Component`.
  constructor(props: DimensionsColumnProps) {
    super(props); // Llamamos a `super(props)` para que la clase padre `Component` reciba las props.
    
    // Inicializamos el estado del componente con los valores predeterminados de `rows` y `cols`.
    this.state = {
      rows: 2, // Inicializamos el número de filas con 2.
      cols: 2, // Inicializamos el número de columnas con 2.
    };
  }

  // Este método maneja el evento de cambio en el input de filas.
  // Actualiza el estado de `rows` con el valor que se introduce en el input.
  handleRowChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ rows: parseInt(e.target.value) });
  };

  // Este método maneja el evento de cambio en el input de columnas.
  // Actualiza el estado de `cols` con el valor que se introduce en el input.
  handleColChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ cols: parseInt(e.target.value) });
  };

  // Este método llama a la función `setMatrixSize` que viene como prop.
  // Usa los valores del estado (`rows` y `cols`) para actualizar el tamaño de la matriz en el componente padre.
  handleUpdateMatrixSize = () => {
    const { rows, cols } = this.state; // Extraemos `rows` y `cols` del estado.
    this.props.setMatrixSize(rows, cols); // Llamamos a la función prop `setMatrixSize` y le pasamos las filas y columnas.
  };

  // El método `render` es obligatorio en todos los componentes de clase.
  // Se encarga de definir qué renderizar en el DOM.
  render() {
    const { rows, cols } = this.state; // Obtenemos los valores de `rows` y `cols` del estado.

    return (
      <div>
        {/* Input para filas */}
        <label>
          Filas:
          <input
            type="number"
            value={rows} // El valor del input se basa en el estado `rows`.
            min={1}
            max={3}
            onChange={this.handleRowChange} // Llama a `handleRowChange` cuando se cambia el valor del input.
          />
        </label>

        {/* Input para columnas */}
        <label>
          Columnas:
          <input
            type="number"
            value={cols} // El valor del input se basa en el estado `cols`.
            min={1}
            max={3}
            onChange={this.handleColChange} // Llama a `handleColChange` cuando se cambia el valor del input.
          />
        </label>

        {/* Botón que actualiza el tamaño de la matriz al hacer clic. */}
        <button onClick={this.handleUpdateMatrixSize}>Actualizar Matriz</button>
      </div>
    );
  }
}

// Exportamos el componente para poder utilizarlo en otros archivos.
export default DimensionsColumn;