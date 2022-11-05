import { PrismaClient, users } from '@prisma/client';
const prisma = new PrismaClient();

export default async function main() {
	const root: users = await prisma.users.upsert({
		where: { email: 'superadmin@example.io' },
		update: {},
		create: {
			username: 'superadmin',
			email: 'superadmin@example.io',
			password: '123',
			about_me: 'Soy el superadministrador',
			roles: {
				create: {
					rol_description: 'root',
				},
			},
		},
	});
	const admin: users = await prisma.users.upsert({
		where: { email: 'admin@example.io' },
		update: {},
		create: {
			username: 'admin',
			email: 'admin@example.io',
			password: '123',
			about_me: 'Soy el administrador',
			roles: {
				create: {
					rol_description: 'admin',
				},
			},
		},
	});
	const mod: users = await prisma.users.upsert({
		where: { email: 'moderador@example.io' },
		update: {},
		create: {
			username: 'moderador',
			email: 'moderador@example.io',
			password: '123',
			about_me: 'Soy el moderador',
			roles: {
				create: {
					rol_description: 'mod',
				},
			},
		},
	});
	const loremsas: users = await prisma.users.upsert({
		where: { email: 'loremsas@example.io' },
		update: {},
		create: {
			username: 'loremsas',
			email: 'loremsas@example.io',
			password: '123',
			about_me: 'Soy Lorem SAS, una empresa',
			roles: {
				create: {
					rol_description: 'company',
				},
			},
			users_companies: {
				create: {
					companies: {
						create: {
							com_nit: 123,
							com_name: 'Lorem SAS',
							com_address: '123 street',
							com_cty_id: 1,
						},
					},
				},
			},
		},
	});
	const pepito: users = await prisma.users.upsert({
		where: { email: 'pepito@example.io' },
		update: {},
		create: {
			username: 'pepito',
			email: 'pepito@example.io',
			password: '123',
			about_me: 'Soy Pepito, graduado en sistemas',
			roles: {
				create: {
					rol_description: 'graduate',
				},
			},
			users_graduates: {
				create: {
					graduates: {
						create: {
							grd_ced: 1234,
							grd_fir_name: 'Pepe',
							grd_sec_name: 'Luis',
							grd_fir_surname: 'Pérez',
							grd_sec_surname: 'Lorem',
							grd_email: 'pepe@example.io',
							grd_cty_id: 1,
							grd_hq_id: 1,
						},
					},
				},
			},
		},
	});
}
