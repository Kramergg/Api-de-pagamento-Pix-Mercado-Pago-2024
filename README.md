# 🔰 API DE PAGAMENTO MERCADO PAGO EM NODEJS -💰 PIX - 2024 🔰

## PASSOS INICIAIS:

### 📁DEPENDÊNCIAS: 

- `npm install` para instalar todas as dependências do projeto.
- modificar o arquivo `example.env` para `.env`.
  
### 🔧CONFIGURAÇÃO - dentro do `.env` modifique:

- `DATABASE_URL` com as informações do seu banco dados.
- `ACCESS_TOKEN` com o token que o mercado pago fornece para você no painel developers.
- `WEBHOOK_URL` o dominio de sua API para o mercado pago enviar os eventos sobre os pagamentos.
  
### 🔮BANCO DE DADOS COM PRISMA ORM:

- Faça o seguinte comando no seu terminal `npx prisma migrate dev`
- Você pode executar em um terminal separado o seguinte comando: `npx prisma studio`. isso criará uma interface na web que você poderá ver a tabela, campo(coluna) e os dados de pagamento.
  
### 🔰 ROTAS HTTP:

### 🟢 GET 

- `https://{dominio}.com` Página Home de sua API.
- `https://{dominio}.com/v1/webhook/:id` Verifica o Status de um pagamento especifico.

### 🟡 POST 
- `https://{dominio}.com/v1/payments` Gera um novo pagamento Pix.
- `https://{dominio}.com/v1/webhook/` URL aonde o mercado pago enviará eventos sobre o pagamento criado.

### 🐳 USANDO O DOCKER PARA CRIAR BANCO DE DADOS ( OPCIONAL ):
- Se estiver com o docker instalado em seu computador, poderá executar o seguinte comando para criar um banco de dados: `docker compose up`
  

## Features

- ✅ Gera novos pagamentos PIX
- ✅ verifica um status de um pagamento especifico.
- ✅ recebe eventos via webhook do Mercado Pago

  ## 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

- `NODEJS`


## 😯 Como contribuir para o projeto

1. Faça um **fork** do projeto.
2. Crie uma nova branch com as suas alterações: `git checkout -b my-feature`
3. Salve as alterações e crie uma mensagem de commit contando o que você fez: `git commit -m "feature: My new feature"`
4. Envie as suas alterações: `git push origin my-feature`
> Caso tenha alguma dúvida confira este [guia de como contribuir no GitHub](https://github.com/firstcontributions/first-contributions)


## 📝 Licença

Este projeto esta sobe a licença MIT.

Feito com ❤️ por Gabriel Kramer 👋🏽 [Entre em contato!](https://www.linkedin.com/in/gabriel-kramer-565573213/)
