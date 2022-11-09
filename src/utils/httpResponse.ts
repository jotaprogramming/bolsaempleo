import { IResult } from '../helpers/interfaces/result.interface';
import { ReasonPhrases } from 'http-status-codes';

/**
 * It returns an object with a status and a result property.
 *
 * The status property is set to the status argument.
 *
 * The result property is set to the result argument if it is provided, otherwise it is set to an empty
 * object.
 *
 * If the status argument is 200, the result property is set to the result argument.
 *
 * If the status argument is 201, the result property is set to an object with a reason property set to
 * the string 'Created'.
 *
 * If the status argument is 204, the result property is set to an object with a reason property set to
 * the string 'No Content'.
 *
 * If the status argument is 400, the result property is set to an object with a reason property set to
 * the string 'Bad Request'.
 *
 * If the status argument is 404, the result property is set to an object with a reason
 * @param {number} status - number - The HTTP status code
 * @param [result] - {
 * @returns IResult
 */
export default function httpResponse(status: number, result?: {}): IResult {
	let body: IResult = {
		status: status,
		result: {},
	};
	switch (status) {
		case 200:
			body['result'] = result!;
			break;
		case 201:
			body['result'] = { reason: ReasonPhrases.CREATED };
			break;
		case 204:
			body['result'] = { reason: ReasonPhrases.NO_CONTENT };
			break;
		case 400:
			body['result'] = { ...result, reason: ReasonPhrases.BAD_REQUEST };
			break;
		case 404:
			body['result'] = { reason: ReasonPhrases.NOT_FOUND };
			break;
	}
	return body;
}
