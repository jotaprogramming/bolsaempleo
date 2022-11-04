import prisma from '../config/db';
import bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';

prisma.$use(async (params: Prisma.MiddlewareParams, next: any) => {
	if (params.model === 'users' && params.action === 'create') {
		const password = params.args.data.password;
		params.args.data.password = bcrypt.hashSync(password, 10);
	}
	return await next(params);
});
