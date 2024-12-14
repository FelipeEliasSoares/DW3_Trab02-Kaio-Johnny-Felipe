const mdlMotorista = require("../model/mdlMotoristas");

// Função para obter todas as contas
const GetAllMotoristas = async (req, res) => {
  try {
    const motoristas = await mdlMotorista.GetAllMotoristas();
    res.json({ status: "ok", motoristas });
  } catch (error) {
    res.status(500).json({ status: 500, mensagem: "Erro ao obter as Motoristas", erro: error.message });
  }
};

// Função para obter uma conta por ID
const GetMotoristaByID = async (req, res) => {
  try {
    const MotoristaID = req.params.id;  // Assegure-se de que está enviando um ID no corpo da requisição
    const motorista = await mdlMotorista.GetMotoristaByID(MotoristaID);
    if (motorista) {
      res.json({ status: "ok", motorista });
    } else {
      res.status(404).json({ status: "erro", mensagem: "Motorista não encontrada" });
    }
  } catch (error) {
    res.status(500).json({ status: "erro", mensagem: "Erro ao buscar Motorista", erro: error.message });
  }
};

// Função para inserir uma nova conta
const InsertMotorista = async (req, res) => {
  try {
    const motorista = req.body;
    const { msg, linhasAfetadas } = await mdlMotorista.InsertMotorista(motorista);
    res.json({ status: msg, linhasAfetadas });
  } catch (error) {
    res.status(500).json({ status: "erro", mensagem: "Erro ao inserir Motorista", erro: error.message });
  }
};

// Função para atualizar uma conta existente
const UpdateMotorista = async (req, res) => {
  try {

    const { id } = req.params;

    // Os dados para atualização vêm do corpo da requisição
    const motorista = req.body;

    // Adicionar o ID ao motorista
    motorista.id = id;

    // Atualizar a conta com o ID e os dados
    const { msg, linhasAfetadas } = await mdlMotorista.UpdateMotorista(motorista);

    // Retornar a resposta com o status e número de linhas afetadas
    res.json({ status: msg, linhasAfetadas });
  } catch (error) {
    res.status(500).json({ status: "erro", mensagem: "Erro ao atualizar Motorista", erro: error.message });
  }
};


// Função para deletar uma conta
const DeleteMotorista = async (req, res) => {
  try {
    // Captura o ID a partir de req.params.id
    const id = req.params.id;

    // Valida se o ID foi fornecido
    if (!id) {
      return res.status(400).json({ status: "erro", mensagem: "ID do Motorista é obrigatório" });
    }

    // Chama a função do modelo para deletar o usuário
    const { linhasAfetadas } = await mdlMotorista.DeleteMotorista({ id });

    // Verifica se o usuário foi encontrado e removido
    if (linhasAfetadas > 0) {
      res.status(200).json({ status: "ok", mensagem: "Motorista removido com sucesso" });
    } else {
      res.status(404).json({ status: "erro", mensagem: "Motorista não encontrado" });
    }
  } catch (error) {
    // Lida com erros e retorna resposta de erro
    res.status(500).json({ status: "erro", mensagem: "Erro ao deletar Motorista", erro: error.message });
  }
};


module.exports = {
    GetAllMotoristas,
    GetMotoristaByID,
    InsertMotorista,
    UpdateMotorista,
    DeleteMotorista
}
