const db = require("../../../database/databaseconfig");

// Função para obter todas as contas
const GetAllMotoristas = async () => {
    return (
      await db.query(
        "SELECT * " + "FROM Motoristas ORDER BY descricao ASC"
      )
    ).rows;
};

// Função para obter uma conta por ID no BD
const GetMotoristaByID = async (contaIDPar) => {
    return (
      await db.query(
        "SELECT * FROM Motoristas WHERE id = $1",
        [contaIDPar]
      )
    ).rows;
  };

// Função para inserir uma nova conta no BD
const InsertMotorista = async (registroPar) => {
    let linhasAfetadas;
    let msg = "ok";
    try {
      linhasAfetadas = (
        await db.query(
          "INSERT INTO conta " +
            "(nome, cpf, email, dataContratacao) " +
            "VALUES ($1, $2, $3, $4)",
          [
            registroPar.nome,
            registroPar.cpf,
            registroPar.email,
            registroPar.dataContratacao
          ]
        )
      ).rowCount;
    } catch (error) {
      msg = "[mdlMotoristas|InsertMotorista] " + error.detail;
      linhasAfetadas = -1;
    }
  
    return { msg, linhasAfetadas };
  };

// Função para atualizar uma conta existente no BD
const UpdateMotorista = async (registroPar) => {
    let linhasAfetadas;
    let msg = "ok";
    try {
      linhasAfetadas = (
        await db.query(
          "UPDATE conta SET " +
            "nome = $2, " +
            "cpf = $3, " +
            "email = $4, " +
            "dataContratacao = $5 " +
            "WHERE id = $1"
          [
            registroPar.id,
            registroPar.nome,
            registroPar.cpf,
            registroPar.email,
            registroPar.dataContratacao
          ]
        )
      ).rowCount;
    } catch (error) {
      msg = "[mdlMotoristas|UpdateMotorista] " + error.detail;
      linhasAfetadas = -1;
    }
  
    return { msg, linhasAfetadas };
  };

// Função para marcar uma conta como excluída (soft delete) no BD
const DeleteMotorista = async (registroPar) => {
    let linhasAfetadas;
    let msg = "ok";
  
    try {
      linhasAfetadas = (
        await db.query(
          "UPDATE Motoristas SET softDelete = TRUE WHERE id = $1",
          [registroPar.id]
        )
      ).rowCount;
    } catch (error) {
      msg = "[mdlMostoristas|DeleteMotorista] " + error.detail;
      linhasAfetadas = -1;
    }
  
    return { msg, linhasAfetadas };
  };


module.exports = {
    GetAllMotoristas,
    GetMotoristaByID,
    InsertMotorista,
    UpdateMotorista,
    DeleteMotorista
}