const express = require("express");
const { users } = require("./model/index");
const app = express();
//bcrypt is use for hashing
const bcrypt = require("bcryptjs");
app.set("view engine", "ejs");

// database connection
require("./model/index");

//formbata aako data parse garne
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/register", (req, res) => {
  res.render("register");
});

//post handling api for user registration
app.post("/register", async (req, res) => {
  // console.log(req.body);
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;

  //validation from server side
  if (!email || !username || !password) {
    return res.send("Please provide email,username,password");
  }

  await users.create({
    email,
    username,
    password: bcrypt.hashSync(password, 8),
  });
  console.log("Registered successfully");
  res.redirect("register");
});

app.listen(3000, function () {
  console.log("NodeJs project has started at port 3000");
});
