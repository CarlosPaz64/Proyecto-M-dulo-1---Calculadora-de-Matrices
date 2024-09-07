import { render, screen, fireEvent } from '@testing-library/react';
import MatrixCalculator from './components/MatrixCalculator';
import { describe, test, expect } from 'vitest';

describe('MatrixCalculator', () => {

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

   // Prueba para la suma de matrices 2x2
   test('debería calcular correctamente la suma de dos matrices 2x2', () => {
    render(<MatrixCalculator />);

    // Cambiar la operación a "Suma"
    const operationSelect = screen.getByLabelText('operacion-matriz-2x2');
    fireEvent.change(operationSelect, { target: { value: 'suma' } });

    // Ahora que se ha seleccionado "Suma", los inputs para la segunda matriz deberían aparecer
    const matrixAInputs = screen.getAllByLabelText(/input-matrix-2x2/i);
    const matrixBInputs = screen.getAllByLabelText(/input-matrix-2x2B/i);

    // Cambiar los valores de la primera matriz (A)
    fireEvent.change(matrixAInputs[0], { target: { value: '1' } });
    fireEvent.change(matrixAInputs[1], { target: { value: '2' } });
    fireEvent.change(matrixAInputs[2], { target: { value: '3' } });
    fireEvent.change(matrixAInputs[3], { target: { value: '4' } });

    // Cambiar los valores de la segunda matriz (B)
    fireEvent.change(matrixBInputs[0], { target: { value: '4' } });
    fireEvent.change(matrixBInputs[1], { target: { value: '3' } });
    fireEvent.change(matrixBInputs[2], { target: { value: '2' } });
    fireEvent.change(matrixBInputs[3], { target: { value: '1' } });

    // Hacer click en el botón de calcular
    const button = screen.getByLabelText('calcular-matriz-2x2');
    fireEvent.click(button);

    // Verificar que los resultados sean correctos
    const resultCells = screen.getAllByRole('cell');
    expect(resultCells[0].textContent).toBe('5');
    expect(resultCells[1].textContent).toBe('5');
    expect(resultCells[2].textContent).toBe('5');
    expect(resultCells[3].textContent).toBe('5');
  });

  // Prueba para la resta de matrices 2x2
  test('debería calcular correctamente la resta de dos matrices 2x2', () => {
    render(<MatrixCalculator />);

    // Cambiar la operación a "Resta"
    const operationSelect = screen.getByLabelText('operacion-matriz-2x2');
    fireEvent.change(operationSelect, { target: { value: 'resta' } });

    // Ahora que se ha seleccionado "Resta", los inputs para la segunda matriz deberían aparecer
    const matrixAInputs = screen.getAllByLabelText(/input-matrix-2x2/i);
    const matrixBInputs = screen.getAllByLabelText(/input-matrix-2x2B/i);

    // Cambiar los valores de la primera matriz (A)
    fireEvent.change(matrixAInputs[0], { target: { value: '5' } });
    fireEvent.change(matrixAInputs[1], { target: { value: '6' } });
    fireEvent.change(matrixAInputs[2], { target: { value: '7' } });
    fireEvent.change(matrixAInputs[3], { target: { value: '8' } });

    // Cambiar los valores de la segunda matriz (B)
    fireEvent.change(matrixBInputs[0], { target: { value: '1' } });
    fireEvent.change(matrixBInputs[1], { target: { value: '2' } });
    fireEvent.change(matrixBInputs[2], { target: { value: '3' } });
    fireEvent.change(matrixBInputs[3], { target: { value: '4' } });

    // Hacer click en el botón de calcular
    const button = screen.getByLabelText('calcular-matriz-2x2');
    fireEvent.click(button);

    // Verificar que los resultados sean correctos
    const resultCells = screen.getAllByRole('cell');
    expect(resultCells[0].textContent).toBe('4');
    expect(resultCells[1].textContent).toBe('4');
    expect(resultCells[2].textContent).toBe('4');
    expect(resultCells[3].textContent).toBe('4');
  });

  // Prueba para la multiplicación de matrices 3x3
  test('debería calcular correctamente la multiplicación de dos matrices 3x3', () => {
    render(<MatrixCalculator />);

    // Cambiar la operación a "Multiplicación"
    const operationSelect = screen.getByLabelText('operacion-matriz-3x3');
    fireEvent.change(operationSelect, { target: { value: 'multiplicacion' } });

    // Ahora que se ha seleccionado "Multiplicación", los inputs para la segunda matriz deberían aparecer
    const matrixAInputs = screen.getAllByLabelText(/input-matrix-3x3/i);
    const matrixBInputs = screen.getAllByLabelText(/input-matrix-3x3B/i);

    // Cambiar los valores de la primera matriz (A)
    fireEvent.change(matrixAInputs[0], { target: { value: '1' } });
    fireEvent.change(matrixAInputs[1], { target: { value: '2' } });
    fireEvent.change(matrixAInputs[2], { target: { value: '3' } });
    fireEvent.change(matrixAInputs[3], { target: { value: '4' } });
    fireEvent.change(matrixAInputs[4], { target: { value: '5' } });
    fireEvent.change(matrixAInputs[5], { target: { value: '6' } });
    fireEvent.change(matrixAInputs[6], { target: { value: '7' } });
    fireEvent.change(matrixAInputs[7], { target: { value: '8' } });
    fireEvent.change(matrixAInputs[8], { target: { value: '9' } });

    // Cambiar los valores de la segunda matriz (B)
    fireEvent.change(matrixBInputs[0], { target: { value: '9' } });
    fireEvent.change(matrixBInputs[1], { target: { value: '8' } });
    fireEvent.change(matrixBInputs[2], { target: { value: '7' } });
    fireEvent.change(matrixBInputs[3], { target: { value: '6' } });
    fireEvent.change(matrixBInputs[4], { target: { value: '5' } });
    fireEvent.change(matrixBInputs[5], { target: { value: '4' } });
    fireEvent.change(matrixBInputs[6], { target: { value: '3' } });
    fireEvent.change(matrixBInputs[7], { target: { value: '2' } });
    fireEvent.change(matrixBInputs[8], { target: { value: '1' } });

    // Hacer click en el botón de calcular
    const button = screen.getByLabelText('calcular-matriz-3x3');
    fireEvent.click(button);

    // Verificar que los resultados sean correctos
    const resultCells = screen.getAllByRole('cell');
    expect(resultCells[0].textContent).toBe('30');
    expect(resultCells[1].textContent).toBe('24');
    expect(resultCells[2].textContent).toBe('18');
    expect(resultCells[3].textContent).toBe('84');
    expect(resultCells[4].textContent).toBe('69');
    expect(resultCells[5].textContent).toBe('54');
    expect(resultCells[6].textContent).toBe('138');
    expect(resultCells[7].textContent).toBe('114');
    expect(resultCells[8].textContent).toBe('90');
  });
});
