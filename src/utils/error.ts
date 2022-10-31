import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { IResult } from '../interfaces/model.interfaces';
import httpResponse from './httpResponse';
import prismaError from './prismaError';

export default function typeError(error: any): IResult {
	if (error instanceof PrismaClientKnownRequestError) {
		return prismaError(error);
	}
	return httpResponse(404);
}