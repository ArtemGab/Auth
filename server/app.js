require("dotenv").config();
const express = require("express");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();

const usersRouter = require("./src/routes/usersRouter");

const { PORT } = process.env;

app.use(express.json());
app.use(express.static("public"));
app.use(
    cors({
        origin: ["http://127.0.0.1:3000"],
        methods: ["GET", "POST"],
        credentials: true,
    })
);

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(
    session({
        store: new FileStore({}),
        name: "userId",
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false,
            httpOnly: false,
        },
        secret: "MHUNCR#&ny39gjfmcd",
    })
);

app.use("/users", usersRouter);

app.listen(PORT);
