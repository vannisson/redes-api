const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

database = {
  users: [
    {
      cpf: "13141458430",
      nome: "Geovane",
      cidade: "Arapiraca",
    },
  ],
};

// GET - List all users

app.get("/", (req, res) => {
  res.status(200).json(database.users);
});

// GET - List a specific user by his/her cpf

app.get("/:cpf", (req, res) => {
  let exists = false;
  let result = {};
  database.users.forEach(function (user) {
    if (user.cpf == req.params.cpf) {
      result = user;
      exists = true;
    }
  });

  if (exists == true) {
    return res.status(200).send({ result: result }).json();
  } else {
    return res.status(404).send({ error: "User not found" }).json();
  }
});

// POST - Create a new user
app.post("/create", (req, res) => {
  let exists = false;
  database.users.forEach(function (user) {
    if (user.cpf == req.body.cpf) {
      exists = true;
    }
  });

  if (exists == true) {
    return res.status(409).send({ error: "User Already Exists" }).json();
  } else {
    new_user = {
      cpf: req.body.cpf,
      nome: req.body.nome,
      cidade: req.body.cidade,
    };
    database.users.push(new_user);
    return res.status(201).send(new_user);
  }
});

// PUT - Update all the data from a specific user

app.put("/updateAll/:cpf", (req, res) => {
  let exists = false;
  database.users.forEach(function (user) {
    if (user.cpf == req.params.cpf) {
      exists = true;
    }
  });

  if (exists == true) {
    for (var i = 0; i < database.users.length; i++) {
      if (database.users[i].cpf === req.params.cpf) {
        database.users.splice(i, 1);
      }
    }
    new_user = {
      cpf: req.params.cpf,
      nome: req.body.nome,
      cidade: req.body.cidade,
    };
    database.users.push(new_user);
    return res.status(200).send({ result: new_user });
  } else {
    return res.status(404).send({ error: "User not found" }).json();
  }
});

// PATCH - Update a few parts of an specific user

app.patch("/updateName/:cpf", (req, res) => {
  let exists = false;
  let result = {};
  database.users.forEach(function (user) {
    if (user.cpf == req.params.cpf) {
      exists = true;
    }
  });
  if (exists == true) {
    for (var i = 0; i < database.users.length; i++) {
      if (database.users[i].cpf === req.params.cpf) {
        database.users[i].nome = req.body.nome;
        result = database.users[i];
      }
    }
    return res.status(200).json(result);
  } else {
    return res.status(404).send({ error: "User not found" });
  }
});

// DELETE - Delete a user from database

app.delete("/delete/:cpf", (req, res) => {
  let exists = false;
  database.users.forEach(function (user) {
    if (user.cpf == req.params.cpf) {
      exists = true;
    }
  });

  if (exists == true) {
    for (var i = 0; i < database.users.length; i++) {
      if (database.users[i].cpf === req.params.cpf) {
        database.users.splice(i, 1);
      }
    }
    return res.status(200).send({ result: "Successfully Deleted" }).json();
  } else {
    return res.status(404).send({ error: "User not found" }).json();
  }
});

app.head("/", (req, res) => {
  res.set("x-user", "abcd");
});

app.options("/*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,PUT,PATCH,POST,DELETE,HEAD,OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  );
  res.send(200);
});

app.listen(port, () => {
  console.log("Server Started at http://localhost:5000");
});
