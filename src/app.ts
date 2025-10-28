import fastify from "fastify";
import { env } from "./env/index.js";
import { transactionsRoutes } from "./routes/transactions.js";
import cookie from "@fastify/cookie";

export const app = fastify();

app.register(cookie);

app.addHook('preHandler', async (request, reply) => {
	console.log(`${request.method} ${request.url} - ${reply.statusCode}`);
});
app.register(transactionsRoutes, {
	prefix: 'transactions'
});