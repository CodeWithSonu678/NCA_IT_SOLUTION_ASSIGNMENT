const { Router } = require("express");
const registerController = require("../controller/auth.controller");

const authRouter = Router();


//Register Api create
authRouter.post("/register", registerController);

module.exports = authRouter;
