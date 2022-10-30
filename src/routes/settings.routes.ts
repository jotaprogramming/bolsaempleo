import { Router, Request, Response } from 'express';
import settingsController from '../controllers/settings.controller';

const router: Router = Router();

router.get('/', settingsController.findAll);
router.put('/', settingsController.update);

export default router;
