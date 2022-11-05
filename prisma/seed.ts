import hqMain from '../src/seeds/headquarters.seed'
import usMain from '../src/seeds/users.seed'

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

hqMain()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});

usMain()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});