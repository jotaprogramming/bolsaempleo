import { companies } from '@prisma/client';
import { DTOCompany } from '../dto/company.dto';

class Mapper {
	toPersistence(data: DTOCompany): companies {
		return {
			com_nit: data.nit,
			com_name: data.companyName,
			com_address: data.address,
			com_cty_id: data.city,
			com_created_at: null!,
			com_updated_at: null,
			com_deleted_at: null,
		};
	}
	toDTO(company: companies): DTOCompany {
		return {
			nit: company.com_nit,
			companyName: company.com_name,
			address: company.com_address,
			city: company.com_cty_id,
		};
	}
}

export default new Mapper();
