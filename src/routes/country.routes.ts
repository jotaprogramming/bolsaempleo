import { Router, Request, Response } from 'express';
import CountriesController from '../controllers/countries.controller';

const router: Router = Router();

router.get('/', CountriesController.findAll);

export default router;
