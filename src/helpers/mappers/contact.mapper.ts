import { contact } from '@prisma/client';
import { IContactDTO } from '../interfaces/contact.interface';

class Mapper {
	toPersistence(data: IContactDTO): contact {
		return {
			con_id: data.contactId!,
			con_email: data.contactEmail,
			con_phone: data.contactPhone,
			con_telephone: data.contactTelephone,
		};
	}
	toDTO(data: contact): IContactDTO {
		return {
			contactId: data.con_id,
			contactEmail: data.con_email,
			contactPhone: data.con_phone,
			contactTelephone: data.con_telephone,
		};
	}
}

export default new Mapper();
