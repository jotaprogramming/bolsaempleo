import { staff } from '@prisma/client';
import { DTOHumanResource, DTOLegalRepresentative } from '../dto/staff.dto';

class Mapper {
	toDTOHumanResource(data: staff): DTOHumanResource {
		return {
			contractorId: data.stf_id,
			contractorCed: data.stf_ced,
			contractorName: data.stf_name,
			contractorLastname: data.stf_lastname,
			contractorTelephone: data.stf_telephone,
			contractorEmail: data.stf_email,
			contractorJobTitle: data.stf_jt_id,
			contractorCreatedAt: data.stf_created_at,
			contractorUpdatedAt: data.stf_updated_at!,
			contractorDeletedAt: data.stf_deleted_at!,
		};
	}
	toDTOLegalRepresentative(data: staff): DTOLegalRepresentative {
		return {
			repId: data.stf_id,
			repCed: data.stf_ced,
			repName: data.stf_name,
			repLastname: data.stf_lastname,
			repTelephone: data.stf_telephone,
			repEmail: data.stf_email,
			repJobTitle: data.stf_jt_id,
			repCreatedAt: data.stf_created_at,
			repUpdatedAt: data.stf_updated_at!,
			repDeletedAt: data.stf_deleted_at!,
		};
	}
}

export default new Mapper();
