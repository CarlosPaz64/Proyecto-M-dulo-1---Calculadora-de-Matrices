import React, { useState } from 'react'; // Llamada al hook de useState
import MatrixInput from '../MatrixInput';
import { sumMatrices, subtractMatrices, multiplyMatrices, invertMatrix, determinant } from './operationsCalculator';
import DimensionsColumn from './dimensionsColumn';
import { floatToFraction } from './floatToFraction';
import './MatrixCalculator.css';

const MatrixCalculator: React.FC = () => { //React Functional Component
    // Inferencia de tipo: matrixA es de tipo number[][]
    const [matrixA, setMatrixA] = useState<number[][]>([[0, 0], [0, 0]]);

    // Inferencia de tipo: matrixB es de tipo number[][]
    const [matrixB, setMatrixB] = useState<number[][]>([[0, 0], [0, 0]]);

    // Inferencia de tipo: matrixSize es de tipo { rows: number; cols: number }
    const [matrixSize, setMatrixSize] = useState<{ rows: number; cols: number }>({ rows: 2, cols: 2 });

    // Inferencia de tipo: operation es de tipo string
    const [operation, setOperation] = useState<string>('suma');

    // Inferencia de tipo: resultMatrix es de tipo number[][] | null
    const [resultMatrix, setResultMatrix] = useState<number[][] | null>(null);

    // Inferencia de tipo: determinantValue es de tipo number | null
    const [determinantValue, setDeterminant] = useState<number | null>(null);

    // Inferencia de tipo: inverseMatrix es de tipo number[][] | null
    const [inverseMatrix, setInverseMatrix] = useState<number[][] | null>(null);

    // Inferencia de tipo: warningMessage es de tipo string | null
    const [warningMessage, setWarningMessage] = useState<string | null>(null);

    const updateMatrixSize = (rows: number, cols: number) => {
        if (rows < 1 || rows > 3 || cols < 1 || cols > 3) {
            setWarningMessage('Las dimensiones de la matriz deben ser entre 1 y 3.');
            return;
        }
        setWarningMessage(null);
        setMatrixSize({ rows, cols });

        setMatrixA(Array.from({ length: rows }, () => Array(cols).fill(0)));
        setMatrixB(Array.from({ length: rows }, () => Array(cols).fill(0)));
    };

    // Función que maneja los diferentes eventos del onChange y onClick
    const handleOperation = () => {
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
                            {/* Manejo de eventos mediante el uso de onChange */}
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
                            onChange={(i, j, value) => {
                            {/* Manejo de eventos mediante el uso de onChange */}
                                const newMatrix = [...matrixA];
                                newMatrix[i][j] = value;
                                setMatrixA(newMatrix);
                            }}
                            matrixName="A"
                        >
                            {/* Children opcionales */}
                            <p>Matriz A con tamaño {matrixSize.rows}x{matrixSize.cols}</p>
                        </MatrixInput>
                    </div>

                    {operation !== 'inversa' && (
                        <div>
                            <h2>Matriz B ({matrixSize.rows}x{matrixSize.cols})</h2>
                            <MatrixInput
                                rows={matrixSize.rows}
                                cols={matrixSize.cols}
                                matrix={matrixB}
                                onChange={(i, j, value) => {
                                {/* Manejo de eventos mediante el uso de onChange */}
                                    const newMatrix = [...matrixB];
                                    newMatrix[i][j] = value;
                                    setMatrixB(newMatrix);
                                }}
                                matrixName="B"
                            >
                            {/* Children opcionales */}
                            <p>Matriz B con tamaño {matrixSize.rows}x{matrixSize.cols}</p>
                            </MatrixInput>
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