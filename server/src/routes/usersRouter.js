const fs = require("fs");
const uniqid = require("uniqid");
const bcrypt = require("bcrypt");
const { Router } = require("express");

const usersRouter = Router();

usersRouter
    .get("/login", async (req, res) => {
        if (req.session.user) {
            res.send({ logged: true, user: req.session.user });
        } else {
            res.send({
                logged: false,
                error_message: "Неверный логин или пароль",
            });
        }
    })
    .post("/login", async (req, res) => {
        const { email, password } = req.body;

        const Users = JSON.parse(
            fs.readFileSync("./db/Users.json", (err, data) => data)
        );

        const [user] = Users.filter((user) => user.email === email);
        console.log(user);
        if (user && (await bcrypt.compare(password, user.password))) {
            req.session.user = { id: user.id, email: user.email };
            return res
                .status(200)
                .send({ logged: true, user: req.session.user });
        }
        return res.status(400).send({
            logged: false,
            error_message: "Неверный логин или пароль",
        });
    })
    .post("/registration", async (req, res) => {
        const { email, password } = req.body;

        const Users = JSON.parse(
            fs.readFileSync("./db/Users.json", (err, data) => data)
        );
        const [user] = Users.filter((user) => user.email === email);

        if (!user) {
            const id = uniqid();
            const pass = await bcrypt.hash(password, 10);
            const Users = JSON.parse(
                fs.readFileSync("./db/Users.json", (err, data) => data)
            );
            fs.writeFileSync(
                "./db/Users.json",
                JSON.stringify([...Users, { id, email, password: pass }])
            );
            req.session.user = { id, email };
            return res
                .status(200)
                .send({ logged: true, user: req.session.user });
        }
        return res.status(400).send({
            logged: false,
            error_message: "Такой логин уже существует",
        });
    })
    .get("/logout", async (req, res) => {
        req.session.destroy((err) => {
            if (err) return res.sendStatus(500);
            res.clearCookie("userId");
            return res.send({ logged: false });
        });
    });

module.exports = usersRouter;
