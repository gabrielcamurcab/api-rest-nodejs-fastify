import { app } from "./app.js";
import { env } from "./env/index.js";

app.listen({
	port: env.PORT,
	host: env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost'
}).then(() => {
	console.log('HTTP Server Running');
});
