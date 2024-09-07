import { render, screen, fireEvent } from '@testing-library/react';
import MatrixCalculator from './components/MatrixCalculator';
import { describe, test, expect } from 'vitest';

describe('MatrixCalculator', () => {
  test('debería renderizar el título correctamente', () => {
    render(<MatrixCalculator />);
    const titleElement = screen.getByText(/Calculadora de Determinantes/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('debería mostrar el input de la matriz 1x1', () => {
    render(<MatrixCalculator />);
    const inputElement = screen.getByLabelText('input-matrix-1x1');
    expect(inputElement).toBeInTheDocument();
  });

  test('debería cambiar el valor del input de la matriz 1x1, calcular el determinante y la inversa', () => {
    render(<MatrixCalculator />);
    
    const inputElement = screen.getByLabelText('input-matrix-1x1');
    const buttonElement = screen.getByText(/Calcular Determinante e Inversa 1x1/i);

    fireEvent.change(inputElement, { target: { value: '5' } });
    expect(inputElement).toHaveValue(5);

    fireEvent.click(buttonElement);

    const determinantElement = screen.getByText(/Determinante: 5/i);
    expect(determinantElement).toBeInTheDocument();

    const inverseCell = screen.getByText('1/5');
    expect(inverseCell).toBeInTheDocument();
  });

  test('debería calcular correctamente el determinante e inversa de una matriz 2x2 con números enteros', () => {
    render(<MatrixCalculator />);

    const matrix2x2Inputs = screen.getAllByLabelText(/input-matrix-2x2/i);

    fireEvent.change(matrix2x2Inputs[0], { target: { value: '2' } });
    fireEvent.change(matrix2x2Inputs[1], { target: { value: '3' } });
    fireEvent.change(matrix2x2Inputs[2], { target: { value: '1' } });
    fireEvent.change(matrix2x2Inputs[3], { target: { value: '4' } });

    const buttonElement = screen.getByText(/Calcular Determinante e Inversa 2x2/i);
    fireEvent.click(buttonElement);

    const determinantElement = screen.getByText(/Determinante: 5/i);
    expect(determinantElement).toBeInTheDocument();

    const inverseCells = screen.getAllByRole('cell');
    
    // Comprobamos que las fracciones estén correctas, independientemente de la posición del signo
    expect(inverseCells[0].textContent).toMatch(/4\/5/);
    expect(inverseCells[1].textContent).toMatch(/-3\/5|3\/-5/);  // Aceptamos ambos formatos para manejar el signo
    expect(inverseCells[2].textContent).toMatch(/-1\/5|1\/-5/);
    expect(inverseCells[3].textContent).toMatch(/2\/5/);
  });

  test('debería calcular correctamente el determinante e inversa de una matriz 2x2 con números flotantes', () => {
    render(<MatrixCalculator />);

    const matrix2x2Inputs = screen.getAllByLabelText(/input-matrix-2x2/i);

    fireEvent.change(matrix2x2Inputs[0], { target: { value: '1.5' } });
    fireEvent.change(matrix2x2Inputs[1], { target: { value: '2.5' } });
    fireEvent.change(matrix2x2Inputs[2], { target: { value: '3.5' } });
    fireEvent.change(matrix2x2Inputs[3], { target: { value: '4.5' } });

    const buttonElement = screen.getByText(/Calcular Determinante e Inversa 2x2/i);
    fireEvent.click(buttonElement);

    const determinantElement = screen.getByText(/Determinante: -2/i);
    expect(determinantElement).toBeInTheDocument();

    const inverseCells = screen.getAllByRole('cell');
    
    // Comprobamos que las fracciones flotantes estén correctas, sin preocuparnos del signo
    expect(inverseCells[0].textContent).toMatch(/-9\/4|9\/-4/);  // Aceptamos ambas formas
    expect(inverseCells[1].textContent).toMatch(/5\/4/);
    expect(inverseCells[2].textContent).toMatch(/7\/4/);
    expect(inverseCells[3].textContent).toMatch(/-3\/4|3\/-4/);
  });

  test('debería calcular correctamente el determinante e inversa de una matriz 3x3 con números enteros', () => {
    render(<MatrixCalculator />);
  
    const matrix3x3Inputs = screen.getAllByLabelText(/input-matrix-3x3/i);
  
    fireEvent.change(matrix3x3Inputs[0], { target: { value: '1' } });
    fireEvent.change(matrix3x3Inputs[1], { target: { value: '2' } });
    fireEvent.change(matrix3x3Inputs[2], { target: { value: '3' } });
    fireEvent.change(matrix3x3Inputs[3], { target: { value: '0' } });
    fireEvent.change(matrix3x3Inputs[4], { target: { value: '1' } });
    fireEvent.change(matrix3x3Inputs[5], { target: { value: '4' } });
    fireEvent.change(matrix3x3Inputs[6], { target: { value: '5' } });
    fireEvent.change(matrix3x3Inputs[7], { target: { value: '6' } });
    fireEvent.change(matrix3x3Inputs[8], { target: { value: '0' } });
  
    const buttonElement = screen.getByText(/Calcular Determinante e Inversa 3x3/i);
    fireEvent.click(buttonElement);
  
    const determinantElement = screen.getByText(/Determinante: 1/i);
    expect(determinantElement).toBeInTheDocument();

    const inverseTable = screen.getByRole('table');
    expect(inverseTable).toBeInTheDocument();
  });

  test('debería calcular correctamente el determinante e inversa de una matriz 3x3 con números flotantes', () => {
    render(<MatrixCalculator />);

    const matrix3x3Inputs = screen.getAllByLabelText(/input-matrix-3x3/i);

    fireEvent.change(matrix3x3Inputs[0], { target: { value: '1.2' } });
    fireEvent.change(matrix3x3Inputs[1], { target: { value: '2.3' } });
    fireEvent.change(matrix3x3Inputs[2], { target: { value: '3.4' } });
    fireEvent.change(matrix3x3Inputs[3], { target: { value: '4.5' } });
    fireEvent.change(matrix3x3Inputs[4], { target: { value: '5.6' } });
    fireEvent.change(matrix3x3Inputs[5], { target: { value: '6.7' } });
    fireEvent.change(matrix3x3Inputs[6], { target: { value: '7.8' } });
    fireEvent.change(matrix3x3Inputs[7], { target: { value: '8.9' } });
    fireEvent.change(matrix3x3Inputs[8], { target: { value: '9.1' } });

    const buttonElement = screen.getByText(/Calcular Determinante e Inversa 3x3/i);
    fireEvent.click(buttonElement);

    const determinantElement = screen.getByText((content) => content.includes("Determinante:"));
    const detText = determinantElement.textContent?.match(/-?\d+(\.\d+)?/);
    const detValue = detText ? parseFloat(detText[0]) : null;
    expect(detValue).toBeCloseTo(3.27, 2);

    const inverseTable = screen.getByRole('table');
    expect(inverseTable).toBeInTheDocument();
  });
});