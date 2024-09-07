import React, { useState, ChangeEvent } from 'react';

const MatrixCalculator: React.FC = () => {
    const [matrix1x1, setMatrix1x1] = useState<number>(0);
    const [matrix2x2, setMatrix2x2] = useState<number[][]>([[0, 0], [0, 0]]);
    const [matrix3x3, setMatrix3x3] = useState<number[][]>([[0, 0, 0], [0, 0, 0], [0, 0, 0]]);
    const [determinant, setDeterminant] = useState<number | null>(null);

    const handleInputChange1x1 = (e: ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value);
        setMatrix1x1(value);
    };

    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement>,
        i: number,
        j: number,
        size: number
    ) => {
        const value = parseFloat(e.target.value);
        if (size === 2) {
            const newMatrix = [...matrix2x2];
            newMatrix[i][j] = value;
            setMatrix2x2(newMatrix);
        } else {
            const newMatrix = [...matrix3x3];
            newMatrix[i][j] = value;
            setMatrix3x3(newMatrix);
        }
    };

    const calculateDeterminant1x1 = () => {
        setDeterminant(matrix1x1);
    };

    const calculateDeterminant2x2 = () => {
        const det = matrix2x2[0][0] * matrix2x2[1][1] - matrix2x2[0][1] * matrix2x2[1][0];
        setDeterminant(det);
    };

    const calculateDeterminant3x3 = () => {
        const a = matrix3x3[0][0], b = matrix3x3[0][1], c = matrix3x3[0][2];
        const d = matrix3x3[1][0], e = matrix3x3[1][1], f = matrix3x3[1][2];
        const g = matrix3x3[2][0], h = matrix3x3[2][1], i = matrix3x3[2][2];

        const det = a * (e * i - f * h) - b * (d * i - f * g) + c * (d * h - e * g);
        setDeterminant(det);
    };

    return (
        <div>
            <h2>Calculadora de Determinantes</h2>

            <div>
                <h3>Matriz 1x1</h3>
                <input
                    type="number"
                    value={matrix1x1}
                    onChange={handleInputChange1x1}
                />
                <button onClick={calculateDeterminant1x1}>Calcular Determinante 1x1</button>
            </div>

            <div>
                <h3>Matriz 2x2</h3>
                {matrix2x2.map((row, i) => (
                    <div key={i}>
                        {row.map((_, j) => (
                            <input
                                key={j}
                                type="number"
                                value={matrix2x2[i][j]}
                                onChange={(e) => handleInputChange(e, i, j, 2)}
                            />
                        ))}
                    </div>
                ))}
                <button onClick={calculateDeterminant2x2}>Calcular Determinante 2x2</button>
            </div>

            <div>
                <h3>Matriz 3x3</h3>
                {matrix3x3.map((row, i) => (
                    <div key={i}>
                        {row.map((_, j) => (
                            <input
                                key={j}
                                type="number"
                                value={matrix3x3[i][j]}
                                onChange={(e) => handleInputChange(e, i, j, 3)}
                            />
                        ))}
                    </div>
                ))}
                <button onClick={calculateDeterminant3x3}>Calcular Determinante 3x3</button>
            </div>

            {determinant !== null && (
                <div>
                    <h3>Determinante: {determinant}</h3>
                </div>
            )}
        </div>
    );
};

export default MatrixCalculator;
