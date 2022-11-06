import { Router } from 'express';
import controller from '../controllers/companies_staff.controller';

const router: Router = Router();

router.post('/', controller.store);
router.post('/:id', controller.delete);

export default router;
