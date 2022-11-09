import { Request, Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';

const json_settings = fs.readFileSync(
	path.join(__dirname, '../settings/settings.json'),
	'utf-8'
);
// const settings = JSON.parse(json_settings);

class Controller {
	findAll(req: Request, res: Response) {
		res.json(JSON.parse(json_settings));
	}
	update(req: Request, res: Response) {
		const body: {} = req.body;
		const new_settings = JSON.stringify(body);
		fs.writeFileSync(
			path.join(__dirname, '../settings/settings.json'),
			new_settings,
			'utf-8'
		);
		res.json(new_settings);
	}
}

export default new Controller();
