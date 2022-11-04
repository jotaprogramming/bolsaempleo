import prisma from '../config/db';
import {
	IFindAll,
	IStore,
	IUpdate,
	IFindOne,
	IDestroy,
} from '../interfaces/repositories.interface';
import { users } from '@prisma/client';
import '../utils/encrypt';

class UsersRepository
	implements
		IStore<users>,
		IFindAll<users>,
		IFindOne<number, users>,
		IUpdate<number, users>,
		IDestroy<number, users>
{
	async store(body: users): Promise<users> {
		return await prisma.users.create({
			data: body,
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
	async destroy(id: number): Promise<users> {
		return await prisma.users.delete({
			where: {
				usr_id: id,
			},
		});
	}
}

export default new UsersRepository();
