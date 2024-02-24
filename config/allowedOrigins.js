// do not leave "/" at the end of links breaks cors
const allowedOrigins = [
  "https://www.passwordmanager-test.dev",
  "passwordmanager-test.dev",
  "passwordmanager-backend.onrender.com",
  "https://passwordmanager-backend.onrender.com",
  "https://api.passwordmanager-test.dev",

  "https://www.passwordmanager-test.dev",
  "https://passwordmanager-frontend.onrender.com",
  "https://www.passwordmanager-test.dev",
  // "http://127.0.0.1:5173",
  // "http://localhost:5173",
];

export default allowedOrigins;
