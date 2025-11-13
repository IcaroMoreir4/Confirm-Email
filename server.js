import express from "express";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { createUser, findUserByEmail, verifyUser } from "./users.js";

dotenv.config();
const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (findUserByEmail(email)) {
    return res.status(400).json({ message: "E-mail já registrado!" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = createUser(name, email, hashedPassword);

  // Gera token de verificação
  const token = jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  const verifyLink = `${process.env.BASE_URL}/verify-email?token=${token}`;

  // Envia o e-mail
  await transporter.sendMail({
    from: `"Equipe Js System" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Confirme seu e-mail",
    html: `
      <h2>Olá, ${name}!</h2>
      <p>Clique no link abaixo para confirmar seu e-mail:</p>
      <a href="${verifyLink}" target="_blank">${verifyLink}</a>
    `,
  });

  res.json({ message: "E-mail de verificação enviado!" });
});

// Rota de verificação
app.get("/verify-email", (req, res) => {
  const token = req.query.token;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    verifyUser(decoded.email);
    return res.send(
      "<h2>E-mail verificado com sucesso! Você já pode fazer login.</h2>"
    );
  } catch (err) {
    return res.status(400).send("<h2>Link inválido ou expirado.</h2>");
  }
});

app.listen(3000, () =>
  console.log("Servidor rodando em http://localhost:3000")
);
