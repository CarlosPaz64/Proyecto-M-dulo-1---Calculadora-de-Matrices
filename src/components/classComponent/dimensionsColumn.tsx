import React, { Component } from 'react';

// Definimos la interfaz DimensionsColumnProps que describe las props que recibirá el componente.
// En este caso, se espera una función llamada setMatrixSize que será pasada desde el componente padre.
interface DimensionsColumnProps {
  setMatrixSize: (rows: number, cols: number) => void;
}

// Definimos la interfaz DimensionsColumnState que describe el estado del componente.
// En este caso, manejamos el número de filas (rows) y columnas (cols) como parte del estado.
interface DimensionsColumnState {
  rows: number;
  cols: number;
}

// Creamos el componente de clase DimensionsColumn, que extiende `React.Component`.
class DimensionsColumn extends Component<DimensionsColumnProps, DimensionsColumnState> {

  constructor(props: DimensionsColumnProps) {
    super(props); // Llamada obligatoria a `super(props)` para heredar correctamente las props de React.Component
    this.state = {
      rows: 2, // Estado inicial para las filas (rows)
      cols: 2, // Estado inicial para las columnas (cols)
    };
  }

  // Este método maneja el cambio de filas. Cada vez que se cambia el valor en el input de filas,
  // actualizamos el estado local (rows) y llamamos a la función `setMatrixSize` del componente padre.
  handleRowChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rows = parseInt(e.target.value);
    this.setState({ rows }); // Actualiza el estado local con el nuevo valor de filas
    this.props.setMatrixSize(rows, this.state.cols); // Llama al método del padre para actualizar las dimensiones de la matriz
  };

  // Este método maneja el cambio de columnas. Cada vez que se cambia el valor en el input de columnas,
  // actualizamos el estado local (cols) y llamamos a la función `setMatrixSize` del componente padre.
  handleColChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cols = parseInt(e.target.value);
    this.setState({ cols }); // Actualiza el estado local con el nuevo valor de columnas
    this.props.setMatrixSize(this.state.rows, cols); // Llama al método del padre para actualizar las dimensiones de la matriz
  };

  // El método `render` es obligatorio en los componentes de clase.
  render() {
    const { rows, cols } = this.state; // Obtenemos los valores de `rows` y `cols` desde el estado local.

    return (
      <div className="dimensions-column-container">
        {/* Input para filas */}
        <label>
          Filas:
          <input
            type="number"
            value={rows} // El valor del input está enlazado al estado `rows`
            min={1}
            max={3}
            onChange={this.handleRowChange} // Cada vez que cambie el valor, llamamos a `handleRowChange`
          />
        </label>

        {/* Input para columnas */}
        <label>
          Columnas:
          <input
            type="number"
            value={cols} // El valor del input está enlazado al estado `cols`
            min={1}
            max={3}
            onChange={this.handleColChange} // Cada vez que cambie el valor, llamamos a `handleColChange`
          />
        </label>
      </div>
    );
  }
}

// Exportamos el componente para que pueda ser utilizado en otros archivos
export default DimensionsColumn;