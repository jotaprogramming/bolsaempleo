import { companies, companies_staff, staff } from '@prisma/client';

export interface ICompanies extends companies, companies_staff, staff {}
