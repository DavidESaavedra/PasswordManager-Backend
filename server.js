import express from "express";
const app = express();
const port = process.env.PORT || 5000;
import cors from "cors";

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

import cookieParser from "cookie-parser";
app.use(cookieParser());

import credentials from "./middleware/credentials.js";
app.use(credentials);

import corsOptions from "./config/corsOptions.js";
app.use(cors(corsOptions));

import accessTokenCheck from "./middleware/accessTokenCheck.js";
import refreshTokenCheck from "./middleware/refreshTokenCheck.js";

import login from "./routes/login.js";
import logout from "./routes/logout.js";
import refreshToken from "./routes/refreshToken.js";
import register from "./routes/register.js";
import passwords from "./routes/api/passwords.js";

app.get("/", (req, res) => {
  res.send("Password Manager");
});

// routes
app.use("/register", register);
app.use("/login", login);
app.use("/refresh", refreshToken);
app.use("/logout", logout);

// ever route under will be checked
app.use(accessTokenCheck);
app.use(refreshTokenCheck);

app.use("/passwords", passwords);

app.listen(port, () => console.log(`http://localhost:${port}/`));
