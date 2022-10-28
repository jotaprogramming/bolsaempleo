import { Request, Response } from 'express';
import { IFindAll } from '../utils/interfaces/controller.interface';
import CountriesModel from '../models/countries.model';

class CountriesController implements IFindAll<Request, Response> {
	async findAll(_: Request, res: Response): Promise<void> {
		const result = await CountriesModel.findAll();
		res.render('pages/countries/index', { result: result });
	}
}

export default new CountriesController();
