import { Request, Response } from 'express';
import {
	IFindAll,
	IFindOne,
	IStore,
	IUpdate,
	IDelete,
} from '../helpers/interfaces/controller.interfaces';
import Model from '../models/companies.model';
import { companies } from '@prisma/client';
import { IResult } from '../helpers/interfaces/result.interface';
import { DTOCompany } from '../helpers/dto/company.dto';

class Controller
	implements
		IFindAll<Request, Response>,
		IFindOne<Request, Response>,
		IUpdate<Request, Response>,
		IDelete<Request, Response>
{
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
		const body: DTOCompany = req.body;
		const data: IResult = await Model.update(parseInt(id), body);
		res.status(data.status).json(data.result);
	}
	async delete(req: Request, res: Response): Promise<void> {
		const id: string = req.params.id;
		const data: IResult = await Model.delete(parseInt(id));
		res.status(data.status).json(data.result);
	}
}

export default new Controller();
