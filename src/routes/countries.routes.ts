import { Router, Request, Response } from 'express';
import Controller from '../controllers/countries.controller';

const router: Router = Router();

router.get('/', Controller.findAll);
router.post('/', Controller.store);
router.get('/:id', Controller.findOne);
router.put('/:id', Controller.update);
router.delete('/:id', Controller.destroy);

export default router;
