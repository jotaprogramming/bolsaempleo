import messages from '../settings/settings.json';
import defaultErrors from '../settings/prisma-errors.json';
import { IPrismaError } from '../interfaces/error.interface';
import { IResult } from '../interfaces/result.interface';
import httpResponse from './httpResponse';

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

export function validationError(error: any): IResult {
	// let result: IPrismaError = {
	// 	message: error.message,
	// };
	return httpResponse(400);
}
