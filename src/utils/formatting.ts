import { companies } from '@prisma/client';
/**
 * It takes a string, splits it into an array of words, capitalizes the first letter of each word, and
 * then joins the array back into a string
 * @param {string} str - string - The string to capitalize.
 * @returns A function that takes a string and returns a new string with the first letter of each word
 * capitalized.
 */
export function capitalize(str: string) {
	const words: string[] = str.split(' ');
	const new_str: string[] = words.map((word) => {
		return word[0].toUpperCase() + word.substring(1);
	});
	return new_str.join(' ');
}

export async function objectCapitalize(body: {}): Promise<any> {
	const temp_body: any = body;
	const values = Object.values(body);
	const keys = Object.keys(body);
	const temp_values = values.map((item) => {
		if (typeof item === 'string') {
			return capitalize(item);
		}
		if (typeof item === 'object' && item !== null) {
			return objectCapitalize(item);
		}
		return item;
	});
	keys.forEach((key, index) => {
		temp_body[key] = temp_values[index];
	});
	return temp_body;
}
