import express from 'express';
import mongoose from 'mongoose';

const App =express();

App.use(express.json());

const db = mongoose.createConnection({
    user: "root",
    host: "localhost",
    password: "password",
    database: "LoginSystem",
});

App.post("/register", (req, res) => {

const Username = req.body.username;
const Password = req.body.password;

})

App.listen(3001, () => {
    console.log("running server")
});