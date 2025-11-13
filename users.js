// Simulação simples de armazenamento em memória
const users = [];

export function createUser(name, email, password) {
  const user = {
    id: users.length + 1,
    name,
    email,
    password,
    isVerified: false,
  };
  users.push(user);
  return user;
}

export function findUserByEmail(email) {
  return users.find((u) => u.email === email);
}

export function verifyUser(email) {
  const user = findUserByEmail(email);
  if (user) user.isVerified = true;
  return user;
}
