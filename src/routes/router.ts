import { Express } from "express";
import indexRoutes from './index.routes';

const router = (app: Express) => {
    app.use(indexRoutes);
}

export default router;