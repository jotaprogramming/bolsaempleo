import { users } from '@prisma/client';
import { Request, Response } from 'express';
import {
	IFindAll,
	IFindOne,
	IStore,
	IUpdate,
	IDelete,
} from '../helpers/interfaces/controller.interfaces';
import { IResult } from '../helpers/interfaces/result.interface';
import Model from '../models/users.model';

class Controller
	implements
		IFindAll<Request, Response>,
		IStore<Request, Response>,
		IFindOne<Request, Response>,
		IUpdate<Request, Response>,
		IDelete<Request, Response>
{
	renderLogin(req: Request, res: Response) {
		res.render('pages/auth/login', {
			view: 'login',
			title: 'login',
			headline: 'INICIO DE SESIÓN',
			subtitle: 'Por favor, ingrese sus credenciales',
			warning:
				'Recuerde que puede usar tanto su correo electrónico como su usuario',
		});
	}
	async auth(req: Request, res: Response) {
		const { username, password } = req.body;
		const data: IResult = await Model.match(username, password);
		res.status(data.status).json(data.result);
	}
	async store(req: Request, res: Response): Promise<void> {
		const body: users = req.body;
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
		const body: users = req.body;
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
