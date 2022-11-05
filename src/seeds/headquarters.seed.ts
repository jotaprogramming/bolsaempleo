import { headquarters, contact, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function main() {
	const contact: contact = await prisma.contact.upsert({
		where: { con_id: 1 },
		update: {},
		create: {
			con_email: 'help@example.io',
			con_phone: 6401122,
			con_telephone: 3001112222,
		},
	});
	const place: headquarters = await prisma.headquarters.upsert({
		where: { hq_id: 1 },
		update: {},
		create: {
			hq_address: '123 street',
			hq_cty_id: 1,
			hq_con_id: 1,
		},
	});
}
