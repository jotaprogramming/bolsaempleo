/**
 * It takes a string, converts it to lowercase, and then checks if it matches the regex.
 * @param {string} email - string - The email address to verify.
 * @returns A boolean value.
 */
export default function verifyEmail(email: string) {
	return String(email)
		.toLowerCase()
		.match(
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		);
}
