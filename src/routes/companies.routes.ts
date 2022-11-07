import { Router } from 'express';
import controller from '../controllers/companies.controller';
import controllerCompanyStaffUser from '../controllers/companyStaffUser.controller';

const router: Router = Router();

router.get('/', controller.findAll);
router.post('/', controllerCompanyStaffUser.store);
router.get('/:id', controller.findOne);
router.put('/:id', controller.update);
router.post('/:id', controller.delete);

export default router;
