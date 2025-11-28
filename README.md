# HSCare - Backend API

O **HSCare Backend** é uma API RESTful robusta desenvolvida para gerenciar os dados do aplicativo de saúde HSCare. Ele utiliza uma arquitetura em camadas (Routes-Controllers-Services) para garantir escalabilidade, segurança e fácil manutenção.

## 🚀 Tecnologias Utilizadas

- **Node.js** & **Express**: Base do servidor.
- **TypeScript**: Para tipagem estática e segurança de código.
- **MongoDB Atlas** & **Mongoose**: Banco de dados NoSQL na nuvem.
- **GridFS**: Armazenamento de arquivos (documentos e imagens) dentro do MongoDB.
- **JWT (JSON Web Tokens)**: Autenticação segura.
- **Google Gemini API**: Integração de Inteligência Artificial para o assistente virtual.

## 📂 Estrutura do Projeto

```text
src/
├── config/         # Configuração do banco de dados (db.ts)
├── controllers/    # Orquestração das requisições (recebe req/res e chama services)
├── middleware/     # Proteção de rotas (auth) e tratamento de erros
├── models/         # Schemas do Mongoose (User, Agendamentos, Documentos, etc.)
├── routes/         # Definição das rotas da API
├── services/       # Lógica de negócio e comunicação com o DB/APIs externas
└── server.ts       # Ponto de entrada da aplicação
```

# Iniciando o serviço do Back-end

1. Instalar as dependencias

   ```bash
   npm install
   ```

2. Iniciar o serviço

   ```bash
   npm start
   ```
