const mdlConta = require("../model/mdlContas");

// Função para obter todas as contas
const GetAllContas = async (req, res) => {
  try {
    const registros = await mdlConta.GetAllContas();
    res.json({ status: "ok", registros });
  } catch (error) {
    res.status(500).json({ status: "erro", mensagem: "Erro ao obter as contas", erro: error.message });
  }
};

// Função para obter uma conta por ID
const GetContaByID = async (req, res) => {
  try {
    const contaID = req.params.id;  // Assegure-se de que está enviando um ID no corpo da requisição
    const registro = await mdlConta.GetContaByID(contaID);
    if (registro) {
      res.json({ status: "ok", registro });
    } else {
      res.status(404).json({ status: "erro", mensagem: "Conta não encontrada" });
    }
  } catch (error) {
    res.status(500).json({ status: "erro", mensagem: "Erro ao buscar conta", erro: error.message });
  }
};

// Função para inserir uma nova conta
const InsertConta = async (req, res) => {
  try {
    const registro = req.body;
    const { msg, linhasAfetadas } = await mdlConta.InsertConta(registro);
    res.json({ status: msg, linhasAfetadas });
  } catch (error) {
    res.status(500).json({ status: "erro", mensagem: "Erro ao inserir conta", erro: error.message });
  }
};

// Função para atualizar uma conta existente
const UpdateConta = async (req, res) => {
  try {

    const { id } = req.params;

    // Os dados para atualização vêm do corpo da requisição
    const registro = req.body;

    // Adicionar o ID ao registro
    registro.id = id;

    // Atualizar a conta com o ID e os dados
    const { msg, linhasAfetadas } = await mdlConta.UpdateConta(registro);

    // Retornar a resposta com o status e número de linhas afetadas
    res.json({ status: msg, linhasAfetadas });
  } catch (error) {
    res.status(500).json({ status: "erro", mensagem: "Erro ao atualizar conta", erro: error.message });
  }
};


// Função para deletar uma conta
const DeleteConta = async (req, res) => {
  try {
    // Captura o ID a partir de req.params.id
    const id = req.params.id;

    // Valida se o ID foi fornecido
    if (!id) {
      return res.status(400).json({ status: "erro", mensagem: "ID do usuário é obrigatório" });
    }

    // Chama a função do modelo para deletar o usuário
    const { linhasAfetadas } = await mdlConta.DeleteConta({ id });

    // Verifica se o usuário foi encontrado e removido
    if (linhasAfetadas > 0) {
      res.status(200).json({ status: "ok", mensagem: "Usuário removido com sucesso" });
    } else {
      res.status(404).json({ status: "erro", mensagem: "Usuário não encontrado" });
    }
  } catch (error) {
    // Lida com erros e retorna resposta de erro
    res.status(500).json({ status: "erro", mensagem: "Erro ao deletar usuário", erro: error.message });
  }
};


module.exports = {
  GetAllContas,
  GetContaByID,
  InsertConta,
  UpdateConta,
  DeleteConta
};
