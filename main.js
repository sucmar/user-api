const express = require("express");
const bodyParser = require("body-parser");
const UserModel = require('./model/UserModel.js');
const UserController = require('./controller/UserController.js');

// Vistas (Rutas)
const app = express();
const userModel = new UserModel();
const userController = new UserController(userModel);

app.use(bodyParser.json());

app.get("/usuarios", async (req, res) => {
  const response = await userController.getUsuarios()
  res.json(response)
});

// Vistas (Rutas) (continuación)
app.post("/usuarios", (req, res) => {
  const userObj = req.body;
  userController.addUsuario(userObj);
  res.sendStatus(200);
});

app.put("/usuarios/:id", (req, res) => {
  const id = req.params.id;
  const userObj = req.body;
  userController.editUsuario(id, userObj);
  res.sendStatus(200);
});

app.delete("/usuarios/:id", (req, res) => {
  const id = req.params.id;
  userController.deleteUsuario(id);
  res.sendStatus(200);
});

app.get("/usuarios/promedio-edad", async (req, res) => {
  const response = await userController.getUsuariosPromedio()
  res.json(response)
});

app.get("/usuarios/status", async (req, res) => {
  const response = await userController.getUsuarioStatus()
  res.json(response)
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
