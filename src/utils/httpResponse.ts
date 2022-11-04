import { IResult } from '../interfaces/result.interface';
import { ReasonPhrases } from 'http-status-codes';

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
