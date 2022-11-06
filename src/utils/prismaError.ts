import messages from '../settings/settings.json';
import defaultErrors from '../settings/prisma-errors.json';
import { IPrismaError } from '../helpers/interfaces/error.interface';
import { IResult } from '../helpers/interfaces/result.interface';
import httpResponse from './httpResponse';

/**
 * It takes an error object and returns a response object
 * @param {any} error - any - The error object that is returned from the Prisma client.
 * @returns An object with a code and a message.
 */
export function knownRequestError(error: any): IResult {
	let result: IPrismaError = {
		code: error.code,
	};
	switch (error.code) {
		case 'P2002':
			result['message'] =
				messages.errors.unique || defaultErrors.codes.P2002;
			break;
		case 'P2003':
			result['message'] =
				messages.errors.empty || defaultErrors.codes.P2003;
			break;
		case 'P2025':
			result['message'] =
				messages.errors.not_found || defaultErrors.codes.P2025;
			break;
	}
	return httpResponse(400, result);
}

/**
 * It returns a function that takes an error object and returns an object with a message property
 * @param {any} error - any
 * @returns An object with a status property and a message property.
 */
export function validationError(error: any): IResult {
	// let result: IPrismaError = {
	// 	message: error.message,
	// };
	return httpResponse(400);
}
