# Sistema de Confirmação de E-mail

Este projeto implementa **autenticação com verificação de e-mail**, utilizando **Node.js**, **Express**, **Nodemailer**, **JWT** e **bcrypt**.

O fluxo é o seguinte:

1. O usuário se registra com nome, e-mail e senha.
2. O servidor gera um **token JWT** e envia um link de verificação por e-mail.
3. Ao clicar no link, o e-mail é verificado e o usuário é liberado para login.

---

## 🚀 Tecnologias utilizadas

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Nodemailer](https://nodemailer.com/about/)
- [JWT (jsonwebtoken)](https://github.com/auth0/node-jsonwebtoken)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [dotenv](https://github.com/motdotla/dotenv)
- [cors](https://github.com/expressjs/cors)

---

## 🗂️ Estrutura do projeto

```
📁 email-verification-backend/
├── server.js          # Servidor principal (rotas e lógica de verificação)
├── users.js           # Simula banco de dados de usuários (registro e verificação)
├── .env               # Variáveis de ambiente (e-mail, senha, chave JWT etc)
├── package.json
└── node_modules/
```

---

## ⚙️ Configuração do arquivo `.env`

Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```bash
EMAIL_USER=seuemail@gmail.com
EMAIL_PASS=sua_senha_de_app
JWT_SECRET=sua_chave_jwt_segura
BASE_URL=http://localhost:3000
```

> ⚠️ **Importante:**
>
> - Use **senha de app** do Gmail, não sua senha normal.
> - Nunca envie o `.env` pro GitHub (adicione ao `.gitignore`).

---

## 📦 Instalação

1. Instale as dependências:

   ```bash
   npm install express nodemailer jsonwebtoken dotenv bcrypt cors
   ```

2. Rode o servidor:

   ```bash
   node server.js
   ```

---

## ▶️ Rotas principais

### 🧍‍♂️ `POST /register`

Cria um novo usuário e envia um e-mail de confirmação.

**Body esperado (JSON):**

```json
{
  "name": "SeuNome",
  "email": "seuNome@email.com",
  "password": "suaSenha123#"
}
```

**Resposta:**

```json
{
  "message": "E-mail de verificação enviado!"
}
```

O usuário receberá um e-mail com um link semelhante a:

```
http://localhost:3000/verify-email?token=eyJhbGciOiJIUzI1...
```

---

### ✉️ `GET /verify-email`

Valida o token JWT e confirma o e-mail do usuário.

**Exemplo de requisição:**

```
GET http://localhost:3000/verify-email?token=eyJhbGciOiJIUzI1...
```

**Respostas possíveis:**

- ✅ `E-mail verificado com sucesso!`
- ❌ `Link inválido ou expirado.`

---

## 🧠 Funcionamento passo a passo

1. O servidor recebe o `POST /register` com nome, e-mail e senha.
2. A senha é **criptografada com bcrypt** antes de ser salva.
3. É gerado um **token JWT** contendo o e-mail do usuário, com validade de 1 hora.
4. O token é enviado por e-mail dentro de um link de verificação.
5. Quando o usuário clica, o backend verifica o token e **ativa a conta**.

---

## 🔐 Segurança

- As senhas **nunca são armazenadas em texto puro** (uso de `bcrypt.hash`).
- Tokens JWT têm tempo de expiração curto (1h).
- Variáveis sensíveis (senhas, chaves, e-mails) ficam no `.env`.
- O `CORS` garante que apenas o front-end autorizado possa consumir a API.

---

---

## 👨‍💻 Desenvolvido por

**Ícaro Moreira**  
💼 Estudante de Sistemas da Informação | Desenvolvedor Full Stack em formação  
📧 Contato: [icaromoreira90@gmail.com](mailto:icaromoreira90@gmail.com)  
🌐 GitHub: [@IcaroMoreir4](https://github.com/IcaroMoreir4)

> Projeto criado para fins de estudo — sistema de verificação de e-mail com Node.js, Express e Nodemailer.
