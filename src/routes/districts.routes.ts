import { Router } from 'express';
import controller from '../controllers/districts.controller';

const router: Router = Router();

router.get('/', controller.findAll);
router.post('/', controller.store);
router.get('/:id', controller.findOne);
router.put('/:id', controller.update);
router.delete('/:id', controller.destroy);

export default router;
