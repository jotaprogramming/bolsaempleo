import Server from '../index';
import request from 'supertest';

const app = Server.app;

const company = {
	nit: 4444,
	companyName: 'test SAS',
	address: '123 street',
	city: 1,
	username: 'test2',
	userEmail: 'test2@example.io',
	password: '123',
	aboutMe: 'Soy una empresa',
	role: 4,
	staff: [
		{
			idCard: 3333,
			name: 'Antonia',
			lastname: 'Benitez',
			telephone: '3001112222',
			email: 'antonia@example.io',
			jobTitle: 1,
		},
		{
			idCard: 4444,
			name: 'Josefina',
			lastname: 'Maldonado',
			telephone: '3002221111',
			email: 'josefina@example.io',
			jobTitle: 2,
		},
	],
};

describe('GET /companies', () => {
	test('should respond with a 200 status code', async () => {
		const response = await request(app).get('/companies').send();
		expect(response.statusCode).toBe(200);
	});

	test('should respond with a 201 status code', async () => {
		const response = await request(app).post('/companies').send(company);
		expect(response.statusCode).toBe(201);
	});
});

describe('GET /cities', () => {
	test('should respond with a 200 status code', async () => {
		const response = await request(app).get('/cities').send();
		expect(response.statusCode).toBe(200);
	});
});

describe('GET /contact', () => {
	test('should respond with a 204 status code', async () => {
		const response = await request(app).get('/contact').send();
		expect(response.statusCode).toBe(204);
	});
});

describe('GET /countries', () => {
	test('should respond with a 200 status code', async () => {
		const response = await request(app).get('/countries').send();
		expect(response.statusCode).toBe(200);
	});
});

describe('GET /districts', () => {
	test('should respond with a 200 status code', async () => {
		const response = await request(app).get('/districts').send();
		expect(response.statusCode).toBe(200);
	});
});

describe('GET /graduates', () => {
	test('should respond with a 204 status code', async () => {
		const response = await request(app).get('/graduates').send();
		expect(response.statusCode).toBe(204);
	});
});

describe('GET /offices', () => {
	test('should respond with a 204 status code', async () => {
		const response = await request(app).get('/offices').send();
		expect(response.statusCode).toBe(204);
	});
});

describe('GET /settings', () => {
	test('should respond with a 200 status code', async () => {
		const response = await request(app).get('/settings').send();
		expect(response.statusCode).toBe(200);
	});
});
