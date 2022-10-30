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
