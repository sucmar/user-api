const express = require("express");
const bodyParser = require("body-parser");
const pg = require('pg');
var pjson = require('./package.json');

const config = {
  user: 'todos_db_9mjx_user',
  database: 'todos_db_9mjx',
  password: 'RrvcqXqnojiB0HebUZ6xRNzuixJVnGgI',
  host: 'dpg-ceub7aun6mpglqcd7rrg-a.oregon-postgres.render.com',
  port: 5432,
  ssl: true,
  idleTimeoutMillis: 30000
}

const client = new pg.Pool(config)

// Modelo
class UserModel {
  constructor() {
    this.usuarios = [];
  }

  async getUsuarios() {
    const res = await client.query('select * from usuarios;')
    return res.rows
  }

  async addUsuario(userObj) {
    const query = 'INSERT INTO usuarios(nombreCompleto, edad) VALUES($1, $2) RETURNING *';
    const values = [userObj.nombreCompleto, userObj.edad]
    const res = await client.query(query, values)
    return res;
  }

  async editUsuario(id, userObj) {
    const query = 'UPDATE usuarios set nombreCompleto=$2, edad=$3 WHERE id=$1';
    const values = [id, userObj.nombreCompleto, userObj.edad]
    await client.query(query, values)
  }

  async deleteUsuario(id) {
    const query = 'DELETE FROM usuarios WHERE id=$1';
    const values = [id]
    await client.query(query, values)
  }

  async getUsuariosPromedio() {
    const res = await client.query('select avg(edad) as promedioEdad from usuarios;')
    return res.rows
  }

  getUsuarioStatus() {
    const status = {
      nameSystem: pjson.name,
      version: pjson.version,
      developer: pjson.author.name,
      email: pjson.author.email,
    }
    return status;
  }
}

// Controlador
class UserController {
  constructor(model) {
    this.model = model;
  }

  async getUsuarios() {
    return await this.model.getUsuarios();
  }

  async addUsuario(userObj) {
    await this.model.addUsuario(userObj);
  }

  editUsuario(index, userObj) {
    this.model.editUsuario(index, userObj);
  }

  async deleteUsuario(id) {
    await this.model.deleteUsuario(id);
  }

  async getUsuariosPromedio() {
    return await this.model.getUsuariosPromedio();
  }

  getUsuarioStatus() {
    return this.model.getUsuarioStatus();
  }
}

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
