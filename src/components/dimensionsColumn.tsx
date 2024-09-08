import React, { useState } from 'react'; // Asegúrate de importar useState

const DimensionsColumn: React.FC<{
  setMatrixSize: (rows: number, cols: number) => void;
}> = ({ setMatrixSize }) => {
  const [rows, setRows] = useState(2);
  const [cols, setCols] = useState(2);

  return (
    <div>
      <label>
        Filas:
        <input
          type="number"
          value={rows}
          min={1}
          max={3}
          onChange={(e) => setRows(parseInt(e.target.value))}
        />
      </label>
      <label>
        Columnas:
        <input
          type="number"
          value={cols}
          min={1}
          max={3}
          onChange={(e) => setCols(parseInt(e.target.value))}
        />
      </label>
      <button onClick={() => setMatrixSize(rows, cols)}>Actualizar Matriz</button>
    </div>
  );
};

export default DimensionsColumn;
