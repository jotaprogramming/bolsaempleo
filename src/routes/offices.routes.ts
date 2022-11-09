import { Router } from 'express';
import controller from '../controllers/offices.controller';

const router: Router = Router();

router.get('/', controller.findAll);
router.post('/', controller.store);
router.get('/:id', controller.findOne);
router.put('/:id', controller.update);
router.post('/:id', controller.delete);

export default router;
