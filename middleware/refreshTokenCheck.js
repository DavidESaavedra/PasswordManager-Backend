import jwt from "jsonwebtoken";

const refreshTokenCheck = (req, res, next) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) {
    res.status(401).json({ message: "Cookie missing" });
    return;
  }

  jwt.verify(cookies.jwt, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "None",
        secure: true,
      });
      res.status(406).json({ message: "refresh token is invalid, log in" });
      return;
    } else {
      next();
    }
  });
};
export default refreshTokenCheck;
