import React, { useState, useEffect, ReactNode } from 'react'; // Llamada a useEffect y React Node
import { z } from 'zod';

// Esquema de validación usando Zod para aceptar cualquier número (negativo o positivo)
const matrixSchema = z.number().refine((val) => !isNaN(val), {
  message: "El valor debe ser un número válido",
});

interface MatrixInputProps {
  rows?: number;  // Opcional, pero manejado en MatrixCalculator
  cols?: number;  // Opcional, pero manejado en MatrixCalculator
  matrix: number[][];
  onChange: (i: number, j: number, value: number) => void;   // Función para actualizar el valor de una celda 
  matrixName: string;
  children?: ReactNode;  // Children opcional
}

const MatrixInput: React.FC<MatrixInputProps> = ({
  rows = 2,
  cols = 2,
  matrix,
  onChange,
  matrixName,
  children,
}) => {
  const [errors, setErrors] = useState<string[][]>([]);
  const [inputValues, setInputValues] = useState<string[][]>(
    matrix.map(row => row.map(value => value.toString())) // Inicializamos los valores como cadenas de texto
  );

  // Inicializa errores y valores de input con dimensiones correctas
  useEffect(() => {
    // Aquí preservamos los valores actuales si cambian las dimensiones
    setInputValues(prevValues => {
      const newValues = Array.from({ length: rows }, (_, i) =>
        Array.from({ length: cols }, (_, j) => prevValues[i]?.[j] ?? '')); // Mantener valores previos o llenar con ''
      return newValues;
    });

    // También inicializamos los errores
    const initialErrors = Array.from({ length: rows }, () => Array(cols).fill(''));
    setErrors(initialErrors);
  }, [rows, cols, matrix]);

  const handleChange = (i: number, j: number, value: string) => {
    setInputValues(prev => {
      const newValues = [...prev];
      newValues[i][j] = value;
      return newValues;
    });

    // Permitir que el campo quede vacío cuando el usuario lo edite
    if (value === '') {
      const newErrors = [...errors];
      newErrors[i][j] = '';
      setErrors(newErrors);
      return;
    }

    const parsedValue = parseFloat(value);
    const parseResult = matrixSchema.safeParse(parsedValue);

    if (!parseResult.success) {
      const newErrors = [...errors];
      newErrors[i][j] = parseResult.error.errors[0].message;
      setErrors(newErrors);
    } else {
      const newErrors = [...errors];
      newErrors[i][j] = '';
      setErrors(newErrors);
      onChange(i, j, parsedValue); // Llamamos a la función de cambio solo cuando el valor es válido
    }
  };

  return (
    <div>
      <div className="matrix-grid" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <React.Fragment key={rowIndex}>
            {Array.from({ length: cols }).map((_, colIndex) => (
              <div key={colIndex}>
                <input
                  type="number" // Cambiamos el tipo de input a "text" para permitir valores vacíos
                  value={inputValues[rowIndex]?.[colIndex] ?? ''} // Mostramos el valor como cadena de texto
                  onChange={(e) => handleChange(rowIndex, colIndex, e.target.value)}
                  aria-label={`input-${matrixName}-${rowIndex}-${colIndex}`}
                />
                {errors[rowIndex] && errors[rowIndex][colIndex] && (
                  <p style={{ color: 'red', fontSize: '0.8rem' }}>{errors[rowIndex][colIndex]}</p>
                )}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
      {children && <div>{children}</div>}
    </div>
  );
};

export default MatrixInput;