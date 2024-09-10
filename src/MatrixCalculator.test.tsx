import { render, screen, fireEvent } from '@testing-library/react';
import MatrixCalculator from './components/principal/Calculadora';
import { describe, test, expect } from 'vitest';

describe('MatrixCalculator', () => {
  // Prueba para verificar que se renderizan los componentes de la página
  test('debería renderizar todos los componentes principales de la página', () => {
    render(<MatrixCalculator />);

    // Verificar que existan los componentes de la página
    expect(screen.getByText(/Operación/i)).toBeInTheDocument(); // Verifica si el título "Operación" está en el documento
    expect(screen.getByLabelText('selector-operacion')).toBeInTheDocument(); // Verifica si el selector de operación está en el documento
    expect(screen.getByLabelText('calcular-operacion')).toBeInTheDocument(); // Verifica si el botón calcular está en el documento
  });

  // Prueba para verificar la suma de dos matrices 3x2
  test('debería calcular correctamente la suma de dos matrices 3x2', () => {
    render(<MatrixCalculator />);

    // Actualizar las dimensiones a 3x2
    const rowsInput = screen.getByLabelText(/Filas:/i);
    const colsInput = screen.getByLabelText(/Columnas:/i);
    fireEvent.change(rowsInput, { target: { value: '3' } });
    fireEvent.change(colsInput, { target: { value: '2' } });

    // Usar aria-labels correctos para la matriz A
    fireEvent.change(screen.getByLabelText('input-A-0-0'), { target: { value: '1' } });
    fireEvent.change(screen.getByLabelText('input-A-0-1'), { target: { value: '2' } });
    fireEvent.change(screen.getByLabelText('input-A-1-0'), { target: { value: '3' } });
    fireEvent.change(screen.getByLabelText('input-A-1-1'), { target: { value: '4' } });
    fireEvent.change(screen.getByLabelText('input-A-2-0'), { target: { value: '5' } });
    fireEvent.change(screen.getByLabelText('input-A-2-1'), { target: { value: '6' } });

    // Usar aria-labels correctos para la matriz B
    fireEvent.change(screen.getByLabelText('input-B-0-0'), { target: { value: '6' } });
    fireEvent.change(screen.getByLabelText('input-B-0-1'), { target: { value: '5' } });
    fireEvent.change(screen.getByLabelText('input-B-1-0'), { target: { value: '4' } });
    fireEvent.change(screen.getByLabelText('input-B-1-1'), { target: { value: '3' } });
    fireEvent.change(screen.getByLabelText('input-B-2-0'), { target: { value: '2' } });
    fireEvent.change(screen.getByLabelText('input-B-2-1'), { target: { value: '1' } });

    const button = screen.getByLabelText('calcular-operacion');
    fireEvent.click(button);

    // Verificar los resultados de la suma
    const resultCells = screen.getAllByRole('cell');
    expect(resultCells[0].textContent).toBe('7');  // 1 + 6
    expect(resultCells[1].textContent).toBe('7');  // 2 + 5
    expect(resultCells[2].textContent).toBe('7');  // 3 + 4
    expect(resultCells[3].textContent).toBe('7');  // 4 + 3
    expect(resultCells[4].textContent).toBe('7');  // 5 + 2
    expect(resultCells[5].textContent).toBe('7');  // 6 + 1
  });

  // Prueba para verificar la resta de dos matrices 3x2
  test('debería calcular correctamente la resta de dos matrices 3x2', () => {
    render(<MatrixCalculator />);

    // Actualizar las dimensiones a 3x2
    const rowsInput = screen.getByLabelText(/Filas:/i);
    const colsInput = screen.getByLabelText(/Columnas:/i);
    fireEvent.change(rowsInput, { target: { value: '3' } });
    fireEvent.change(colsInput, { target: { value: '2' } });

    // Usar aria-labels correctos para la matriz A
    fireEvent.change(screen.getByLabelText('input-A-0-0'), { target: { value: '5' } });
    fireEvent.change(screen.getByLabelText('input-A-0-1'), { target: { value: '6' } });
    fireEvent.change(screen.getByLabelText('input-A-1-0'), { target: { value: '7' } });
    fireEvent.change(screen.getByLabelText('input-A-1-1'), { target: { value: '8' } });
    fireEvent.change(screen.getByLabelText('input-A-2-0'), { target: { value: '9' } });
    fireEvent.change(screen.getByLabelText('input-A-2-1'), { target: { value: '10' } });

    // Usar aria-labels correctos para la matriz B
    fireEvent.change(screen.getByLabelText('input-B-0-0'), { target: { value: '1' } });
    fireEvent.change(screen.getByLabelText('input-B-0-1'), { target: { value: '2' } });
    fireEvent.change(screen.getByLabelText('input-B-1-0'), { target: { value: '3' } });
    fireEvent.change(screen.getByLabelText('input-B-1-1'), { target: { value: '4' } });
    fireEvent.change(screen.getByLabelText('input-B-2-0'), { target: { value: '5' } });
    fireEvent.change(screen.getByLabelText('input-B-2-1'), { target: { value: '6' } });

    // Cambiar la operación a resta
    const operationSelect = screen.getByLabelText('selector-operacion');
    fireEvent.change(operationSelect, { target: { value: 'resta' } });

    const button = screen.getByLabelText('calcular-operacion');
    fireEvent.click(button);

    // Verificar los resultados de la resta
    const resultCells = screen.getAllByRole('cell');
    expect(resultCells[0].textContent).toBe('4');  // 5 - 1
    expect(resultCells[1].textContent).toBe('4');  // 6 - 2
    expect(resultCells[2].textContent).toBe('4');  // 7 - 3
    expect(resultCells[3].textContent).toBe('4');  // 8 - 4
    expect(resultCells[4].textContent).toBe('4');  // 9 - 5
    expect(resultCells[5].textContent).toBe('4');  // 10 - 6
  });

  // Prueba para verificar la multiplicación de matrices 3x3
  test('debería calcular correctamente la multiplicación de dos matrices 3x3', () => {
    render(<MatrixCalculator />);

    // Actualizar las dimensiones a 3x3
    const rowsInput = screen.getByLabelText(/Filas:/i);
    const colsInput = screen.getByLabelText(/Columnas:/i);
    fireEvent.change(rowsInput, { target: { value: '3' } });
    fireEvent.change(colsInput, { target: { value: '3' } });

    // Cambiar los valores de la primera matriz (A)
    fireEvent.change(screen.getByLabelText('input-A-0-0'), { target: { value: '1' } });
    fireEvent.change(screen.getByLabelText('input-A-0-1'), { target: { value: '2' } });
    fireEvent.change(screen.getByLabelText('input-A-0-2'), { target: { value: '3' } });
    fireEvent.change(screen.getByLabelText('input-A-1-0'), { target: { value: '4' } });
    fireEvent.change(screen.getByLabelText('input-A-1-1'), { target: { value: '5' } });
    fireEvent.change(screen.getByLabelText('input-A-1-2'), { target: { value: '6' } });
    fireEvent.change(screen.getByLabelText('input-A-2-0'), { target: { value: '7' } });
    fireEvent.change(screen.getByLabelText('input-A-2-1'), { target: { value: '8' } });
    fireEvent.change(screen.getByLabelText('input-A-2-2'), { target: { value: '9' } });

    // Cambiar los valores de la segunda matriz (B)
    fireEvent.change(screen.getByLabelText('input-B-0-0'), { target: { value: '9' } });
    fireEvent.change(screen.getByLabelText('input-B-0-1'), { target: { value: '8' } });
    fireEvent.change(screen.getByLabelText('input-B-0-2'), { target: { value: '7' } });
    fireEvent.change(screen.getByLabelText('input-B-1-0'), { target: { value: '6' } });
    fireEvent.change(screen.getByLabelText('input-B-1-1'), { target: { value: '5' } });
    fireEvent.change(screen.getByLabelText('input-B-1-2'), { target: { value: '4' } });
    fireEvent.change(screen.getByLabelText('input-B-2-0'), { target: { value: '3' } });
    fireEvent.change(screen.getByLabelText('input-B-2-1'), { target: { value: '2' } });
    fireEvent.change(screen.getByLabelText('input-B-2-2'), { target: { value: '1' } });

    const operationSelect = screen.getByLabelText('selector-operacion');
    fireEvent.change(operationSelect, { target: { value: 'multiplicacion' } });

    const button = screen.getByLabelText('calcular-operacion');
    fireEvent.click(button);

    // Verificar los resultados de la multiplicación
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
