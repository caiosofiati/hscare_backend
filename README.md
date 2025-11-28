# 🌱 HSCare - Backend API

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

## 🛠️ Pré-requisitos
```
- Node.js instalado.

- Conta no MongoDB Atlas.

- Chave de API do Google AI Studio (para o Gemini).
```
## ⚙️ Instalação e Configuração
```
Clone o repositório e entre na pasta do backend:
cd hscare_backend

Instale as dependências:
npm install

Configure as Variáveis de Ambiente: 
Crie um arquivo .env na raiz da pasta backend e adicione as seguintes chaves:

PORT=5000
MONGO_URI="sua_string_de_conexao_mongodb_atlas"
GEMINI_API_KEY="sua_chave_api_do_google_gemini"
Inicie o Servidor:
```

## 🖥️ Iniciando o serviço do Back-End
```
npm run dev
O servidor rodará em http://localhost:5000.
```

## 📡 Endpoints Principais
```
- Autenticação

POST /auth/register - Criar nova conta.
POST /auth/login - Fazer login (retorna Token).
GET /auth/me - Obter dados do perfil.

- Agendamentos
GET /agendamentos - Listar compromissos.
POST /agendamentos - Criar compromisso.
PUT /agendamentos/:id - Atualizar compromisso.-
DELETE /agendamentos/:id - Deletar compromisso.

- Documentos (GridFS)
POST /documents/upload - Upload de arquivo (Multipart/form-data).
GET /documents - Listar metadados dos documentos.
GET /documents/file/:fileId - Visualizar/Baixar arquivo.

- IA (HS Helper)
POST /ia/chat - Enviar pergunta para o assistente.
```

## 🧪 Testes
```
Recomenda-se utilizar o Postman ou Insomnia para testar as rotas. Lembre-se de incluir o Authorization: Bearer <SEU_TOKEN> no cabeçalho das rotas protegidas.
```
