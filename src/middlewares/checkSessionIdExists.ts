import { FastifyReply, FastifyRequest } from "fastify";

export async function checkSessionIdExists(request: FastifyRequest, reply: FastifyReply) {
  	console.log('PreHandler executado');
  	console.log('Cookies:', request.cookies);
  
  	const sessionId = request.cookies.sessionId;
  	console.log('SessionId:', sessionId);
  
  	if (!sessionId) {
    	console.log('Não autorizado');
    	return reply.status(401).send({
      	error: 'Unauthorized'
    	});
  	}
  
  	console.log('Autorizado, continuando...');
}