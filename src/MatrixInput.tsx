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
// Creación de un componente funcional llamando a la anterior interfaz y manejando sus valores
const MatrixInput: React.FC<MatrixInputProps> = ({
  rows = 2,  // Valor por defecto si no se pasa desde MatrixCalculator
  cols = 2,  // Valor por defecto si no se pasa desde MatrixCalculator
  matrix,
  onChange,
  matrixName,
  children,
}) => {
  const [errors, setErrors] = useState<string[][]>([]);

  // Inicializa errores con dimensiones correctas
  useEffect(() => { // Hook de useEffect
    const initialErrors = Array.from({ length: rows }, () => Array(cols).fill(''));
    console.log('Inicializando errores:', initialErrors); // Depuración
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

  return (
    <div>
      <div className="matrix-grid" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <React.Fragment key={rowIndex}>
            {Array.from({ length: cols }).map((_, colIndex) => (
              <div key={colIndex}>
                <input
                  type="number"
                  value={matrix[rowIndex][colIndex] === 0 ? '' : matrix[rowIndex][colIndex]}
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
      {children && <div>{children}</div>}  {/* Renderiza `children` si se pasa */}
    </div>
  );
};

export default MatrixInput;