import React, { useState } from 'react'; 
import MatrixInput from '../functionalComponent/MatrixInput';
import { sumMatrices, subtractMatrices, multiplyMatrices, invertMatrix, determinant } from '../operationsFunctions/operationsCalculator';
import DimensionsColumn from '../classComponent/dimensionsColumn';
import { floatToFraction } from '../operationsFunctions/floatToFraction';
import './Calculadora.css';

const MatrixCalculator: React.FC = () => {
  const [matrixA, setMatrixA] = useState<number[][]>([[0, 0], [0, 0]]);
  const [matrixB, setMatrixB] = useState<number[][]>([[0, 0], [0, 0]]);
  const [matrixSize, setMatrixSize] = useState<{ rows: number; cols: number }>({ rows: 2, cols: 2 });
  const [operation, setOperation] = useState<string>('suma');
  const [resultMatrix, setResultMatrix] = useState<number[][] | null>(null);
  const [determinantValue, setDeterminant] = useState<number | null>(null);
  const [inverseMatrix, setInverseMatrix] = useState<number[][] | null>(null);
  const [warningMessage, setWarningMessage] = useState<string | null>(null);

  const updateMatrixSize = (rows: number, cols: number) => {
    if (rows < 1 || rows > 3 || cols < 1 || cols > 3) {
        setWarningMessage('Las dimensiones de la matriz deben ser entre 1 y 3.');
        return;
    }

    setWarningMessage(null);

    // Crear nuevas matrices con las nuevas dimensiones.
    // Si la matriz anterior tiene valores, los mantendremos en los nuevos límites, si son mayores
    const newMatrixA = Array.from({ length: rows }, (_, i) => 
        Array.from({ length: cols }, (_, j) => matrixA[i]?.[j] ?? 0)  // Mantener valores anteriores si existen
    );
    const newMatrixB = Array.from({ length: rows }, (_, i) => 
        Array.from({ length: cols }, (_, j) => matrixB[i]?.[j] ?? 0)  // Mantener valores anteriores si existen
    );

    setMatrixSize({ rows, cols });

    // Actualizamos con las matrices ajustadas, manteniendo valores anteriores cuando corresponda
    setMatrixA(newMatrixA);
    setMatrixB(newMatrixB);
};

  const handleMatrixChange = (i: number, j: number, value: number, matrixType: 'A' | 'B') => {
    const newMatrix = matrixType === 'A' ? [...matrixA] : [...matrixB];
    newMatrix[i][j] = value;
    if (matrixType === 'A') {
      setMatrixA(newMatrix);
    } else {
      setMatrixB(newMatrix);
    }
  };

  const handleOperation = () => {
    let result: { result: number[][] | null; determinant: number | null; inverse: number[][] | null } | null = null;

    if (operation === 'suma') {
        result = sumMatrices([...matrixA], [...matrixB]); // Copia de los arrays
    } else if (operation === 'resta') {
        result = subtractMatrices([...matrixA], [...matrixB]); // Copia de los arrays
    } else if (operation === 'multiplicacion') {
        if (matrixA[0].length !== matrixB.length) {
            setWarningMessage('Las dimensiones de las matrices no son compatibles para la multiplicación');
            return;
        } else {
            setWarningMessage(null);
            result = multiplyMatrices([...matrixA], [...matrixB]); // Copia de los arrays
        }
    } else if (operation === 'inversa') {
        if (matrixSize.rows !== matrixSize.cols) {
            setWarningMessage('La matriz debe ser cuadrada para calcular la inversa');
            return;
        } else {
            setWarningMessage(null);
            const inversa = invertMatrix([...matrixA]); // Copia de los arrays
            const determinante = determinant([...matrixA]); // Copia de los arrays
            if (!inversa) {
                setWarningMessage('La matriz no tiene inversa (determinante es 0)');
                return;
            }
            result = { result: inversa, determinant: determinante, inverse: inversa };
        }
    }

    if (result && result.result) {
        setResultMatrix(result.result);
        setDeterminant(result.determinant ?? null);
        setInverseMatrix(result.inverse ?? null);
    } else {
        setResultMatrix(null);
        setDeterminant(null);
        setInverseMatrix(null);
    }
};


  return (
    <section className="articles">
      <article>
        <div className="article-body">
          <DimensionsColumn setMatrixSize={updateMatrixSize} />

          {warningMessage && <p style={{ color: 'red' }}>{warningMessage}</p>}

          <div>
            <h2>Operación</h2>
            <select onChange={(e) => setOperation(e.target.value)} aria-label="selector-operacion">
              <option value="suma">Suma</option>
              <option value="resta">Resta</option>
              <option value="multiplicacion">Multiplicación</option>
              <option value="inversa">Inversa</option>
            </select>
          </div>

          <div>
            <h2>Matriz A ({matrixSize.rows}x{matrixSize.cols})</h2>
            <MatrixInput
              rows={matrixSize.rows}
              cols={matrixSize.cols}
              matrix={matrixA}
              onChange={(i, j, value) => handleMatrixChange(i, j, value, 'A')}
              matrixName="A"
            />
          </div>

          {operation !== 'inversa' && (
            <div>
              <h2>Matriz B ({matrixSize.rows}x{matrixSize.cols})</h2>
              <MatrixInput
                rows={matrixSize.rows}
                cols={matrixSize.cols}
                matrix={matrixB}
                onChange={(i, j, value) => handleMatrixChange(i, j, value, 'B')}
                matrixName="B"
              />
            </div>
          )}

          <button onClick={handleOperation} aria-label="calcular-operacion">Calcular</button>
        </div>
      </article>

      {resultMatrix && (
        <article>
          <div className="article-body">
            <h2>Resultado de la operación</h2>
            <table border={1}>
              <tbody>
                {resultMatrix.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((value, colIndex) => (
                      <td key={colIndex}>{floatToFraction(value)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

            {determinantValue !== null && (
              <h4>Determinante: {floatToFraction(determinantValue)}</h4>
            )}

            {inverseMatrix && operation !== 'inversa' && (
              <div>
                <h4>Matriz Inversa del resultado:</h4>
                <table border={1}>
                  <tbody>
                    {inverseMatrix.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {row.map((value, colIndex) => (
                          <td key={colIndex}>{floatToFraction(value)}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </article>
      )}
    </section>
  );
};

export default MatrixCalculator;