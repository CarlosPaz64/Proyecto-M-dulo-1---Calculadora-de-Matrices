import React, { useState } from 'react';
import MatrixInput from '../MatrixInput';
import { sumMatrices, subtractMatrices, multiplyMatrices, invertMatrix, determinant } from './operationsCalculator';
import DimensionsColumn from './dimensionsColumn';
import { floatToFraction } from './floatToFraction';
import './MatrixCalculator.css';

const MatrixCalculator: React.FC = () => {
    const [matrixA, setMatrixA] = useState<number[][]>([[0, 0], [0, 0]]);
    const [matrixB, setMatrixB] = useState<number[][]>([[0, 0], [0, 0]]);
    const [matrixSize, setMatrixSize] = useState<{ rows: number; cols: number }>({ rows: 2, cols: 2 });
    const [operation, setOperation] = useState<string>('suma');
    const [resultMatrix, setResultMatrix] = useState<number[][] | null>(null);
    const [determinantValue, setDeterminant] = useState<number | null>(null);
    const [inverseMatrix, setInverseMatrix] = useState<number[][] | null>(null);
    const [warningMessage, setWarningMessage] = useState<string | null>(null);

    // Función para actualizar el tamaño de las matrices
    const updateMatrixSize = (rows: number, cols: number) => {
        if (rows < 1 || rows > 3 || cols < 1 || cols > 3) {
            setWarningMessage('Las dimensiones de la matriz deben ser entre 1 y 3.');
            return;
        }
        setWarningMessage(null);
        setMatrixSize({ rows, cols });

        // Actualiza las matrices A y B con el nuevo tamaño
        setMatrixA(Array.from({ length: rows }, () => Array(cols).fill(0)));
        setMatrixB(Array.from({ length: rows }, () => Array(cols).fill(0)));
    };
      

    // Función para manejar operaciones
    const handleOperation = () => {
        console.log("Matriz A:", matrixA);
        console.log("Matriz B:", matrixB);
        let result: { result: number[][] | null; determinant: number | null; inverse: number[][] | null } | null = null;
    
        if (operation === 'suma') {
            result = sumMatrices(matrixA, matrixB);
        } else if (operation === 'resta') {
            result = subtractMatrices(matrixA, matrixB);
        } else if (operation === 'multiplicacion') {
            if (matrixA[0].length !== matrixB.length) {
                setWarningMessage('Las dimensiones de las matrices no son compatibles para la multiplicación');
                return;
            } else {
                setWarningMessage(null);
                result = multiplyMatrices(matrixA, matrixB);
            }
        } else if (operation === 'inversa') {
            if (matrixSize.rows !== matrixSize.cols) {
                setWarningMessage('La matriz debe ser cuadrada para calcular la inversa');
                return;
            } else {
                setWarningMessage(null);
                const inversa = invertMatrix(matrixA);
                const determinante = determinant(matrixA);
                if (!inversa) {
                    setWarningMessage('La matriz no tiene inversa (determinante es 0)');
                    return;
                }
                result = { result: inversa, determinant: determinante, inverse: inversa };
            }
        }
    
        if (result && result.result) {
            setResultMatrix(result.result);
            setDeterminant(result.determinant ?? null);  // Guardar el determinante
            setInverseMatrix(result.inverse ?? null); // Guardar la inversa
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

                    {/* Selector de operación */}
                    <div>
                        <h2>Operación</h2>
                        <select onChange={(e) => setOperation(e.target.value)} aria-label="selector-operacion">
                            <option value="suma">Suma</option>
                            <option value="resta">Resta</option>
                            <option value="multiplicacion">Multiplicación</option>
                            <option value="inversa">Inversa</option>
                        </select>
                    </div>

                    {/* Inputs para Matrix A */}
                    <div>
                        <h2>Matriz A ({matrixSize.rows}x{matrixSize.cols})</h2>
                        <MatrixInput
                            rows={matrixSize.rows}
                            cols={matrixSize.cols}
                            matrix={matrixA}
                            onChange={(i, j, value) => {
                                const newMatrix = [...matrixA];
                                newMatrix[i][j] = value;
                                console.log("Actualizando Matriz A:", newMatrix); // Depuración
                                setMatrixA(newMatrix);
                            }}
                            matrixName="A"
                        />
                    </div>

                    {/* Inputs para Matrix B (solo si no es operación inversa) */}
                    {operation !== 'inversa' && (
                        <div>
                            <h2>Matriz B ({matrixSize.rows}x{matrixSize.cols})</h2>
                            <MatrixInput
                                rows={matrixSize.rows}
                                cols={matrixSize.cols}
                                matrix={matrixB}
                                onChange={(i, j, value) => {
                                    const newMatrix = [...matrixB];
                                    newMatrix[i][j] = value;
                                    console.log("Actualizando Matriz B:", newMatrix); // Depuración
                                    setMatrixB(newMatrix);
                                }}
                                matrixName="B"
                            />
                        </div>
                    )}

                    <button onClick={handleOperation} aria-label="calcular-operacion">Calcular</button>
                </div>
            </article>

            {/* Mostrar resultado */}
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

                        {/* Mostrar determinante si existe */}
                        {determinantValue !== null && (
                            <h4>Determinante: {floatToFraction(determinantValue)}</h4>
                        )}

                        {/* Mostrar inversa si existe */}
                        {inverseMatrix && (
                            <div>
                                <h4>Matriz Inversa:</h4>
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
