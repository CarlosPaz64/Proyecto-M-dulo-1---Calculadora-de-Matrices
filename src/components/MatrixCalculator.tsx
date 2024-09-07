import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import MatrixInput from '../MatrixInput';
import { floatToFraction } from './floatToFraction';
import './MatrixCalculator.css';

const MatrixCalculator: React.FC = () => {
    const [matrix1x1, setMatrix1x1] = useState<number>(0);
    const [matrix2x2, setMatrix2x2] = useState<number[][]>([[0, 0], [0, 0]]);
    const [matrix3x3, setMatrix3x3] = useState<number[][]>([[0, 0, 0], [0, 0, 0], [0, 0, 0]]);

    const [det1x1, setDet1x1] = useState<number | null>(null);
    const [inv1x1, setInv1x1] = useState<number[][] | null>(null);

    const [det2x2, setDet2x2] = useState<number | null>(null);
    const [inv2x2, setInv2x2] = useState<number[][] | null>(null);

    const [det3x3, setDet3x3] = useState<number | null>(null);
    const [inv3x3, setInv3x3] = useState<number[][] | null>(null);

    const matrix1x1Ref = useRef<HTMLInputElement>(null);

    useLayoutEffect(() => {
        if (matrix1x1Ref.current) {
            matrix1x1Ref.current.focus();
        }
    }, []);

    // useEffect para el cálculo de la matriz 1x1
    useEffect(() => {
        const det = matrix1x1;
        setDet1x1(det);

        if (det !== 0) {
            setInv1x1([[1 / det]]);
        } else {
            setInv1x1(null);
        }
    }, [matrix1x1]);

    // useEffect para el cálculo de la matriz 2x2
    useEffect(() => {
        const det = matrix2x2[0][0] * matrix2x2[1][1] - matrix2x2[0][1] * matrix2x2[1][0];
        setDet2x2(det);

        if (det !== 0) {
            const inv = [
                [matrix2x2[1][1] / det, -matrix2x2[0][1] / det],
                [-matrix2x2[1][0] / det, matrix2x2[0][0] / det]
            ];
            setInv2x2(inv);
        } else {
            setInv2x2(null);
        }
    }, [matrix2x2]);

    // useEffect para el cálculo de la matriz 3x3
    useEffect(() => {
        const [a, b, c] = matrix3x3[0];
        const [d, e, f] = matrix3x3[1];
        const [g, h, i] = matrix3x3[2];

        const det = a * (e * i - f * h) - b * (d * i - f * g) + c * (d * h - e * g);
        setDet3x3(det);

        if (det !== 0) {
            const inv = [
                [(e * i - f * h) / det, -(b * i - c * h) / det, (b * f - c * e) / det],
                [-(d * i - f * g) / det, (a * i - c * g) / det, -(a * f - c * d) / det],
                [(d * h - e * g) / det, -(a * h - b * g) / det, (a * e - b * d) / det]
            ];
            setInv3x3(inv);
        } else {
            setInv3x3(null);
        }
    }, [matrix3x3]);

    return (
        <section className="articles">
            <article>
                <div className="article-wrapper">
                    <figure>
                        {det1x1 !== null && (
                            <div>
                                <h4>Determinante: {det1x1}</h4>
                                {inv1x1 && (
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
                                )}
                                {det1x1 === 0 && <p>No tiene inversa</p>}
                            </div>
                        )}
                    </figure>
                    <div className="article-body">
                        <h2>Matriz 1x1</h2>
                        <input
                            ref={matrix1x1Ref}
                            type="number"
                            aria-label="input-matrix-1x1"
                            value={matrix1x1}
                            onChange={(e) => setMatrix1x1(parseFloat(e.target.value))}
                        />
                    </div>
                </div>
            </article>

            <article>
                <div className="article-wrapper">
                    <figure>
                        {det2x2 !== null && (
                            <div>
                                <h4>Determinante: {det2x2}</h4>
                                {inv2x2 && (
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
                                )}
                                {det2x2 === 0 && <p>No tiene inversa</p>}
                            </div>
                        )}
                    </figure>
                    <div className="article-body">
                        <h2>Matriz 2x2</h2>
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
                    </div>
                </div>
            </article>

            <article>
                <div className="article-wrapper">
                    <figure>
                        {det3x3 !== null && (
                            <div>
                                <h4>Determinante: {det3x3}</h4>
                                {inv3x3 && (
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
                                )}
                                {det3x3 === 0 && <p>No tiene inversa</p>}
                            </div>
                        )}
                    </figure>
                    <div className="article-body">
                        <h2>Matriz 3x3</h2>
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
                    </div>
                </div>
            </article>
        </section>
    );
};

export default MatrixCalculator;