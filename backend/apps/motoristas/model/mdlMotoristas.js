const db = require("../../../database/databaseconfig");

// Função para obter todas as contas
const GetAllMotoristas = async () => {
    return (
      await db.query(
        "SELECT * " + "FROM Motoristas where softDelete = FALSE"
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
          "INSERT INTO Motoristas " +
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

const UpdateMotorista = async (registroPar) => {
  let linhasAfetadas;
  let msg = "ok";
  let statusbar = 200; // Define um status padrão de sucesso

  try {
    // Atualiza o registro no banco de dados
    const result = await db.query(
      "UPDATE Motoristas SET " +
        "nome = $2, " +
        "WHERE id = $1",
      [
        registroPar.id,
        registroPar.nome,
      ]
    );

    linhasAfetadas = result.rowCount;
  } catch (error) {
    // Registra o erro completo no console para depuração
    console.error("Erro no UpdateMotorista:", error);

    statusbar = 500; // Define o status de erro
    msg =
      "[mdlMotoristas|UpdateMotorista] " +
      (error.detail || error.message || "Erro desconhecido"); // Fallback para capturar a mensagem de erro
    linhasAfetadas = -1;
  }

  return { statusbar, msg, linhasAfetadas };
};



// Função para marcar uma conta como excluída (soft delete) no BD
const DeleteMotorista = async (registroPar) => {
  let linhasAfetadas;
  let msg = "ok";

  try {
      
      const result = await db.query(
          "UPDATE Motoristas SET softDelete = TRUE WHERE id = $1", 
          [registroPar.id]
      );
      
      console.log(result);

      linhasAfetadas = result.rowCount;
  } catch (error) {
     
      msg = "[mdlMotoristas|DeleteMotorista] " + error.detail;
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