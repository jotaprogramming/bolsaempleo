import { cities, countries, district } from '@prisma/client';
import { TDistrict } from './district.type';

export type TCities = cities & { district: TDistrict };
