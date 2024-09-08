import React, { useState, useEffect } from 'react';
import { z } from 'zod';

// Esquema de validación usando Zod
const matrixSchema = z.number().min(0, "El valor debe ser un número positivo");

interface MatrixInputProps {
  rows: number;
  cols: number;
  matrix: number[][];
  onChange: (i: number, j: number, value: number) => void;
  matrixName: string; 
}

const MatrixInput: React.FC<MatrixInputProps> = ({ rows, cols, matrix, onChange, matrixName }) => {
  const [errors, setErrors] = useState<string[][]>([]);

  // Inicializa errores con dimensiones correctas
  useEffect(() => {
    const initialErrors = Array.from({ length: rows }, () => Array(cols).fill(''));
    console.log('Inicializando errores:', initialErrors); // Verificación
    setErrors(initialErrors);
  }, [rows, cols]);

  const handleChange = (i: number, j: number, value: string) => {
    const parsedValue = parseFloat(value);

    if (value === '') {
      onChange(i, j, 0);
      return;
    }

    const parseResult = matrixSchema.safeParse(parsedValue);

    if (!parseResult.success) {
      const newErrors = [...errors];
      newErrors[i][j] = parseResult.error.errors[0].message;
      setErrors(newErrors);
    } else {
      const newErrors = [...errors];
      newErrors[i][j] = '';
      setErrors(newErrors);
      onChange(i, j, parsedValue);
    }
  };

  console.log('Errores actuales:', errors); // Verificación

  return (
    <div className="matrix-grid" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <React.Fragment key={rowIndex}>
          {Array.from({ length: cols }).map((_, colIndex) => (
            <div key={colIndex}>
              <input
                type="number"
                value={matrix[rowIndex][colIndex] === 0 ? '' : matrix[rowIndex][colIndex]}
                onChange={(e) => handleChange(rowIndex, colIndex, e.target.value)}
                aria-label={`input-${matrixName}-${rowIndex}-${colIndex}`} // Asegura que el nombre sea único

              />
              {errors[rowIndex] && errors[rowIndex][colIndex] && (
                <p style={{ color: 'red', fontSize: '0.8rem' }}>{errors[rowIndex][colIndex]}</p>
              )}
            </div>
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};

export default MatrixInput;
