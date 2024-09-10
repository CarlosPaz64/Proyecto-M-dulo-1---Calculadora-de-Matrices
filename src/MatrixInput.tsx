import React, { useState, useEffect, ReactNode } from 'react'; // Llamada a useState, useEffect y ReactNode
import { z } from 'zod';

// Esquema de validación usando Zod para aceptar cualquier número (negativo o positivo)
const matrixSchema = z.number().refine((val) => !isNaN(val), {
  message: "El valor debe ser un número válido",  // Mensaje de error si el valor no es un número
});

interface MatrixInputProps {
  rows?: number;  // Prop opcional para las filas, puede manejarse desde MatrixCalculator
  cols?: number;  // Prop opcional para las columnas, puede manejarse desde MatrixCalculator
  matrix: number[][];  // El estado de la matriz actual
  onChange: (i: number, j: number, value: number) => void;   // Función para actualizar el valor de una celda 
  matrixName: string; // Nombre de la matriz (A o B) que se usará para etiquetar los inputs
  children?: ReactNode;  // Children opcional que permite renderizar contenido adicional dentro del componente
}

// Este es un componente funcional porque es una función que devuelve JSX.
// Utilizamos React.FC para definir que es un componente funcional, lo cual es adecuado cuando no necesitamos métodos de ciclo de vida complejos ni un estado manejado de manera compleja como en los componentes de clase.
const MatrixInput: React.FC<MatrixInputProps> = ({
  rows = 2,  // Valor por defecto si no se pasan `rows` desde MatrixCalculator
  cols = 2,  // Valor por defecto si no se pasan `cols` desde MatrixCalculator
  matrix,  // La matriz actual que se pasa como prop
  onChange, // Función que se llama cuando hay un cambio en los valores de las celdas
  matrixName,  // El nombre de la matriz (A o B)
  children,  // Children opcional que permite incluir elementos adicionales desde el componente padre
}) => {
  // `useState` es un hook de React que nos permite manejar el estado en componentes funcionales.
  const [errors, setErrors] = useState<string[][]>([]); // Estado para manejar los mensajes de error
  const [inputValues, setInputValues] = useState<string[][]>(
    matrix.map(row => row.map(value => value.toString())) // Inicializamos los valores como cadenas de texto para los inputs
  );

  // `useEffect` es otro hook de React que se ejecuta después de que el componente ha sido renderizado.
  // En este caso, se usa para inicializar los valores de los inputs y los errores cada vez que cambian las dimensiones (rows y cols).
  useEffect(() => {
    setInputValues(prevValues => {
      // Si las dimensiones cambian, actualizamos los valores manteniendo los anteriores cuando sea posible
      const newValues = Array.from({ length: rows }, (_, i) =>
        Array.from({ length: cols }, (_, j) => prevValues[i]?.[j] ?? '') // Si no hay valores previos, se rellena con ''
      );
      return newValues;
    });

    // Inicializamos los errores también para las nuevas dimensiones
    const initialErrors = Array.from({ length: rows }, () => Array(cols).fill(''));
    setErrors(initialErrors);
  }, [rows, cols, matrix]); // Se ejecuta cuando cambian `rows`, `cols` o `matrix`

  // Esta función maneja los cambios en los inputs cuando el usuario introduce valores.
  // Actualiza el estado de los inputs y verifica si el valor es válido utilizando Zod.
  const handleChange = (i: number, j: number, value: string) => {
    // Actualizamos el estado de los inputs con el nuevo valor
    setInputValues(prev => {
      const newValues = [...prev];
      newValues[i][j] = value;
      return newValues;
    });

    // Permitimos que el campo quede vacío cuando el usuario lo edite
    if (value === '') {
      const newErrors = [...errors];
      newErrors[i][j] = ''; // Si está vacío, no se muestra ningún error
      setErrors(newErrors);
      return;
    }

    // Convertimos el valor a número y validamos si es correcto usando Zod
    const parsedValue = parseFloat(value);
    const parseResult = matrixSchema.safeParse(parsedValue);  // Validamos el número

    if (!parseResult.success) {
      // Si la validación falla, mostramos el mensaje de error
      const newErrors = [...errors];
      newErrors[i][j] = parseResult.error.errors[0].message; // Error de Zod
      setErrors(newErrors);
    } else {
      // Si la validación es exitosa, limpiamos el error y llamamos a la función onChange para actualizar el valor de la matriz en el componente padre
      const newErrors = [...errors];
      newErrors[i][j] = ''; // No hay errores
      setErrors(newErrors);
      onChange(i, j, parsedValue); // Llamamos a la función `onChange` para actualizar el valor en MatrixCalculator
    }
  };

  // JSX que se devuelve para renderizar el componente. 
  // Es un componente funcional que no requiere ciclo de vida avanzado ni acceso a métodos del ciclo de vida, lo que lo hace más ligero y fácil de mantener.
  return (
    <div>
      {/* Grid para alinear los inputs como una matriz */}
      <div className="matrix-grid" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <React.Fragment key={rowIndex}>
            {Array.from({ length: cols }).map((_, colIndex) => (
              <div key={colIndex}>
                <input
                  type="number"  // Usamos inputs de tipo número para aceptar solo números
                  value={inputValues[rowIndex]?.[colIndex] ?? ''} // Mostramos el valor actual del input
                  onChange={(e) => handleChange(rowIndex, colIndex, e.target.value)}  // Llamamos a handleChange cuando el valor cambia
                  aria-label={`input-${matrixName}-${rowIndex}-${colIndex}`} // Etiqueta única para accesibilidad
                />
                {/* Si hay un error para este input, lo mostramos debajo */}
                {errors[rowIndex] && errors[rowIndex][colIndex] && (
                  <p style={{ color: 'red', fontSize: '0.8rem' }}>{errors[rowIndex][colIndex]}</p>
                )}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>

      {/* Renderizamos children solo si son proporcionados */}
      {/* `children` es opcional y permite que el componente padre incluya contenido adicional dentro del componente MatrixInput */}
      {children && <div>{children}</div>}
    </div>
  );
};

export default MatrixInput;