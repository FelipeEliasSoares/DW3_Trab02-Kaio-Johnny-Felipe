const mdlVeiculos = require("../model/mdlVeiculos");

// Função para obter todas as contas
const GetAllVeiculos = async (req, res) => {
  try {
    const registros = await mdlVeiculos.GetAllVeiculos();
    res.json({ status: "ok", registros });
  } catch (error) {
    res.status(500).json({
      status: "erro",
      mensagem: "Erro ao obter todos os usuários",
      erro: error.message,
    });
  }
};

// Função para obter uma conta por ID
const GetVeiculosByID = async (req, res) => {
  try {
    const veiculoId = req.params.id;
    const registro = await mdlVeiculos.GetVeiculosByID(veiculoId);
    if (registro.length > 0) {
      res.json({ status: "ok", registro });
    } else {
      res.status(404).json({
        status: "erro",
        mensagem: "Veiculo com esse ID não encontrado",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "erro",
      mensagem: "Erro ao buscar veiculo",
      erro: error.message,
    });
  }
};

// Função para inserir uma nova conta
const InsertVeiculo = async (req, res) => {
  try {
    const registro = req.body;
    const { msg, linhasAfetadas } = await mdlVeiculos.InsertVeiculo(registro);
    res.json({ status: msg, linhasAfetadas });
  } catch (error) {
    res.status(500).json({
      status: "erro",
      mensagem: "Erro ao inserir veiculo",
      erro: error.message,
    });
  }
};

// Função para atualizar uma conta existente
const UpdateVeiculo= async (req, res) => {
  try {
    // Captura o ID da URL e os dados do corpo
    const id = req.params.id;
    const registro = req.body;
    registro.id = id;
    // Chama o modelo para atualizar o usuário
    const { msg, linhasAfetadas } = await mdlVeiculos.UpdateVeiculo(registro);
    if (linhasAfetadas > 0) {
      res.status(200).json({
        status: msg,
        mensagem: "Veiculos atualizado com sucesso",
        linhasAfetadas,
      });
    } else {
      res
        .status(404)
        .json({ status: "erro", mensagem: "Veiculo não encontrado" });
    }
  } catch (error) {
    // Retorna erro em caso de exceção
    res.status(500).json({
      status: "erro",
      mensagem: "Erro ao atualizar Veiculo",
      erro: error.message,
    });
  }
};

// Função para deletar uma conta
const DeleteVeiculo = async (req, res) => {
  try {
    // Captura o ID a partir de req.params.id
    const id = req.params.id;

    // Valida se o ID foi fornecido
    if (!id) {
      return res
        .status(400)
        .json({ status: "erro", mensagem: "ID do veiculo é obrigatório" });
    }

    // Chama a função do modelo para deletar o usuário
    const { linhasAfetadas } = await mdlVeiculos.DeleteVeiculo({ id });

    // Verifica se o usuário foi encontrado e removido
    if (linhasAfetadas > 0) {
      res
        .status(200)
        .json({ status: "ok", mensagem: "Veiculo removido com sucesso" });
    } else {
      res
        .status(404)
        .json({ status: "erro", mensagem: "Veiculo não encontrado" });
    }
  } catch (error) {
    // Lida com erros e retorna resposta de erro
    res.status(500).json({
      status: "erro",
      mensagem: "Erro ao deletar Veiculo",
      erro: error.message,
    });
  }
};

module.exports = {
  GetAllVeiculos,
  GetVeiculosByID,
  InsertVeiculo,
  UpdateVeiculo,
  DeleteVeiculo,
};
