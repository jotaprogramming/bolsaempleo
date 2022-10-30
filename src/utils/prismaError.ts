import messages from '../settings/settings.json';
import defaultErrors from '../settings/prisma-errors.json';
import { IPrismaError } from '../interfaces/error.interface';
import { IResult } from '../interfaces/model.interfaces';
import httpResponse from './httpResponse';

export default function prismaError(error: any): IResult {
	let result: IPrismaError = {
		code: error.code,
	};
	switch (error.code) {
		case 'P2002':
			result['message'] =
				messages.errors.unique || defaultErrors.codes.P2002;
			break;
		case 'P2025':
			result['message'] =
				messages.errors.not_found || defaultErrors.codes.P2025;
			break;
	}
	return httpResponse(400, result);
}
