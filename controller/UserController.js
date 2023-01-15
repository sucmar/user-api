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

module.exports = UserController;