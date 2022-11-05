import { Express } from 'express';
import indexRoutes from './index.routes';
import userRoutes from './users.routes';
import countryRoutes from './countries.routes';
import districtsRoutes from './districts.routes';
import citiesRoutes from './cities.routes';
import contactRoutes from './contact.routes';
import settingRoutes from './settings.routes';

/**
 * This function takes an Express app as an argument and then uses the indexRoutes middleware on it.
 * @param {Express} app - Express - This is the Express application that we are going to add our routes
 * to.
 */
const router = (app: Express) => {
	app.use(indexRoutes);
	app.use('/', userRoutes);
	app.use('/countries', countryRoutes);
	app.use('/districts', districtsRoutes);
	app.use('/cities', citiesRoutes);
	app.use('/contact', contactRoutes);
	app.use('/settings', settingRoutes);
};

export default router;
