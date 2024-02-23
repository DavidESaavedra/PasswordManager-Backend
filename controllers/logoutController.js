import pool from "../config/db.js";

// get

const handleLogout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    return res.status(401).json({ message: "Cookie missing" });
  }

  const [rows, info] = await pool.query(
    "SELECT email FROM users WHERE refreshToken = ?",
    [cookies.jwt]
  );

  if (rows.length === 0) {
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });
    res.status(500).json({ message: "Wrong refreshToken" });
    return;
  }

  await pool.query(
    `UPDATE users SET refreshToken = null WHERE refreshToken = ?`,
    [cookies.jwt]
  );

  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });
  res.status(200).json({ message: "refreshToken deleted" });
};

export default { handleLogout };
