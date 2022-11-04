import {
	PrismaClientInitializationError,
	PrismaClientKnownRequestError,
	PrismaClientUnknownRequestError,
	PrismaClientValidationError,
} from '@prisma/client/runtime';
import { IResult } from '../interfaces/result.interface';
import httpResponse from './httpResponse';
import { knownRequestError, validationError } from './prismaError';

export default function typeError(error: any): IResult {
	if (error instanceof PrismaClientKnownRequestError) {
		return knownRequestError(error);
	}
	if (error instanceof PrismaClientUnknownRequestError) {
		return validationError(error);
	}
	if (error instanceof PrismaClientInitializationError) {
		return validationError(error);
	}
	if (error instanceof PrismaClientValidationError) {
		return validationError(error);
	}
	return httpResponse(404);
}
