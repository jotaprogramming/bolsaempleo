/**
 * It returns a string if the number is less than the minimum or greater than the maximum, otherwise it
 * returns null
 * @param {number} num - number =&gt; The number to be checked.
 * @param {number} min - The minimum number of digits the number should have.
 * @param {number} max - The maximum number of digits allowed.
 * @returns A function that takes 3 parameters.
 */
export default function numberSize(
	num: number | string,
	min: number,
	max: number
) {
	const NUM = num.toString();
	if (NUM.length < min) {
		return `El valor ingresado es inferior al mínimo aceptado.`;
	}
	if (NUM.length > max) {
		return `El valor ingresado es superior al máximo aceptado.`;
	}
	return null;
}
