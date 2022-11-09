import { companies } from '@prisma/client';
import { DTOResCompany } from '../dto/company.dto';
import { TCompany } from '../types/company.type';
import cityMapper from './city.mapper';
import staffMapper from './staff.mapper';
import userMapper from './user.mapper';
import { DTOResCompanyStaffUser } from '../dto/companyStaffUser.dto';

class Mapper {
	toDTO(company: TCompany): DTOResCompanyStaffUser {
		return {
			nit: company.com_nit,
			companyName: company.com_name,
			address: company.com_address,
			createdAt: company.com_created_at,
			updatedAt: company.com_updated_at!,
			deletedAt: company.com_deleted_at!,
			city: cityMapper.toDTO(company.cities),
			user: userMapper.toDTO(company.users_companies[0].users),
			staff: company.companies_staff.map((item) => {
				return staffMapper.toDTO(item.staff);
			}),
			// staff: {
			// 	legalRepresentative: staffMapper.toDTOLegalRepresentative(
			// 		company.companies_staff[0].staff
			// 	),
			// 	humanResource: staffMapper.toDTOHumanResource(
			// 		company.companies_staff[1].staff
			// 	),
			// },
		};
	}
}

export default new Mapper();
