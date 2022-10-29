import dotenv from 'dotenv';

dotenv.config();

export const env = {
	development: {
		PORT: process.env.PORT || 3000,
		LOGGER: 'dev',
	},
};
