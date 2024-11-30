const mdlUsuario = require("../model/mdlUsuarios");

// Função para obter todas as contas
const GetAllUsuarios = async (req, res) => {
  try {
    const registros = await mdlUsuario.GetAllUsuarios();
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
const GetUsuarioByID = async (req, res) => {
  try {
    const usuarioId = req.params.id;
    const registro = await mdlUsuario.GetUsuarioByID(usuarioId);
    if (registro.length > 0) {
      res.json({ status: "ok", registro });
    } else {
      res.status(404).json({
        status: "erro",
        mensagem: "Usuário com esse ID não encontrado",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "erro",
      mensagem: "Erro ao buscar usuario",
      erro: error.message,
    });
  }
};

// Função para inserir uma nova conta
const InsertUsuario = async (req, res) => {
  try {
    const registro = req.body;
    const { msg, linhasAfetadas } = await mdlUsuario.InsertUsuario(registro);
    res.json({ status: msg, linhasAfetadas });
  } catch (error) {
    res.status(500).json({
      status: "erro",
      mensagem: "Erro ao inserir usuario",
      erro: error.message,
    });
  }
};

// Função para atualizar uma conta existente
const UpdateUsuario = async (req, res) => {
  try {
    // Captura o ID da URL e os dados do corpo
    const id = req.params.id;
    const registro = req.body;
    registro.id = id;
    // Chama o modelo para atualizar o usuário
    const { msg, linhasAfetadas } = await mdlUsuario.UpdateUsuario(registro);
    if (linhasAfetadas > 0) {
      res.status(200).json({
        status: msg,
        mensagem: "Usuário atualizado com sucesso",
        linhasAfetadas,
      });
    } else {
      res
        .status(404)
        .json({ status: "erro", mensagem: "Usuário não encontrado" });
    }
  } catch (error) {
    // Retorna erro em caso de exceção
    res.status(500).json({
      status: "erro",
      mensagem: "Erro ao atualizar usuário",
      erro: error.message,
    });
  }
};

// Função para deletar uma conta
const DeleteUsuario = async (req, res) => {
  try {
    // Captura o ID a partir de req.params.id
    const id = req.params.id;

    // Valida se o ID foi fornecido
    if (!id) {
      return res
        .status(400)
        .json({ status: "erro", mensagem: "ID do usuário é obrigatório" });
    }

    // Chama a função do modelo para deletar o usuário
    const { linhasAfetadas } = await mdlUsuario.DeleteUsuario({ id });

    // Verifica se o usuário foi encontrado e removido
    if (linhasAfetadas > 0) {
      res
        .status(200)
        .json({ status: "ok", mensagem: "Usuário removido com sucesso" });
    } else {
      res
        .status(404)
        .json({ status: "erro", mensagem: "Usuário não encontrado" });
    }
  } catch (error) {
    // Lida com erros e retorna resposta de erro
    res.status(500).json({
      status: "erro",
      mensagem: "Erro ao deletar usuário",
      erro: error.message,
    });
  }
};

module.exports = {
  GetAllUsuarios,
  GetUsuarioByID,
  InsertUsuario,
  UpdateUsuario,
  DeleteUsuario,
};
