import prisma from '../config/db';
import {
	IFindAll,
	IStore,
	IUpdate,
	IFindOne,
	IDelete,
} from '../helpers/interfaces/repositories.interface';
import { users } from '@prisma/client';
import '../helpers/middlewares/encrypt';

class UsersRepository
	implements
		IStore<users>,
		IFindAll<users>,
		IFindOne<number, users>,
		IUpdate<number, users>,
		IDelete<number, users>
{
	async store(data: users): Promise<users> {
		return await prisma.users.create({
			data: data,
		});
	}
	async matchEmail(email: string): Promise<users | null> {
		return await prisma.users.findUnique({
			where: {
				email,
			},
		});
	}
	async matchUsername(username: string): Promise<users | null> {
		return await prisma.users.findUnique({
			where: {
				username,
			},
		});
	}
	async findAll(): Promise<Array<users>> {
		return await prisma.users.findMany({
			orderBy: {
				username: 'asc',
			},
		});
	}
	async findOne(id: number): Promise<users | null> {
		return await prisma.users.findUnique({
			where: {
				usr_id: id,
			},
		});
	}
	async update(id: number, data: users): Promise<users> {
		return await prisma.users.update({
			where: {
				usr_id: id,
			},
			data: data,
		});
	}
	async delete(id: number): Promise<users> {
		return await prisma.users.update({
			where: {
				usr_id: id,
			},
			data: {
				usr_deleted_at: new Date(Date.now()),
			},
		});
	}
}

export default new UsersRepository();
