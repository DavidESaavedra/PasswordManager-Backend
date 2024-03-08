import pool from "../config/db.js";

// post

const handleEntries = async (req, res) => {
  const { ID, accessToken } = req.body;

  const [rows, info] = await pool.query(
    "SELECT pKey, title, username, password FROM passwords WHERE userID = ?",
    [ID]
  );

  res.status(200).json(rows);
};

// post

const handleAdd = async (req, res) => {
  const { title, username, password, ID } = req.body;

  const [rows, info] = await pool.query(
    "INSERT INTO passwords (userID, title, username, password) VALUES (?, ?, ?, ?)",
    [ID, title, username, password]
  );

  res
    .status(200)
    .json({ message: "new Entry was created", pKey: rows.insertId });
};

// put

const handleEdit = async (req, res) => {
  const { ID, pKey, title, username, password, accessToken } = req.body;

  const [rows, info] = await pool.query(
    "SELECT pKey FROM passwords WHERE pKey = ?",
    [pKey]
  );

  if (rows.length === 0) {
    res.status(500).json({ message: "Entry doesn't exist" });
    return;
  }

  await pool.query(
    "UPDATE passwords SET title = ?, username = ?, password = ? WHERE pKey = ?",
    [title, username, password, pKey]
  );

  res.status(200).json({ message: "Entry was edited" });
};

// delete

const handleDelete = async (req, res) => {
  const { ID, pKey, accessToken } = req.body;
  const params = req.params.key;

  const [rows, info] = await pool.query(
    "SELECT pKey FROM passwords WHERE pKey = ?",
    [params]
  );

  if (rows.length === 0) {
    res.status(500).json({ message: "Entry doesn't exist" });
    return;
  }

  await pool.query("DELETE FROM passwords WHERE pKey = ?", [params]);

  res.status(200).json({ message: "entry deleted" });
};

export default { handleEntries, handleAdd, handleEdit, handleDelete };
