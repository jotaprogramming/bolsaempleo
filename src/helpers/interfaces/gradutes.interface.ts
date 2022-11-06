import { graduates } from '@prisma/client';
export interface IGraduate extends graduates {
	city: string;
	district: string;
	country: string;
	office: string;
}
