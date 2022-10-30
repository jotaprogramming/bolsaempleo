import { Router, Request, Response } from 'express';
import CountriesController from '../controllers/countries.controller';

const router: Router = Router();

router.get('/', CountriesController.findAll);
router.post('/', CountriesController.store);
router.get('/:id', CountriesController.findOne);
router.put('/:id', CountriesController.update);
router.delete('/:id', CountriesController.destroy);

export default router;
