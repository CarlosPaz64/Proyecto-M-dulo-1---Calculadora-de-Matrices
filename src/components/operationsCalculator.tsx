// Calcula el determinante de una matriz 1x1, 2x2 o 3x3
export const determinant = (matrix: number[][]): number => {
    if (matrix.length === 1) {
      return matrix[0][0]; // Para matrices 1x1, el determinante es el valor mismo
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
  
  // Calcula la inversa de una matriz 1x1, 2x2 o 3x3
  export const invertMatrix = (matrix: number[][]): number[][] | null => {
    const det = determinant(matrix);
    if (det === 0) return null;
  
    if (matrix.length === 1) {
      return [[1 / matrix[0][0]]]; // Para matrices 1x1, la inversa es el inverso de su valor
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
  
  // Suma de matrices
  export const sumMatrices = (matrixA: number[][], matrixB: number[][]) => {
    const result = matrixA.map((row: number[], i: number) =>
      row.map((val: number, j: number) => val + matrixB[i][j])
    );
    const det = determinant(result);
    const inv = invertMatrix(result);
    return { result, determinant: det, inverse: inv };
  };
  
  // Resta de matrices
  export const subtractMatrices = (matrixA: number[][], matrixB: number[][]) => {
    const result = matrixA.map((row: number[], i: number) =>
      row.map((val: number, j: number) => val - matrixB[i][j])
    );
    const det = determinant(result);
    const inv = invertMatrix(result);
    return { result, determinant: det, inverse: inv };
  };
  
  // Multiplicación de matrices
  export const multiplyMatrices = (matrixA: number[][], matrixB: number[][]) => {
    const result = matrixA.map(() => Array(matrixB[0].length).fill(0));
    for (let i = 0; i < matrixA.length; i++) {
      for (let j = 0; j < matrixB[0].length; j++) {
        for (let k = 0; k < matrixB.length; k++) {
          result[i][j] += matrixA[i][k] * matrixB[k][j];
        }
      }
    }
    const det = determinant(result);
    const inv = invertMatrix(result);
    return { result, determinant: det, inverse: inv };
  };
  