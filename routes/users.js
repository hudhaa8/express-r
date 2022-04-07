import express from "express";
import { createUser } from "../helper.js";
import bcrypt from "bcrypt";
import { getUserByName } from "../helper.js";
import jwt from "jsonwebtoken"

async function genPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  console.log({ salt, hashPassword });
  return hashPassword;
}
const router = express.Router();

router.post("/signup", async function (request, response) {
  //db.users.insertOne(data)
  const { username, password } = request.body;
  const hashPassword = await genPassword(password);
  // console.log(data);
  const newUser = {
    username: username,
    password: hashPassword,
  };
  const result = await createUser(newUser);
  response.send(result);
});

router.post("/login", async function (request, response) {
  //db.users.insertOne(data)
  const { username, password } = request.body;
  //db.users.findOne({username:"hudha malick"})
  const userfromDB = await getUserByName(username);
  console.log(userfromDB);
  if (!userfromDB) {
    response.status(401).send({ message: "Invalid Credential" });
  } else {
    const storedPassword = userfromDB.password; // hashed password
    const isPasswordMatch = await bcrypt.compare(password, storedPassword);
    console.log("isPasswordMatch", isPasswordMatch);

    if (isPasswordMatch) {
      const token= jwt.sign({id:userfromDB._id},process.env.SECRET_KEY)
      response.send({ message: "Successful Login",token:token });
    } else {
      response.status(401).send({ message: "Invalid Credential" });
    }
  }
});

export const usersRouter = router;
