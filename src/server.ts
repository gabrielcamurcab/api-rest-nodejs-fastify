import fastify from "fastify";
import crypto from 'node:crypto';
import { knex } from "./database.js";
import { env } from "./env/index.js";

const app = fastify();

app.get('/hello', async () => {
	/* const transaction = await knex('transactions').insert({
		id: crypto.randomUUID(),
		title: 'Transação de teste',
		amount: 1000
	}).returning('*'); */

	const transaction = await knex('transactions').select('*');

	return transaction;
});

app.listen({
	port: env.PORT
}).then(() => {
	console.log('HTTP Server Running');
});
