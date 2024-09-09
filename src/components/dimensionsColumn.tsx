import React, { Component } from 'react';

interface DimensionsColumnProps {
  setMatrixSize: (rows: number, cols: number) => void;
}

interface DimensionsColumnState {
  rows: number;
  cols: number;
}

class DimensionsColumn extends Component<DimensionsColumnProps, DimensionsColumnState> {
  constructor(props: DimensionsColumnProps) {
    super(props);
    this.state = {
      rows: 2,
      cols: 2,
    };
  }

  handleRowChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ rows: parseInt(e.target.value) });
  };

  handleColChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ cols: parseInt(e.target.value) });
  };

  handleUpdateMatrixSize = () => {
    const { rows, cols } = this.state;
    this.props.setMatrixSize(rows, cols);
  };

  render() {
    const { rows, cols } = this.state;

    return (
      <div className="dimensions-column-container">
        {/* Input para filas */}
        <label>
          Filas:
          <input
            type="number"
            value={rows}
            min={1}
            max={3}
            onChange={this.handleRowChange}
          />
        </label>

        {/* Input para columnas */}
        <label>
          Columnas:
          <input
            type="number"
            value={cols}
            min={1}
            max={3}
            onChange={this.handleColChange}
          />
        </label>

        {/* Botón para actualizar el tamaño de la matriz */}
        <button onClick={this.handleUpdateMatrixSize}>Actualizar Matriz</button>
      </div>
    );
  }
}

export default DimensionsColumn;