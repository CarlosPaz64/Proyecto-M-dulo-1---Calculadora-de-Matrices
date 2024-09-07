import React, { ChangeEvent, ReactNode, useState } from 'react';
import { z } from 'zod';

const matrixSchema = z.number().min(0, "El valor debe ser un número positivo");

interface MatrixInputProps {
  size: number;
  matrix: number[][];
  onChange: (i: number, j: number, value: number) => void;
  ariaLabelPrefix: string;
  children?: ReactNode;
}

const MatrixInput: React.FC<MatrixInputProps> = ({ size, matrix, onChange, ariaLabelPrefix, children }) => {
  const [inputValues, setInputValues] = useState<string[][]>(
    matrix.map(row => row.map(value => value === 0 ? "" : value.toString()))
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>, i: number, j: number) => {
    const value = e.target.value;

    const validation = matrixSchema.safeParse(value === "" ? 0 : parseFloat(value));

    if (validation.success) {
      // Actualizamos el valor temporal en el input
      const newInputValues = [...inputValues];
      newInputValues[i][j] = value; // Mantener "" temporalmente en el input
      setInputValues(newInputValues);

      // Actualizamos el estado principal de la matriz con 0 si el campo está vacío
      onChange(i, j, value === "" ? 0 : parseFloat(value));
    } else {
      console.error("Valor inválido:", validation.error.issues);
    }
  };

  return (
    <div>
      {Array.from({ length: size }).map((_, i) => (
        <div key={i}>
          {Array.from({ length: size }).map((_, j) => (
            <input
              key={j}
              type="number"
              aria-label={`${ariaLabelPrefix}-${i}-${j}`}
              value={inputValues[i][j]} // El valor es la cadena que se muestra en el input
              onChange={(e) => handleInputChange(e, i, j)}
            />
          ))}
        </div>
      ))}
      {children && <div>{children}</div>}
    </div>
  );
};

export default MatrixInput;
