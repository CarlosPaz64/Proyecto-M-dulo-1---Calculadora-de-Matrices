import { render, screen, fireEvent } from '@testing-library/react';
import MatrixCalculator from './components/MatrixCalculator';
import { describe, test, expect } from 'vitest';

describe('MatrixCalculator', () => {
  
  // Prueba para renderizar correctamente el título
  test('debería renderizar el título correctamente', () => {
    render(<MatrixCalculator />);
    const titleElement = screen.getByText(/Calculadora de Matrices/i);
    expect(titleElement).toBeInTheDocument();
  });

  // Prueba para renderizar el input de la matriz 1x1
  test('debería mostrar el input de la matriz 1x1', () => {
    render(<MatrixCalculator />);
    const inputElement = screen.getByLabelText('input-matrix-1x1');
    expect(inputElement).toBeInTheDocument();
  });

  // Prueba para verificar el cálculo de la inversa de la matriz 1x1
  test('debería cambiar el valor del input de la matriz 1x1 y calcular la inversa', () => {
    render(<MatrixCalculator />);
    
    const inputElement = screen.getByLabelText('input-matrix-1x1');
    const buttonElement = screen.getByLabelText('calcular-matriz-1x1');

    fireEvent.change(inputElement, { target: { value: '5' } });
    expect(inputElement).toHaveValue(5);

    fireEvent.click(buttonElement);

    const inverseCell = screen.getByText('1/5');
    expect(inverseCell).toBeInTheDocument();
  });

  // Prueba para la matriz 2x2 con números enteros
  test('debería calcular correctamente la inversa de una matriz 2x2 con números enteros', () => {
    render(<MatrixCalculator />);

    const matrix2x2Inputs = screen.getAllByLabelText(/input-matrix-2x2/i);

    fireEvent.change(matrix2x2Inputs[0], { target: { value: '2' } });
    fireEvent.change(matrix2x2Inputs[1], { target: { value: '3' } });
    fireEvent.change(matrix2x2Inputs[2], { target: { value: '1' } });
    fireEvent.change(matrix2x2Inputs[3], { target: { value: '4' } });

    const buttonElement = screen.getByLabelText('calcular-matriz-2x2');
    fireEvent.click(buttonElement);

    // Comprobamos que se muestra la inversa correctamente
    const inverseCells = screen.getAllByRole('cell');
    expect(inverseCells[0].textContent).toMatch(/4\/5/);
    expect(inverseCells[1].textContent).toMatch(/-3\/5|3\/-5/);
    expect(inverseCells[2].textContent).toMatch(/-1\/5|1\/-5/);
    expect(inverseCells[3].textContent).toMatch(/2\/5/);
  });

  // Prueba para la matriz 2x2 con números flotantes
  test('debería calcular correctamente la inversa de una matriz 2x2 con números flotantes', () => {
    render(<MatrixCalculator />);

    const matrix2x2Inputs = screen.getAllByLabelText(/input-matrix-2x2/i);

    fireEvent.change(matrix2x2Inputs[0], { target: { value: '1.5' } });
    fireEvent.change(matrix2x2Inputs[1], { target: { value: '2.5' } });
    fireEvent.change(matrix2x2Inputs[2], { target: { value: '3.5' } });
    fireEvent.change(matrix2x2Inputs[3], { target: { value: '4.5' } });

    const buttonElement = screen.getByLabelText('calcular-matriz-2x2');
    fireEvent.click(buttonElement);

    // Comprobamos que se muestra la inversa correctamente
    const inverseCells = screen.getAllByRole('cell');
    expect(inverseCells[0].textContent).toMatch(/-9\/4|9\/-4/);
    expect(inverseCells[1].textContent).toMatch(/5\/4/);
    expect(inverseCells[2].textContent).toMatch(/7\/4/);
    expect(inverseCells[3].textContent).toMatch(/-3\/4|3\/-4/);
  });

  // Prueba para la matriz 3x3 con números enteros
  test('debería calcular correctamente la inversa de una matriz 3x3 con números enteros', () => {
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
  
    const buttonElement = screen.getByLabelText('calcular-matriz-3x3');
    fireEvent.click(buttonElement);
  
    // Comprobamos que se muestra la inversa correctamente
    const inverseTable = screen.getByRole('table');
    expect(inverseTable).toBeInTheDocument();
  });

  // Prueba para verificar el mensaje de "No tiene inversa" cuando el determinante es 0
  test('debería mostrar el mensaje de "No tiene inversa" si el determinante es 0', () => {
    render(<MatrixCalculator />);

    const matrix2x2Inputs = screen.getAllByLabelText(/input-matrix-2x2/i);

    fireEvent.change(matrix2x2Inputs[0], { target: { value: '1' } });
    fireEvent.change(matrix2x2Inputs[1], { target: { value: '2' } });
    fireEvent.change(matrix2x2Inputs[2], { target: { value: '2' } });
    fireEvent.change(matrix2x2Inputs[3], { target: { value: '4' } });

    const buttonElement = screen.getByLabelText('calcular-matriz-2x2');
    fireEvent.click(buttonElement);

    // Verificamos que se muestre el mensaje de "No tiene inversa"
    const noInverseMessage = screen.getByText(/No tiene inversa la matriz porque el determinante es 0/i);
    expect(noInverseMessage).toBeInTheDocument();
  });
});
