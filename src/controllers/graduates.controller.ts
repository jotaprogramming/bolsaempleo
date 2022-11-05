import { Request, Response } from 'express';
import {
	IFindAll,
	IFindOne,
	IStore,
	IUpdate,
	IDelete,
} from '../interfaces/controller.interfaces';
import Model from '../models/graduates.model';
import { graduates } from '@prisma/client';
import { IResult } from '../interfaces/result.interface';

class companiesController
	implements
		IFindAll<Request, Response>,
		IStore<Request, Response>,
		IFindOne<Request, Response>,
		IUpdate<Request, Response>,
		IDelete<Request, Response>
{
	async store(req: Request, res: Response): Promise<void> {
		const body: graduates = req.body;
		const data: IResult = await Model.store(body);
		res.status(data.status).json(data.result);
	}
	async findAll(_: Request, res: Response): Promise<void> {
		const data: IResult = await Model.findAll();
		res.status(data.status).json(data.result);
	}
	async findOne(req: Request, res: Response): Promise<void> {
		const id: string = req.params.id;
		const data: IResult = await Model.findOne(parseInt(id));
		res.status(data.status).json(data.result);
	}
	async update(req: Request, res: Response): Promise<void> {
		const id: string = req.params.id;
		const body: graduates = req.body;
		const data: IResult = await Model.update(parseInt(id), body);
		res.status(data.status).json(data.result);
	}
	async delete(req: Request, res: Response): Promise<void> {
		const id: string = req.params.id;
		const data: IResult = await Model.delete(parseInt(id));
		res.status(data.status).json(data.result);
	}
}

export default new companiesController();
