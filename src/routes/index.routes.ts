import { Router, Request, Response } from 'express';

const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
	res.render('pages/index.ejs', { title: 'Index' });
});

export default router;
