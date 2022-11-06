import { Request, Response } from 'express';
import {
	IFindAll,
	IFindOne,
	IStore,
	IUpdate,
	IDestroy,
} from '../helpers/interfaces/controller.interfaces';
import Model from '../models/cities.model';
import { cities } from '@prisma/client';
import { IResult } from '../helpers/interfaces/result.interface';

class Controller
	implements
		IFindAll<Request, Response>,
		IStore<Request, Response>,
		IFindOne<Request, Response>,
		IUpdate<Request, Response>,
		IDestroy<Request, Response>
{
	async store(req: Request, res: Response): Promise<void> {
		const body: cities = req.body;
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
		const body: cities = req.body;
		const data: IResult = await Model.update(parseInt(id), body);
		res.status(data.status).json(data.result);
	}
	async destroy(req: Request, res: Response): Promise<void> {
		const id: string = req.params.id;
		const data: IResult = await Model.destroy(parseInt(id));
		res.status(data.status).json(data.result);
	}
}

export default new Controller();
