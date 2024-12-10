const db = require("../../../database/databaseconfig");

// Função para obter todas as contas
const GetAllVeiculos= async () => {
  return (
    await db.query(
      "SELECT * " + "FROM veiculos where removido IS NOT TRUE ORDER BY id ASC"
    )
  ).rows;
};

// Função para obter uma conta por ID no BD
const GetVeiculosByID = async (veiculosIDPar) => {
  return (
    await db.query("SELECT * FROM veiculos WHERE id = $1 ", [veiculosIDPar])
  ).rows;
};

// Função para inserir uma nova // no BD utilizando
const InsertVeiculo = async (registroPar) => {
  let linhasAfetadas;
  let msg = "ok";
  try {
    linhasAfetadas = (
      await db.query(
        "INSERT INTO veiculos " +
          "(placa, modelo, DataAquisicao) " +
          "VALUES ($1, $2, $3)",
        [
          registroPar.placa,
          registroPar.modelo,
          registroPar.DataAquisicao,
        ]
      )
    ).rowCount;
  } catch (error) {
    msg = "[mdlVeiculos|InsertVeiculos] " + error.detail;
    linhasAfetadas = -1;
  }

  return { msg, linhasAfetadas };
};
// Função para atualizar uma conta existente no BD
const UpdateVeiculo = async (registroPar) => {
  let linhasAfetadas;
  let msg = "ok";
  try {
    linhasAfetadas = (
      await db.query(
        "UPDATE veiculos SET " +
          "placa = $2, " +
          "modelo = $3, " +
          "DataAquisicao = $4 " +
          "WHERE id = $1",
        [
          registroPar.id,
          registroPar.placa,
          registroPar.modelo,
          registroPar.DataAquisicao,
        ]
      )
    ).rowCount;
  } catch (error) {
    msg = "[mdlVeiculos|UpdateVeiculo] " + error.detail;
    linhasAfetadas = -1;
  }

  return { msg, linhasAfetadas };
};

// Função para marcar uma conta como excluída (soft delete) no BD
const DeleteVeiculo = async (registroPar) => {
  let linhasAfetadas;
  let msg = "ok";

  try {
    // Atualiza o campo `removido` para TRUE
    linhasAfetadas = (
      await db.query("UPDATE veiculos SET removido = TRUE WHERE id = $1", [
        registroPar.id,
      ])
    ).rowCount;
  } catch (error) {
    msg = "[mdlVeiculos|DeleteVeiculo] " + error.message;
    linhasAfetadas = -1;
  }

  return { msg, linhasAfetadas };
};

module.exports = {
  GetAllVeiculos,
  GetVeiculosByID,
  InsertVeiculo,
  UpdateVeiculo,
  DeleteVeiculo,
};
