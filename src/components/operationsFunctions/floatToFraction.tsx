// floatToFraction.tsx

// Función para convertir decimales a fracciones
export function floatToFraction(num: number, maxDenominator: number = 1000): string {
    if (Number.isInteger(num)) {
        return num.toString(); // Si es un entero, retornar el número como está
    }

    const sign = num < 0 ? -1 : 1; // Mantener el signo
    num = Math.abs(num);

    let bestNumerator = 1;
    let bestDenominator = 1;
    let minDifference = Math.abs(num - bestNumerator / bestDenominator);

    for (let denominator = 1; denominator <= maxDenominator; denominator++) {
        const numerator = Math.round(num * denominator);
        const difference = Math.abs(num - numerator / denominator);

        if (difference < minDifference) {
            minDifference = difference;
            bestNumerator = numerator;
            bestDenominator = denominator;
        }
    }

    // Simplificar la fracción dividiendo por el MCD
    const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
    const divisor = gcd(bestNumerator, bestDenominator);
    bestNumerator = (bestNumerator / divisor) * sign;
    bestDenominator = bestDenominator / divisor;

    return `${bestNumerator}/${bestDenominator}`;
}