import { contact, staff } from '@prisma/client';
import verifyEmail from './email';
import { objectCapitalize } from './formatting';
import { IMessage, IResult } from '../helpers/interfaces/result.interface';
import numberSize from './numberSize';
import { IContactDTO } from '../helpers/interfaces/contact.interface';

export async function validateStaff(body: staff): Promise<staff | IMessage> {
	const data: staff = body;
	const names = await objectCapitalize({
		stf_name: body.stf_name,
		stf_lastname: body.stf_lastname,
	});
	const isEmail = verifyEmail(data.stf_email);
	if (!isEmail) {
		return {
			message: `¡El valor (${data.stf_email}) ingresado no es un correo electrónico!`,
			field: 'stf_email',
		};
	}
	const rangePhone = numberSize(data.stf_telephone, 7, 10);
	if (rangePhone) {
		return {
			message: rangePhone,
			field: 'telephone',
		};
	}
	data['stf_name'] = names.stf_name;
	data['stf_lastname'] = names.stf_lastname;
	return data;
}

export async function validateContact(
	body: contact
): Promise<contact | IMessage> {
	const email: string = body.con_email;
	const phone: number = body.con_phone;
	const telephone: string = body.con_telephone;
	const isEmail = verifyEmail(email);
	if (!isEmail) {
		return {
			message: '¡El valor ingresado no es un correo electrónico!',
			field: 'con_email',
		};
	}
	const rangePhone = numberSize(phone, 7, 7);
	if (rangePhone) {
		return {
			message: rangePhone,
			field: 'con_phone',
		};
	}
	const rangeTelephone = numberSize(telephone, 10, 10);
	if (rangeTelephone) {
		return {
			message: rangeTelephone,
			field: 'con_telephone',
		};
	}
	return body;
}
