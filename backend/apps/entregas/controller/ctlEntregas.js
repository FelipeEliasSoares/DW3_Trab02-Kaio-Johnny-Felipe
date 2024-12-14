const mdlEntregas = require("../model/mdlEntregas");

const GetAllEntregas = async (req, res) => {
    try {
        const { descricao, dataInicio, dataEntrega, clienteID } = req.query;
        const filtros = { descricao, dataInicio, dataEntrega, clienteID };
        const registros = await mdlEntregas.GetAllEntregas(filtros);
        res.json({ status: "ok", registros });
    } catch (error) {
        res.status(500).json({ status: "erro", mensagem: "Erro ao obter entregas", erro: error.message });
    }
};

const GetEntregaByID = async (req, res) => {
    try {
        const { id } = req.params;
        const registro = await mdlEntregas.GetEntregaByID(id);
        if (registro) {
            res.json({ status: "ok", registro });
        } else {
            res.status(404).json({ status: "erro", mensagem: "Entrega não encontrada" });
        }
    } catch (error) {
        res.status(500).json({ status: "erro", mensagem: "Erro ao buscar entrega", erro: error.message });
    }
};

const InsertEntrega = async (req, res) => {
    try {
        const registro = req.body;
        const { msg, linhasAfetadas } = await mdlEntregas.InsertEntrega(registro);
        res.json({ status: msg, linhasAfetadas });
    } catch (error) {
        res.status(500).json({ status: "erro", mensagem: "Erro ao inserir entrega", erro: error.message });
    }
};

const UpdateEntrega = async (req, res) => {
    try {
        const { id } = req.params;
        const registro = { ...req.body, id };
        const { msg, linhasAfetadas } = await mdlEntregas.UpdateEntrega(registro);
        res.json({ status: linhasAfetadas > 0 ? 'success' : 'failure', linhasAfetadas });
    } catch (error) {
        res.status(500).json({ status: "erro", mensagem: "Erro ao atualizar entrega", erro: error.message });
    }
};

const DeleteEntrega = async (req, res) => {
    try {
        const { id } = req.params;
        const { msg, linhasAfetadas } = await mdlEntregas.DeleteEntrega(id);
        res.json({ status: msg, linhasAfetadas });
    } catch (error) {
        res.status(500).json({ status: "erro", mensagem: "Erro ao excluir entrega", erro: error.message });
    }
};

module.exports = {
    GetAllEntregas,
    GetEntregaByID,
    InsertEntrega,
    UpdateEntrega,
    DeleteEntrega
};
