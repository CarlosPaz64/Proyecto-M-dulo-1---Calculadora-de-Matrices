// floatToFraction.tsx

// Función que convierte un número flotante a una fracción simple
export function floatToFraction(num: number, tolerance: number = 1.0e-6): string {
    if (Number.isInteger(num)) {
        return num.toString(); // Si es un entero, retornamos el número como está
    }

    let numerator = 1;
    let denominator = 1;
    let decimal = num - Math.floor(num);

    while (Math.abs(decimal) > tolerance && denominator <= 10000) {
        decimal *= 10;
        denominator *= 10;
        numerator = Math.round(num * denominator);
        decimal = (num * denominator) - numerator;
    }

    const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
    const divisor = gcd(numerator, denominator);

    return `${numerator / divisor}/${denominator / divisor}`;
}
