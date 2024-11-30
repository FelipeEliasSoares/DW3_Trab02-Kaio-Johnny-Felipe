const db = require("../../../database/databaseconfig");

const GetCredencial = async (loginPar) => {
  return (
    await db.query("SELECT id, login, senha FROM usuario WHERE login = $1", [
      loginPar,
    ])
  ).rows;
};

// Método para buscar o usuário completo pelo ID
const GetUsuarioById = async (id) => {
  const query = "SELECT * FROM usuario WHERE id = $1";
  const values = [id];

  try {
    const result = await db.query(query, values);
    return result.rows[0] || null;
  } catch (error) {
    console.error("Erro ao buscar usuário por ID:", error);
    throw error;
  }
};

module.exports = {
  GetCredencial,
  GetUsuarioById,
};
