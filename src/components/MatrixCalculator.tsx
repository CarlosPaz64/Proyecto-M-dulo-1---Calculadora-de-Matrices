import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import MatrixInput from '../MatrixInput';
import { floatToFraction } from './floatToFraction';
import { sumMatrices, subtractMatrices, multiplyMatrices, invertMatrix, determinant } from './operationsCalculator';
import './MatrixCalculator.css';

const MatrixCalculator: React.FC = () => {
    const [matrix1x1, setMatrix1x1] = useState<number>(0);
    const [matrix2x2, setMatrix2x2] = useState<number[][]>([[0, 0], [0, 0]]);
    const [matrix3x3, setMatrix3x3] = useState<number[][]>([[0, 0, 0], [0, 0, 0], [0, 0, 0]]);

    const [matrix1x1B, setMatrix1x1B] = useState<number>(0); 
    const [matrix2x2B, setMatrix2x2B] = useState<number[][]>([[0, 0], [0, 0]]);
    const [matrix3x3B, setMatrix3x3B] = useState<number[][]>([[0, 0, 0], [0, 0, 0], [0, 0, 0]]); 

    const [det1x1, setDet1x1] = useState<number | null>(null);
    const [inv1x1, setInv1x1] = useState<number[][] | null>(null);

    const [det2x2, setDet2x2] = useState<number | null>(null);
    const [inv2x2, setInv2x2] = useState<number[][] | null>(null);

    const [det3x3, setDet3x3] = useState<number | null>(null);
    const [inv3x3, setInv3x3] = useState<number[][] | null>(null);

    const [result1x1, setResult1x1] = useState<number[][] | null>(null);
    const [result2x2, setResult2x2] = useState<number[][] | null>(null);
    const [result3x3, setResult3x3] = useState<number[][] | null>(null);

    const [operation1x1, setOperation1x1] = useState<string>('inversa');
    const [operation2x2, setOperation2x2] = useState<string>('inversa');
    const [operation3x3, setOperation3x3] = useState<string>('inversa');

    const matrix1x1Ref = useRef<HTMLInputElement>(null);

    useLayoutEffect(() => {
        if (matrix1x1Ref.current) {
            matrix1x1Ref.current.focus();
        }
    }, []);

    // Calcular la inversa automáticamente cuando se cambie el resultado de una operación
    useEffect(() => {
        if (result1x1 && operation1x1 !== 'inversa') {
            const det = determinant(result1x1);
            setDet1x1(det);
            if (det !== 0) {
                const inv = invertMatrix(result1x1);
                setInv1x1(inv);
            } else {
                setInv1x1(null);
            }
        }
    }, [result1x1, operation1x1]);

    useEffect(() => {
        if (result2x2 && operation2x2 !== 'inversa') {
            const det = determinant(result2x2);
            setDet2x2(det);
            if (det !== 0) {
                const inv = invertMatrix(result2x2);
                setInv2x2(inv);
            } else {
                setInv2x2(null);
            }
        }
    }, [result2x2, operation2x2]);

    useEffect(() => {
        if (result3x3 && operation3x3 !== 'inversa') {
            const det = determinant(result3x3);
            setDet3x3(det);
            if (det !== 0) {
                const inv = invertMatrix(result3x3);
                setInv3x3(inv);
            } else {
                setInv3x3(null);
            }
        }
    }, [result3x3, operation3x3]);

    const handleOperation1x1 = () => {
        if (operation1x1 === 'inversa') {
            const det = matrix1x1;
            setDet1x1(det);
            if (det !== 0) {
                setResult1x1([[1 / det]]);
            } else {
                setResult1x1(null);
            }
        } else {
            let result;
            if (operation1x1 === 'suma') {
                result = sumMatrices([[matrix1x1]], [[matrix1x1B]]);
            } else if (operation1x1 === 'resta') {
                result = subtractMatrices([[matrix1x1]], [[matrix1x1B]]);
            } else if (operation1x1 === 'multiplicacion') {
                result = multiplyMatrices([[matrix1x1]], [[matrix1x1B]]);
            }
            if (result) {
                setResult1x1(result.result);
            }
        }
    };

    const handleOperation2x2 = () => {
        if (operation2x2 === 'inversa') {
            const det = matrix2x2[0][0] * matrix2x2[1][1] - matrix2x2[0][1] * matrix2x2[1][0];
            setDet2x2(det);
            if (det !== 0) {
                setResult2x2(invertMatrix(matrix2x2));
            } else {
                setResult2x2(null);
            }
        } else {
            let result;
            if (operation2x2 === 'suma') {
                result = sumMatrices(matrix2x2, matrix2x2B);
            } else if (operation2x2 === 'resta') {
                result = subtractMatrices(matrix2x2, matrix2x2B);
            } else if (operation2x2 === 'multiplicacion') {
                result = multiplyMatrices(matrix2x2, matrix2x2B);
            }
            if (result) {
                setResult2x2(result.result);
            }
        }
    };

    const handleOperation3x3 = () => {
        if (operation3x3 === 'inversa') {
            const [a, b, c] = matrix3x3[0];
            const [d, e, f] = matrix3x3[1];
            const [g, h, i] = matrix3x3[2];
            const det = a * (e * i - f * h) - b * (d * i - f * g) + c * (d * h - e * g);
            setDet3x3(det);
            if (det !== 0) {
                setResult3x3(invertMatrix(matrix3x3));
            } else {
                setResult3x3(null);
            }
        } else {
            let result;
            if (operation3x3 === 'suma') {
                result = sumMatrices(matrix3x3, matrix3x3B);
            } else if (operation3x3 === 'resta') {
                result = subtractMatrices(matrix3x3, matrix3x3B);
            } else if (operation3x3 === 'multiplicacion') {
                result = multiplyMatrices(matrix3x3, matrix3x3B);
            }
            if (result) {
                setResult3x3(result.result);
            }
        }
    };

    return (
        <section className="articles">
            {/* Matriz 1x1 */}
            <article>
                <div className="article-wrapper">
                    <figure>
                        {result1x1 && (
                            <div>
                                <h4>Resultado:</h4>
                                <table border={1}>
                                    <tbody>
                                        {result1x1.map((row, rowIndex) => (
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
                        {inv1x1 && operation1x1 !== 'inversa' && (
                            <div>
                                <h4>Inversa del resultado:</h4>
                                <table border={1}>
                                    <tbody>
                                        {inv1x1.map((row, rowIndex) => (
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
                        {det1x1 === 0 && operation1x1 === 'inversa' && (
                            <p className="no-inverse">
                                No tiene inversa la matriz porque el determinante es {det1x1}
                            </p>
                        )}
                    </figure>
                    <div className="article-body">
                        <h2>Matriz 1x1</h2>
                        <div>
                            <select onChange={(e) => setOperation1x1(e.target.value)}>
                                <option value="inversa">Inversa</option>
                                <option value="suma">Suma</option>
                                <option value="resta">Resta</option>
                                <option value="multiplicacion">Multiplicación</option>
                            </select>
                        </div>
                        <input
                            ref={matrix1x1Ref}
                            type="number"
                            aria-label="input-matrix-1x1"
                            value={matrix1x1}
                            onChange={(e) => setMatrix1x1(parseFloat(e.target.value))}
                        />

                        {operation1x1 !== 'inversa' && (
                            <div>
                                <h2>Segunda Matriz 1x1</h2>
                                <input
                                    type="number"
                                    aria-label="input-matrix-1x1B"
                                    value={matrix1x1B}
                                    onChange={(e) => setMatrix1x1B(parseFloat(e.target.value))}
                                />
                            </div>
                        )}
                        <button onClick={handleOperation1x1} aria-label="calcular-matriz-1x1">Calcular</button>
                    </div>
                </div>
            </article>

            {/* Matriz 2x2 */}
            <article>
                <div className="article-wrapper">
                    <figure>
                        {result2x2 && (
                            <div>
                                <h4>Resultado:</h4>
                                <table border={1}>
                                    <tbody>
                                        {result2x2.map((row, rowIndex) => (
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
                        {inv2x2 && operation2x2 !== 'inversa' && (
                            <div>
                                <h4>Inversa del resultado:</h4>
                                <table border={1}>
                                    <tbody>
                                        {inv2x2.map((row, rowIndex) => (
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
                        {det2x2 === 0 && operation2x2 === 'inversa' && (
                            <p className="no-inverse">
                                No tiene inversa la matriz porque el determinante es {det2x2}
                            </p>
                        )}
                    </figure>
                    <div className="article-body">
                        <h2>Matriz 2x2</h2>
                        <div>
                            <select aria-label="operacion-matriz-2x2" onChange={(e) => setOperation2x2(e.target.value)}>
                                <option value="inversa">Inversa</option>
                                <option value="suma">Suma</option>
                                <option value="resta">Resta</option>
                                <option value="multiplicacion">Multiplicación</option>
                            </select>
                        </div>
                        <MatrixInput
                            size={2}
                            matrix={matrix2x2}
                            onChange={(i, j, value) => {
                                const newMatrix = [...matrix2x2];
                                newMatrix[i][j] = value;
                                setMatrix2x2(newMatrix);
                            }}
                            ariaLabelPrefix="input-matrix-2x2"
                        />

                        {operation2x2 !== 'inversa' && (
                            <div>
                                <h2>Segunda Matriz 2x2</h2>
                                <MatrixInput
                                    size={2}
                                    matrix={matrix2x2B}
                                    onChange={(i, j, value) => {
                                        const newMatrix = [...matrix2x2B];
                                        newMatrix[i][j] = value;
                                        setMatrix2x2B(newMatrix);
                                    }}
                                    ariaLabelPrefix="input-matrix-2x2B"
                                />
                            </div>
                        )}
                        <button onClick={handleOperation2x2} aria-label="calcular-matriz-2x2">Calcular</button>
                    </div>
                </div>
            </article>

            {/* Matriz 3x3 */}
            <article>
                <div className="article-wrapper">
                    <figure>
                        {result3x3 && (
                            <div>
                                <h4>Resultado:</h4>
                                <table border={1}>
                                    <tbody>
                                        {result3x3.map((row, rowIndex) => (
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
                        {inv3x3 && operation3x3 !== 'inversa' && (
                            <div>
                                <h4>Inversa del resultado:</h4>
                                <table border={1}>
                                    <tbody>
                                        {inv3x3.map((row, rowIndex) => (
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
                        {det3x3 === 0 && operation3x3 === 'inversa' && (
                            <p className="no-inverse">
                                No tiene inversa la matriz porque el determinante es {det3x3}
                            </p>
                        )}
                    </figure>
                    <div className="article-body">
                        <h2>Matriz 3x3</h2>
                        <div>
                            <select aria-label="operacion-matriz-3x3" onChange={(e) => setOperation3x3(e.target.value)}>
                                <option value="inversa">Inversa</option>
                                <option value="suma">Suma</option>
                                <option value="resta">Resta</option>
                                <option value="multiplicacion">Multiplicación</option>
                            </select>
                        </div>
                        <MatrixInput
                            size={3}
                            matrix={matrix3x3}
                            onChange={(i, j, value) => {
                                const newMatrix = [...matrix3x3];
                                newMatrix[i][j] = value;
                                setMatrix3x3(newMatrix);
                            }}
                            ariaLabelPrefix="input-matrix-3x3"
                        />

                        {operation3x3 !== 'inversa' && (
                            <div>
                                <h2>Segunda Matriz 3x3</h2>
                                <MatrixInput
                                    size={3}
                                    matrix={matrix3x3B}
                                    onChange={(i, j, value) => {
                                        const newMatrix = [...matrix3x3B];
                                        newMatrix[i][j] = value;
                                        setMatrix3x3B(newMatrix);
                                    }}
                                    ariaLabelPrefix="input-matrix-3x3B"
                                />
                            </div>
                        )}
                        <button onClick={handleOperation3x3} aria-label="calcular-matriz-3x3">Calcular</button>
                    </div>
                </div>
            </article>
        </section>
    );
};

export default MatrixCalculator;