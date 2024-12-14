const mdlClientes = require("../model/mdlClientes");

// Função para obter todas as contas
const GetAllClientes = async (req, res) => {
  try {
    const registros = await mdlClientes.GetAllClientes();
    res.json({ status: "ok", registros });
  } catch (error) {
    res.status(500).json({
      status: "erro",
      mensagem: "Erro ao obter todos os clientes",
      erro: error.message,
    });
  }
};

// Função para obter uma conta por ID
const GetClientesByID = async (req, res) => {
  try {
    const clienteId = req.params.id;
    const registro = await mdlClientes.GetClientesByID(clienteId);
    if (registro.length > 0) {
      res.json({ status: "ok", registro });
    } else {
      res.status(404).json({
        status: "erro",
        mensagem: "Cliente com esse ID não encontrado",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "erro",
      mensagem: "Erro ao buscar cliente",
      erro: error.message,
    });
  }
};

// Função para inserir uma nova conta
const InsertCliente = async (req, res) => {
  try {
    const registro = req.body;
    const { msg, linhasAfetadas } = await mdlClientes.InsertCliente(registro);
    res.json({ status: msg, linhasAfetadas });
  } catch (error) {
    res.status(500).json({
      status: "erro",
      mensagem: "Erro ao inserir cliente",
      erro: error.message,
    });
  }
};

// Função para atualizar uma conta existente
const UpdateCliente= async (req, res) => {
  try {
    // Captura o ID da URL e os dados do corpo
    const id = req.params.id;
    const registro = req.body;
    registro.id = id;
    // Chama o modelo para atualizar o usuário
    const { msg, linhasAfetadas } = await mdlClientes.UpdateCliente(registro);
    if (linhasAfetadas > 0) {
      res.status(200).json({
        status: msg,
        mensagem: "Cliente atualizado com sucesso",
        linhasAfetadas,
      });
    } else {
      res
        .status(404)
        .json({ status: "erro", mensagem: "Cliente não encontrado" });
    }
  } catch (error) {
    // Retorna erro em caso de exceção
    res.status(500).json({
      status: "erro",
      mensagem: "Erro ao atualizar cliente",
      erro: error.message,
    });
  }
};

// Função para deletar uma conta
const DeleteCliente = async (req, res) => {
  try {
    // Captura o ID a partir de req.params.id
    const id = req.params.id;

    // Valida se o ID foi fornecido
    if (!id) {
      return res
        .status(400)
        .json({ status: "erro", mensagem: "ID do cliente é obrigatório" });
    }

    // Chama a função do modelo para deletar o usuário
    const { linhasAfetadas } = await mdlClientes.DeleteCliente({ id });

    // Verifica se o usuário foi encontrado e removido
    if (linhasAfetadas > 0) {
      res
        .status(200)
        .json({ status: "ok", mensagem: "Cliente removido com sucesso" });
    } else {
      res
        .status(404)
        .json({ status: "erro", mensagem: "Cliente não encontrado" });
    }
  } catch (error) {
    // Lida com erros e retorna resposta de erro
    res.status(500).json({
      status: "erro",
      mensagem: "Erro ao deletar cliente",
      erro: error.message,
    });
  }
};

module.exports = {
  GetAllClientes,
  GetClientesByID,
  InsertCliente,
  UpdateCliente,
  DeleteCliente,
};
