import { Request, Response } from 'express';
import {
	IFindAll,
	IFindOne,
	IStore,
	IUpdate,
	IDelete,
	IDestroy,
} from '../interfaces/controller.interfaces';
import CountriesModel from '../models/countries.model';
import { countries } from '@prisma/client';
import { IResult } from '../interfaces/result.interface';

class CountriesController
	implements
		IFindAll<Request, Response>,
		IStore<Request, Response>,
		IFindOne<Request, Response>,
		IUpdate<Request, Response>,
		IDestroy<Request, Response>
{
	async store(req: Request, res: Response): Promise<void> {
		const body: countries = req.body;
		const data: IResult = await CountriesModel.store(body);
		res.status(data.status).json(data.result);
	}
	async findAll(_: Request, res: Response): Promise<void> {
		const data: IResult = await CountriesModel.findAll();
		// res.render('pages/countries/index', { result: result });
		res.status(data.status).json(data.result);
	}
	async findOne(req: Request, res: Response): Promise<void> {
		const id: string = req.params.id;
		const data: IResult = await CountriesModel.findOne(parseInt(id));
		res.status(data.status).json(data.result);
	}
	async update(req: Request, res: Response): Promise<void> {
		const id: string = req.params.id;
		const body: countries = req.body;
		const data: IResult = await CountriesModel.update(parseInt(id), body);
		res.status(data.status).json(data.result);
	}
	async destroy(req: Request, res: Response): Promise<void> {
		const id: string = req.params.id;
		const data: IResult = await CountriesModel.destroy(parseInt(id));
		res.status(data.status).json(data.result);
	}
}

export default new CountriesController();
