import prisma from '../../config/db';
import bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';

/* A middleware that is used to hash the password before it is saved in the database. */
prisma.$use(async (params: Prisma.MiddlewareParams, next: any) => {
	if (params.model === 'users' && !params.args.data.usr_deleted_at) {
		if (params.action === 'create' || params.action === 'update') {
			const password = params.args.data.password;
			params.args.data.password = bcrypt.hashSync(password, 10);
		}
	}
	return await next(params);
});
