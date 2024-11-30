const db = require("../../../database/databaseconfig");

// Função para obter todas as contas
const GetAllUsuarios = async () => {
  return (
    await db.query(
      "SELECT * " + "FROM usuario where removido IS NOT TRUE ORDER BY id ASC"
    )
  ).rows;
};

// Função para obter uma conta por ID no BD
const GetUsuarioByID = async (usuarioIDPar) => {
  return (
    await db.query("SELECT * FROM usuario WHERE id = $1 ", [usuarioIDPar])
  ).rows;
};

// Função para inserir uma nova conta no BD utilizando bcrypt no ato
const InsertUsuario = async (registroPar) => {
  let linhasAfetadas;
  let msg = "ok";

  try {
    linhasAfetadas = (
      await db.query(
        "INSERT INTO usuario " +
          "(email, login, senha) " +
          "VALUES ($1, $2, crypt($3, gen_salt('bf'))) " +
          "ON CONFLICT DO NOTHING",
        [registroPar.email, registroPar.login, registroPar.senha]
      )
    ).rowCount;
  } catch (error) {
    msg = "[mdlUsuario|InsertUsuario] " + error.detail;
    linhasAfetadas = -1;
  }

  return { msg, linhasAfetadas };
};

// Função para atualizar uma conta existente no BD
const UpdateUsuario = async (registroPar) => {
  let linhasAfetadas;
  let msg = "ok";
  try {
    linhasAfetadas = (
      await db.query(
        "UPDATE usuario SET " +
          "login = $2, " +
          "email = $3, " +
          "senha = crypt($4, gen_salt('bf')) " +
          "WHERE id = $1",
        [
          registroPar.id,
          registroPar.email,
          registroPar.login,
          registroPar.senha,
        ]
      )
    ).rowCount;
  } catch (error) {
    msg = "[mdlUsuario|UpdateUsuario] " + error.detail;
    linhasAfetadas = -1;
  }

  return { msg, linhasAfetadas };
};

// Função para marcar uma conta como excluída (soft delete) no BD
const DeleteUsuario = async (registroPar) => {
  let linhasAfetadas;
  let msg = "ok";

  try {
    // Atualiza o campo `removido` para TRUE
    linhasAfetadas = (
      await db.query("UPDATE usuario SET removido = TRUE WHERE id = $1", [
        registroPar.id,
      ])
    ).rowCount;
  } catch (error) {
    msg = "[mdlUsuario|DeleteUsuario] " + error.message;
    linhasAfetadas = -1;
  }

  return { msg, linhasAfetadas };
};

module.exports = {
  GetAllUsuarios,
  GetUsuarioByID,
  InsertUsuario,
  UpdateUsuario,
  DeleteUsuario,
};
