import pool from "../config/db.js";

const userLogin = async (email) => {
  const [rows, info] = await pool.query(
    "SELECT ID, email, password FROM users WHERE email = ?",
    [email]
  );
  return rows;
};

const checkEmail = async (email) => {
  const [rows, info] = await pool.query(
    "SELECT email FROM users WHERE email = ?",
    [email]
  );
  return rows;
};

const addUser = (email, hashedPWD) => {
  pool.query("INSERT INTO users (email, password) VALUES (?, ?)", [
    email,
    hashedPWD,
  ]);
  return;
};

const updateRefresh = (refreshToken, email) => {
  pool.query("UPDATE users SET refreshToken = ? WHERE email = ?", [
    refreshToken,
    email,
  ]);
  return;
};

const checkRefresh = async (cookie) => {
  const [rows, info] = await pool.query(
    "SELECT ID FROM users WHERE refreshToken = ?",
    [cookie]
  );
  return rows;
};

const removeRefresh = (cookie) => {
  pool.query(`UPDATE users SET refreshToken = null WHERE refreshToken = ?`, [
    cookie,
  ]);
  return;
};

const getEntries = async (ID) => {
  const [rows, info] = await pool.query(
    "SELECT pKey, title, username, password FROM passwords WHERE userID = ?",
    [ID]
  );
  return rows;
};

const addEntry = async (ID, title, username, password) => {
  const [rows, info] = await pool.query(
    "INSERT INTO passwords (userID, title, username, password) VALUES (?, ?, ?, ?)",
    [ID, title, username, password]
  );
  return rows;
};

const checkEntry = async (pKey) => {
  const [rows, info] = await pool.query(
    "SELECT pKey FROM passwords WHERE pKey = ?",
    [pKey]
  );
  return rows;
};

const updateEntry = (title, username, password, pKey) => {
  pool.query(
    "UPDATE passwords SET title = ?, username = ?, password = ? WHERE pKey = ?",
    [title, username, password, pKey]
  );
  return;
};

const deleteEntry = (params) => {
  pool.query("DELETE FROM passwords WHERE pKey = ?", [params]);
  return;
};

export default {
  userLogin,
  checkEmail,
  addUser,
  updateRefresh,
  checkRefresh,
  removeRefresh,
  getEntries,
  addEntry,
  checkEntry,
  updateEntry,
  deleteEntry,
};
