import { it, beforeAll, afterAll, describe, expect, beforeEach } from 'vitest';
import request from 'supertest';
import { execSync } from 'node:child_process';
import { app } from '../src/app.js';
import { afterEach } from 'node:test';

describe('Transactions routes', async () => {
	beforeAll(async () => {
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	beforeEach(async () => {
		execSync('npm run knex migrate:latest');
	});

	afterEach(async () => {
		execSync('npm run knex migrate:rollback --all');
	});

	it('should be able to create a new transaction', async () => {
		await request(app.server)
			.post('/transactions')
			.send({
				title: 'New Transaction',
				amount: 500,
				type: 'credit'
			})
			.expect(201);
	});

	it('should be able to list all transactions', async () => {
		const createTransactionResponse = await request(app.server)
			.post('/transactions')
			.send({
				title: 'New Transaction',
				amount: 500,
				type: 'credit'
			});
		
		const cookies = createTransactionResponse.get('Set-Cookie');

		if (!cookies) {
			throw new Error('No cookies received');
		}

		const listTransactionsResponse = await request(app.server)
			.get('/transactions')
			.set('Cookie', cookies)
			.expect(200);

		expect(listTransactionsResponse.body.transactions).toEqual([
			expect.objectContaining({
				title: 'New Transaction',
				amount: 500,
			})
		]);
	});

	it('should be able to list a specific transaction', async () => {
		const createTransactionResponse = await request(app.server)
			.post('/transactions')
			.send({
				title: 'New Transaction',
				amount: 500,
				type: 'credit'
			});
		
		const cookies = createTransactionResponse.get('Set-Cookie');

		if (!cookies) {
			throw new Error('No cookies received');
		}

		const listTransactionsResponse = await request(app.server)
			.get('/transactions')
			.set('Cookie', cookies)
			.expect(200);

		const transactionId = listTransactionsResponse.body.transactions[0].id;

		const getTransactionResponse = await request(app.server)
			.get(`/transactions/${transactionId}`)
			.set('Cookie', cookies)
			.expect(200);

		expect(getTransactionResponse.body.transaction).toEqual(
			expect.objectContaining({
				title: 'New Transaction',
				amount: 500,
			})
		);
	});

	it('should be able to get the summary', async () => {
		const createCreditTransactionResponse = await request(app.server)
			.post('/transactions')
			.send({
				title: 'New Transaction',
				amount: 500,
				type: 'credit'
			});
		
		const cookies = createCreditTransactionResponse.get('Set-Cookie');

		if (!cookies) {
			throw new Error('No cookies received');
		}

		const createDebitTransactionResponse = await request(app.server)
			.post('/transactions')
			.set('Cookie', cookies)
			.send({
				title: 'New Transaction',
				amount: 250,
				type: 'debit'
			});

		const summaryTransactionsResponse = await request(app.server)
			.get('/transactions/summary')
			.set('Cookie', cookies)
			.expect(200);

		expect(summaryTransactionsResponse.body.summary).toEqual(
			{
				amount: 250
			}
		);
	});
});