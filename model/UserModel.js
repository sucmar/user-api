var client = require('../utils/dbConfig.js')
var pjson = require('../package.json');

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

module.exports = UserModel;
