import pool from "../config/db.js";
import jwt from "jsonwebtoken";

// get

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    res.status(401).json({ message: "Cookie missing" });
    return;
  }

  const [rows, info] = await pool.query(
    "SELECT ID FROM users WHERE refreshToken = ?",
    [cookies.jwt]
  );

  if (rows.length === 0) {
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });
    res.status(500).json({ message: "Token doesn't match" });
    return;
  }

  jwt.verify(cookies.jwt, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || rows[0].ID !== decoded.ID) {
      res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "Strict",
        secure: true,
      });
      res.status(401).json({ message: "no refresh token, log in" });
      return;
    }
    const accessToken = jwt.sign(
      { ID: decoded.ID },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_DURATION }
    );
    res.status(200).json({ ID: rows[0].ID, accessToken: accessToken });
  });
};

export default { handleRefreshToken };
