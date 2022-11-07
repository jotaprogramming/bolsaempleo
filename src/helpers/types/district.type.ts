import { countries, district } from '@prisma/client';

export type TDistrict = district & {
	countries: countries;
};
