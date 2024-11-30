const db = require("../../../database/databaseconfig");

// Função para obter todas as contas
const GetAllContas = async () => {
  return (
    await db.query(
      "SELECT * " + "FROM conta ORDER BY descricao ASC"
    )
  ).rows;
};

// Função para obter uma conta por ID no BD
const GetContaByID = async (contaIDPar) => {
  return (
    await db.query(
      "SELECT * FROM conta WHERE id = $1",
      [contaIDPar]
    )
  ).rows;
};

// Função para inserir uma nova conta no BD
const InsertConta = async (registroPar) => {
  let linhasAfetadas;
  let msg = "ok";
  try {
    linhasAfetadas = (
      await db.query(
        "INSERT INTO conta " +
          "(descricao, tipo, valor, data, status, forma_pagamento, usuario_id) " +
          "VALUES ($1, $2, $3, $4, $5, $6, $7)",
        [
          registroPar.descricao,
          registroPar.tipo,
          registroPar.valor,
          registroPar.data,
          registroPar.status,
          registroPar.forma_pagamento,
          registroPar.usuario_id
        ]
      )
    ).rowCount;
  } catch (error) {
    msg = "[mdlConta|InsertConta] " + error.detail;
    linhasAfetadas = -1;
  }

  return { msg, linhasAfetadas };
};

// Função para atualizar uma conta existente no BD
const UpdateConta = async (registroPar) => {
  let linhasAfetadas;
  let msg = "ok";
  try {
    linhasAfetadas = (
      await db.query(
        "UPDATE conta SET " +
          "descricao = $2, " +
          "tipo = $3, " +
          "valor = $4, " +
          "data = $5, " +
          "status = $6, " +
          "forma_pagamento = $7, " +
          "usuario_id = $8 " +
          "WHERE id = $1",
        [
          registroPar.id,
          registroPar.descricao,
          registroPar.tipo,
          registroPar.valor,
          registroPar.data,
          registroPar.status,
          registroPar.forma_pagamento,
          registroPar.usuario_id
        ]
      )
    ).rowCount;
  } catch (error) {
    msg = "[mdlConta|UpdateConta] " + error.detail;
    linhasAfetadas = -1;
  }

  return { msg, linhasAfetadas };
};

// Função para marcar uma conta como excluída (soft delete) no BD
const DeleteConta = async (registroPar) => {
  let linhasAfetadas;
  let msg = "ok";

  try {
    linhasAfetadas = (
      await db.query(
        "DELETE FROM conta WHERE id = $1",
        [registroPar.id]
      )
    ).rowCount;
  } catch (error) {
    msg = "[mdlConta|DeleteConta] " + error.detail;
    linhasAfetadas = -1;
  }

  return { msg, linhasAfetadas };
};


module.exports = {
  GetAllContas,
  GetContaByID,
  InsertConta,
  UpdateConta,
  DeleteConta,
};
