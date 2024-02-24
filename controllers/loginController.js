import bcrypt from "bcrypt";
import pool from "../config/db.js";
import jwt from "jsonwebtoken";

// post

const handleLogin = async (req, res) => {
  const { email, pwd } = req.body;
  if (!email || !pwd) {
    res.status(400).json({ message: "email and password are required" });
    return;
  }

  const [rows, info] = await pool.query(
    "SELECT ID, email, password FROM users WHERE email = ?",
    [email]
  );

  if (rows.length === 0) {
    res.status(500).json({ message: "User doesn't exist" });
    return;
  }

  if (await bcrypt.compare(pwd, rows[0].password)) {
    const accessToken = jwt.sign(
      { ID: rows[0].ID },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_DURATION }
    );
    const refreshToken = jwt.sign(
      { ID: rows[0].ID },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: process.env.REFRESH_TOKEN_DURATION }
    );

    await pool.query("UPDATE users SET refreshToken = ? WHERE email = ?", [
      refreshToken,
      email,
    ]);

    console.log(refreshToken, "refresh token just made");

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "Strict",
      secure: true,
      // one day
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ ID: rows[0].ID, accessToken: accessToken });
  } else {
    res.status(400).json({ message: "Wrong password" });
  }
};

export default { handleLogin };
