const db = require("../../../database/databaseconfig");



const GetAllVeiculos= async () => {
  return (
    await db.query(
      "SELECT * " + "FROM veiculos where softDelete IS NOT TRUE ORDER BY id ASC"
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


const UpdateVeiculo = async (registroPar) => {
  console.log(registroPar);
  let linhasAfetadas;
  let msg = "ok";
  try {
    linhasAfetadas = (
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

const DeleteVeiculo = async (registroPar) => {
  let linhasAfetadas;
  let msg = "ok";

  try {
    // Atualiza o campo `softDelete` para TRUE
    linhasAfetadas = (
      await db.query("UPDATE veiculos SET softDelete = TRUE WHERE id = $1", [
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
