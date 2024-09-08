import { render, screen, fireEvent } from '@testing-library/react';
import MatrixCalculator from './components/MatrixCalculator';
import { describe, test, expect } from 'vitest';

describe('MatrixCalculator', () => {
  // Prueba para verificar el input de la matriz A
  test('debería mostrar los inputs de la matriz A correctamente', () => {
    render(<MatrixCalculator />);
    const matrixAInputs = screen.getAllByLabelText(/input-A/i);
    // Verificamos que haya al menos 4 inputs (para una matriz 2x2)
    expect(matrixAInputs.length).toBe(4);
  });

  // Prueba para verificar la suma de dos matrices 2x2
  test('debería calcular correctamente la suma de dos matrices 2x2', () => {
    render(<MatrixCalculator />);

    // Usamos los aria-labels correctos para la matriz A
    const inputA00 = screen.getByLabelText('input-A-0-0');
    const inputA01 = screen.getByLabelText('input-A-0-1');
    const inputA10 = screen.getByLabelText('input-A-1-0');
    const inputA11 = screen.getByLabelText('input-A-1-1');

    fireEvent.change(inputA00, { target: { value: '3' } });
    fireEvent.change(inputA01, { target: { value: '4' } });
    fireEvent.change(inputA10, { target: { value: '4' } });
    fireEvent.change(inputA11, { target: { value: '3' } });

    // Usamos los aria-labels correctos para la matriz B
    const inputB00 = screen.getByLabelText('input-B-0-0');
    const inputB01 = screen.getByLabelText('input-B-0-1');
    const inputB10 = screen.getByLabelText('input-B-1-0');
    const inputB11 = screen.getByLabelText('input-B-1-1');

    fireEvent.change(inputB00, { target: { value: '2' } });
    fireEvent.change(inputB01, { target: { value: '1' } });
    fireEvent.change(inputB10, { target: { value: '0' } });
    fireEvent.change(inputB11, { target: { value: '0' } });

    const button = screen.getByLabelText('calcular-operacion');
    fireEvent.click(button);

    const resultCells = screen.getAllByRole('cell');
    expect(resultCells[0].textContent).toEqual('5');  // 3 + 2
    expect(resultCells[1].textContent).toEqual('5');  // 4 + 1
    expect(resultCells[2].textContent).toEqual('4');  // 4 + 0
    expect(resultCells[3].textContent).toEqual('3');  // 3 + 0
  });

  // Prueba para verificar la resta de dos matrices 2x2
  test('debería calcular correctamente la resta de dos matrices 2x2', () => {
    render(<MatrixCalculator />);

    // Cambiar los valores de la primera matriz (A)
    const inputA00 = screen.getByLabelText('input-A-0-0');
    const inputA01 = screen.getByLabelText('input-A-0-1');
    const inputA10 = screen.getByLabelText('input-A-1-0');
    const inputA11 = screen.getByLabelText('input-A-1-1');

    fireEvent.change(inputA00, { target: { value: '5' } });
    fireEvent.change(inputA01, { target: { value: '6' } });
    fireEvent.change(inputA10, { target: { value: '7' } });
    fireEvent.change(inputA11, { target: { value: '8' } });

    // Cambiar los valores de la segunda matriz (B)
    const inputB00 = screen.getByLabelText('input-B-0-0');
    const inputB01 = screen.getByLabelText('input-B-0-1');
    const inputB10 = screen.getByLabelText('input-B-1-0');
    const inputB11 = screen.getByLabelText('input-B-1-1');

    fireEvent.change(inputB00, { target: { value: '1' } });
    fireEvent.change(inputB01, { target: { value: '2' } });
    fireEvent.change(inputB10, { target: { value: '3' } });
    fireEvent.change(inputB11, { target: { value: '4' } });

    const operationSelect = screen.getByLabelText('selector-operacion');
    fireEvent.change(operationSelect, { target: { value: 'resta' } });

    const button = screen.getByLabelText('calcular-operacion');
    fireEvent.click(button);

    const resultCells = screen.getAllByRole('cell');
    expect(resultCells[0].textContent).toBe('4');  // 5 - 1
    expect(resultCells[1].textContent).toBe('4');  // 6 - 2
    expect(resultCells[2].textContent).toBe('4');  // 7 - 3
    expect(resultCells[3].textContent).toBe('4');  // 8 - 4
  });

  // Prueba para verificar la multiplicación de matrices 2x2
  test('debería calcular correctamente la multiplicación de dos matrices 2x2', () => {
    render(<MatrixCalculator />);

    // Cambiar los valores de la primera matriz (A)
    const inputA00 = screen.getByLabelText('input-A-0-0');
    const inputA01 = screen.getByLabelText('input-A-0-1');
    const inputA10 = screen.getByLabelText('input-A-1-0');
    const inputA11 = screen.getByLabelText('input-A-1-1');

    fireEvent.change(inputA00, { target: { value: '1' } });
    fireEvent.change(inputA01, { target: { value: '2' } });
    fireEvent.change(inputA10, { target: { value: '3' } });
    fireEvent.change(inputA11, { target: { value: '4' } });

    // Cambiar los valores de la segunda matriz (B)
    const inputB00 = screen.getByLabelText('input-B-0-0');
    const inputB01 = screen.getByLabelText('input-B-0-1');
    const inputB10 = screen.getByLabelText('input-B-1-0');
    const inputB11 = screen.getByLabelText('input-B-1-1');

    fireEvent.change(inputB00, { target: { value: '4' } });
    fireEvent.change(inputB01, { target: { value: '3' } });
    fireEvent.change(inputB10, { target: { value: '2' } });
    fireEvent.change(inputB11, { target: { value: '1' } });

    const operationSelect = screen.getByLabelText('selector-operacion');
    fireEvent.change(operationSelect, { target: { value: 'multiplicacion' } });

    const button = screen.getByLabelText('calcular-operacion');
    fireEvent.click(button);

    const resultCells = screen.getAllByRole('cell');
    expect(resultCells[0].textContent).toBe('8');
    expect(resultCells[1].textContent).toBe('5');
    expect(resultCells[2].textContent).toBe('20');
    expect(resultCells[3].textContent).toBe('13');
  });

  // Prueba para verificar el mensaje de "No tiene inversa" cuando el determinante es 0
  test('debería mostrar el mensaje de "No tiene inversa" si el determinante es 0', () => {
    render(<MatrixCalculator />);

    // Cambiar los valores de la primera matriz (A)
    const inputA00 = screen.getByLabelText('input-A-0-0');
    const inputA01 = screen.getByLabelText('input-A-0-1');
    const inputA10 = screen.getByLabelText('input-A-1-0');
    const inputA11 = screen.getByLabelText('input-A-1-1');

    fireEvent.change(inputA00, { target: { value: '1' } });
    fireEvent.change(inputA01, { target: { value: '2' } });
    fireEvent.change(inputA10, { target: { value: '2' } });
    fireEvent.change(inputA11, { target: { value: '4' } });

    const operationSelect = screen.getByLabelText('selector-operacion');
    fireEvent.change(operationSelect, { target: { value: 'inversa' } });

    const button = screen.getByLabelText('calcular-operacion');
    fireEvent.click(button);

    const noInverseMessage = screen.getByText(/La matriz no tiene inversa/i);
    expect(noInverseMessage).toBeInTheDocument();
  });
});