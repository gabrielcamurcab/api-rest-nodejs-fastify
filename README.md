# API de Transações Financeiras
por Gabriel Camurça

## Stacks e Princpais Libs
- NodeJS
- Fastify
- Knex
- Zod
- SQLite

## Requisitos e Regras de Negócio

### Requisitos Funcionais

- [x] O usuário deve poder criar uma nova transação;
- [x] O usuário deve poder obter um resumo de sua conta;
- [x] O usuário deve poder listar todas as transações que já ocorreram;
- [x] O usuário deve poder visualizar uma transação única.

### Regras de Negócio

- [x] A transação pode ser do tipo crédito (soma ao valor total) ou débito (subtrai do valor total);
- [x] Deve ser possível identificarmos o usuário a cada transação;
- [x] O usuário só pode visualizar as transações que ele criou.