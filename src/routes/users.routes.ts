import { Router, Request, Response } from 'express';
import controller from '../controllers/users.controller';

const router: Router = Router();

router.get('/login', controller.renderLogin);
router.post('/auth', controller.auth);
router.get('/users', controller.findAll);
router.post('/users', controller.store);
router.get('/users/:id', controller.findOne);
router.put('/users/:id', controller.update);
router.post('/users/:id', controller.delete);
router.delete('/users/:id', controller.destroy);

export default router;
