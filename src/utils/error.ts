import {
	PrismaClientInitializationError,
	PrismaClientKnownRequestError,
	PrismaClientUnknownRequestError,
	PrismaClientValidationError,
} from '@prisma/client/runtime';
import { IResult } from '../interfaces/result.interface';
import httpResponse from './httpResponse';
import { knownRequestError, validationError } from './prismaError';

/**
 * It takes an error object and returns an object that has a status code and a message
 * @param {any} error - any
 * @returns IResult
 */
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
