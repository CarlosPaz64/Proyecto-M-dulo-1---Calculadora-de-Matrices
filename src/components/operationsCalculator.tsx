// Determinante de una matriz (solo para cuadradas)
export const determinant = (matrix: number[][]): number | null => {
  if (matrix.length !== matrix[0].length) {
      return null; // Determinante solo para matrices cuadradas
  }
  if (matrix.length === 1) {
      return matrix[0][0]; // Para matrices 1x1
  }
  if (matrix.length === 2) {
      return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
  }
  if (matrix.length === 3) {
      const [a, b, c] = matrix[0];
      const [d, e, f] = matrix[1];
      const [g, h, i] = matrix[2];
      return a * (e * i - f * h) - b * (d * i - f * g) + c * (d * h - e * g);
  }
  return 0;
};

// Inversa de una matriz (solo para cuadradas)
export const invertMatrix = (matrix: number[][]): number[][] | null => {
  if (matrix.length !== matrix[0].length) {
    return null; // La inversa solo está definida para matrices cuadradas
  }
  
  const det = determinant(matrix);
  if (det === 0 || det === null) return null;

  if (matrix.length === 1) {
    return [[1 / matrix[0][0]]];
  }

  if (matrix.length === 2) {
    const [[a, b], [c, d]] = matrix;
    return [
      [d / det, -b / det],
      [-c / det, a / det]
    ];
  }

  if (matrix.length === 3) {
    const [a, b, c] = matrix[0];
    const [d, e, f] = matrix[1];
    const [g, h, i] = matrix[2];
    return [
      [(e * i - f * h) / det, -(b * i - c * h) / det, (b * f - c * e) / det],
      [-(d * i - f * g) / det, (a * i - c * g) / det, -(a * f - c * d) / det],
      [(d * h - e * g) / det, -(a * h - b * g) / det, (a * e - b * d) / det]
    ];
  }

  return null;
};

// Suma de matrices (compatible con cualquier dimensión)
export const sumMatrices = (matrixA: number[][], matrixB: number[][]) => {
  const result = matrixA.map((row, i) =>
      row.map((val, j) => val + matrixB[i][j])
  );
  return { result, determinant: null, inverse: null };
};

// Resta de matrices (compatible con cualquier dimensión)
export const subtractMatrices = (matrixA: number[][], matrixB: number[][]) => {
  const result = matrixA.map((row, i) =>
      row.map((val, j) => val - matrixB[i][j])
  );
  return { result, determinant: null, inverse: null };
};

// Multiplicación de matrices (compatible con cualquier dimensión)
export const multiplyMatrices = (matrixA: number[][], matrixB: number[][]) => {
  // Validamos que el número de columnas de A coincida con el número de filas de B
  if (matrixA[0].length !== matrixB.length) {
    throw new Error('Las dimensiones de las matrices no son compatibles para la multiplicación');
  }

  const result = Array(matrixA.length)
    .fill(0)
    .map(() => Array(matrixB[0].length).fill(0));

  for (let i = 0; i < matrixA.length; i++) {
    for (let j = 0; j < matrixB[0].length; j++) {
      for (let k = 0; k < matrixB.length; k++) {
        result[i][j] += matrixA[i][k] * matrixB[k][j];
      }
    }
  }

  return { result, determinant: null, inverse: null };
};