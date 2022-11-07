import { companies, staff, users } from '@prisma/client';
import { DAOCompanyStaffUser } from '../dao/companyStaffUser.dao';
import { DTOCompanyStaffUser } from '../dto/companyStaffUser.dto';

class Mapper {
	toPersistence(data: DTOCompanyStaffUser): DAOCompanyStaffUser {
		return {
			company: {
				com_nit: data.nit,
				com_name: data.companyName,
				com_address: data.address,
				com_cty_id: data.city,
				com_created_at: null!,
				com_updated_at: null,
				com_deleted_at: null,
			},
			user: {
				usr_id: null!,
				username: data.username,
				email: data.userEmail,
				password: data.password,
				about_me: data.aboutMe!,
				usr_rol_id: data.role,
				usr_created_at: null!,
				usr_updated_at: null,
				usr_deleted_at: null,
			},
			legal_representative: {
				stf_id: null!,
				stf_ced: data.repCed,
				stf_name: data.repName,
				stf_lastname: data.repLastname,
				stf_telephone: data.repTelephone,
				stf_email: data.repEmail,
				stf_jt_id: data.repJobTitle,
				stf_created_at: null!,
				stf_updated_at: null,
				stf_deleted_at: null,
			},
			human_resources: {
				stf_id: null!,
				stf_ced: data.contractorCed,
				stf_name: data.contractorName,
				stf_lastname: data.contractorLastname,
				stf_telephone: data.contractorTelephone,
				stf_email: data.contractorEmail,
				stf_jt_id: data.contractorJobTitle,
				stf_created_at: null!,
				stf_updated_at: null,
				stf_deleted_at: null,
			},
		};
	}
	toDTO(
		company: companies,
		user: users,
		rep: staff,
		staff: staff
	): DTOCompanyStaffUser {
		return {
			nit: company.com_nit,
			companyName: company.com_name,
			address: company.com_address,
			city: company.com_cty_id,
			username: user.username,
			userEmail: user.email,
			password: user.password,
			aboutMe: user.about_me!,
			role: user.usr_rol_id,
			repId: rep.stf_id | null!,
			repCed: rep.stf_ced,
			repName: rep.stf_name,
			repLastname: rep.stf_lastname,
			repTelephone: rep.stf_telephone,
			repEmail: rep.stf_email,
			repJobTitle: rep.stf_jt_id,
			contractorId: staff.stf_id | null!,
			contractorCed: staff.stf_ced,
			contractorName: staff.stf_name,
			contractorLastname: staff.stf_lastname,
			contractorTelephone: staff.stf_telephone,
			contractorEmail: staff.stf_email,
			contractorJobTitle: staff.stf_jt_id,
		};
	}
}

export default new Mapper();
