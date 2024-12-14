const db = require("../../../database/databaseconfig");

// Função para obter todas as contas
const GetAllClientes= async () => {
  return (
    await db.query(
      "SELECT * " + "FROM clientes where removido IS NOT TRUE ORDER BY id ASC"
    )
  ).rows;
};

// Função para obter uma conta por ID no BD
const GetClientesByID = async (clientesIDPar) => {
  return (
    await db.query("SELECT * FROM clientes WHERE id = $1 ", [clientesIDPar])
  ).rows;
};

// Função para inserir um novo cliente no BD
const InsertCliente = async (registroPar) => {
  let linhasAfetadas;
  let msg = "ok";
  try {
    linhasAfetadas = (
      await db.query(
        "INSERT INTO clientes " +
          "(email, nome, datacadastro) " +
          "VALUES ($1, $2, $3)",
        [
          registroPar.email,
          registroPar.nome,
          registroPar.datacadastro,
        ]
      )
    ).rowCount;
  } catch (error) {
    msg = "[mdlClientes|InsertCliente] " + error.detail;
    linhasAfetadas = -1;
  }

  return { msg, linhasAfetadas };
};


// Função para atualizar algo existente no BD
const UpdateCliente = async (registroPar) => {
  let linhasAfetadas;
  let msg = "ok";

  try {
    // Executa a query de atualização
    const result = await db.query(
      "UPDATE clientes SET " +
        "email = $2, " +
        "nome = $3 " + // Removida vírgula extra aqui
        "WHERE id = $1",
      [
        registroPar.id,        // $1
        registroPar.email,     // $2
        registroPar.nome       // $3
      ]
    );

    // Verifica quantas linhas foram afetadas
    linhasAfetadas = result.rowCount;

    // Verifica se nenhuma linha foi atualizada
    if (linhasAfetadas === 0) {
      msg = "Nenhum cliente encontrado com o ID fornecido.";
    }
  } catch (error) {
    console.error("[mdlClientes|UpdateCliente] Erro ao atualizar cliente:", error);
    msg = "[mdlClientes|UpdateCliente] " + (error.detail || error.message);
    linhasAfetadas = -1;
  }

  return { msg, linhasAfetadas };
};

// Função para marcar uma conta como excluída (soft delete) no BD
const DeleteCliente = async (registroPar) => {
  let linhasAfetadas;
  let msg = "ok";

  try {
    // Atualiza o campo `removido` para TRUE
    linhasAfetadas = ( await db.query(
      "UPDATE clientes SET removido = TRUE WHERE id = $1", [
        registroPar.id,
      ])
    ).rowCount;
  } catch (error) {
    msg = "[mdlClientes|DeleteCliente] " + error.detail;
    linhasAfetadas = -1;
  }

  return { msg, linhasAfetadas };
};

module.exports = {
  GetAllClientes,
  GetClientesByID,
  InsertCliente,
  UpdateCliente,
  DeleteCliente,
};
