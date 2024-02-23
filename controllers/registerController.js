import bcrypt from "bcrypt";
import pool from "../config/db.js";

// post

const handleRegister = async (req, res) => {
  const { email, pwd } = req.body;
  if (!email || !pwd) {
    res.status(400).json({ message: "email and password are required" });
    return;
  }

  const [rows, info] = await pool.query(
    "SELECT email FROM users WHERE email = ?",
    [email]
  );

  if (rows.length > 0) {
    res.status(500).json({ message: "User already exists" });
    return;
  }

  try {
    const hashedPWD = await bcrypt.hash(pwd, 10);

    await pool.query("INSERT INTO users (email, password) VALUES (?, ?)", [
      email,
      hashedPWD,
    ]);
    res.status(200).json({ success: `New user ${email} created` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default { handleRegister };
