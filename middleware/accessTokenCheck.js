import jwt from "jsonwebtoken";

const accessTokenCheck = (req, res, next) => {
  const { ID, accessToken } = req.body;

  if (!ID || !accessToken) {
    res.status(403).json({ message: "no access token" });
    return;
  }

  jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err || ID !== decoded.ID) {
      res.status(403).json({ message: "access token invalid" });
      return;
    } else {
      next();
    }
  });
};
export default accessTokenCheck;
