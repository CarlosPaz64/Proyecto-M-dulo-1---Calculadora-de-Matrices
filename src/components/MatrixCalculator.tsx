import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import MatrixInput from '../MatrixInput';
import { floatToFraction } from './floatToFraction';  // Importamos la función
import './MatrixCalculator.css';

const MatrixCalculator: React.FC = () => {
    const [matrix1x1, setMatrix1x1] = useState<number>(0);
    const [matrix2x2, setMatrix2x2] = useState<number[][]>([[0, 0], [0, 0]]);
    const [matrix3x3, setMatrix3x3] = useState<number[][]>([[0, 0, 0], [0, 0, 0], [0, 0, 0]]);
    const [determinant, setDeterminant] = useState<number | null>(null);
    const [inverse, setInverse] = useState<number[][] | null>(null);

    const matrix1x1Ref = useRef<HTMLInputElement>(null);

    useEffect(() => {
        console.log("Matrix 1x1 value changed", matrix1x1);
    }, [matrix1x1]);

    useLayoutEffect(() => {
        if (matrix1x1Ref.current) {
            matrix1x1Ref.current.focus();
        }
    }, []);

    // Cálculo del determinante y la inversa de la matriz 1x1
    const calculateDeterminant1x1 = () => {
        const det = matrix1x1;
        setDeterminant(det);

        if (det !== 0) {
            const inv = [[1 / det]];
            setInverse(inv);
        } else {
            setInverse(null); // No tiene inversa
        }
    };

    // Cálculo del determinante y la inversa de la matriz 2x2
    const calculateDeterminant2x2 = () => {
        const det = matrix2x2[0][0] * matrix2x2[1][1] - matrix2x2[0][1] * matrix2x2[1][0];
        setDeterminant(det);

        if (det !== 0) {
            const inv = [
                [matrix2x2[1][1] / det, -matrix2x2[0][1] / det],
                [-matrix2x2[1][0] / det, matrix2x2[0][0] / det]
            ];
            setInverse(inv);
        } else {
            setInverse(null); // No tiene inversa
        }
    };

    // Cálculo del determinante y la inversa de la matriz 3x3
    const calculateDeterminant3x3 = () => {
        const [a, b, c] = matrix3x3[0];
        const [d, e, f] = matrix3x3[1];
        const [g, h, i] = matrix3x3[2];

        const det = a * (e * i - f * h) - b * (d * i - f * g) + c * (d * h - e * g);
        setDeterminant(det);

        if (det !== 0) {
            const inv = [
                [
                    (e * i - f * h) / det,
                    -(b * i - c * h) / det,
                    (b * f - c * e) / det
                ],
                [
                    -(d * i - f * g) / det,
                    (a * i - c * g) / det,
                    -(a * f - c * d) / det
                ],
                [
                    (d * h - e * g) / det,
                    -(a * h - b * g) / det,
                    (a * e - b * d) / det
                ]
            ];
            setInverse(inv);
        } else {
            setInverse(null); // No tiene inversa
        }
    };

    return (
        <div>
            <h2>Calculadora de Determinantes e Inversas</h2>

            <div>
                <h3>Matriz 1x1</h3>
                <input
                    ref={matrix1x1Ref}
                    type="number"
                    aria-label="input-matrix-1x1"
                    value={matrix1x1}
                    onChange={(e) => setMatrix1x1(parseFloat(e.target.value))}
                />
                <button onClick={calculateDeterminant1x1}>Calcular Determinante e Inversa 1x1</button>
            </div>

            <div>
                <h3>Matriz 2x2</h3>
                <MatrixInput
                    size={2}
                    matrix={matrix2x2}
                    onChange={(i, j, value) => {
                        const newMatrix = [...matrix2x2];
                        newMatrix[i][j] = value;
                        setMatrix2x2(newMatrix);
                    }}
                    ariaLabelPrefix="input-matrix-2x2"
                >
                    <button onClick={calculateDeterminant2x2}>Calcular Determinante e Inversa 2x2</button>
                </MatrixInput>
            </div>

            <div>
                <h3>Matriz 3x3</h3>
                <MatrixInput
                    size={3}
                    matrix={matrix3x3}
                    onChange={(i, j, value) => {
                        const newMatrix = [...matrix3x3];
                        newMatrix[i][j] = value;
                        setMatrix3x3(newMatrix);
                    }}
                    ariaLabelPrefix="input-matrix-3x3"
                >
                    <button onClick={calculateDeterminant3x3}>Calcular Determinante e Inversa 3x3</button>
                </MatrixInput>
            </div>

            {determinant !== null && (
                <div>
                    <h3>Determinante: {determinant}</h3>
                </div>
            )}

            {inverse !== null && (
                <div>
                    <h3>Inversa:</h3>
                    <table border={1}>
                        <tbody>
                            {inverse.map((row, rowIndex) => (
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

            {determinant === 0 && <div>No tiene inversa</div>}
        </div>
    );
};

export default MatrixCalculator;