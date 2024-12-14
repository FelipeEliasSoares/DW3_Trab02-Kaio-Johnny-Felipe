const mdlMotoristasVeiculos = require("../model/mdlMotoristasVeiculos");

const GetAllMotoristasVeiculos = async (req, res) => {
    try {
        const { motoristaNome, veiculoPlaca } = req.query;
        const filtros = { motoristaNome, veiculoPlaca };
        const registros = await mdlMotoristasVeiculos.GetAllMotoristasVeiculos(filtros);
        res.json({ status: "ok", registros });
    } catch (error) {
        res.status(500).json({ status: "erro", mensagem: "Erro ao obter MotoristasVeiculos", erro: error.message });
    }
};

const GetMotoristaVeiculoByID = async (req, res) => {
    try {
        const { id } = req.params;
        const registro = await mdlMotoristasVeiculos.GetMotoristaVeiculoByID(id);
        if (registro) {
            res.json({ status: "ok", registro });
        } else {
            res.status(404).json({ status: "erro", mensagem: "Registro não encontrado" });
        }
    } catch (error) {
        res.status(500).json({ status: "erro", mensagem: "Erro ao buscar registro", erro: error.message });
    }
};

const InsertMotoristaVeiculo = async (req, res) => {
    try {
        const registro = req.body;
        const { msg, linhasAfetadas } = await mdlMotoristasVeiculos.InsertMotoristaVeiculo(registro);
        res.json({ status: msg, linhasAfetadas });
    } catch (error) {
        res.status(500).json({ status: "erro", mensagem: "Erro ao inserir registro", erro: error.message });
    }
};

const UpdateMotoristaVeiculo = async (req, res) => {
    try {
        const { id } = req.params;
        const registro = { ...req.body, id };
        const { msg, linhasAfetadas } = await mdlMotoristasVeiculos.UpdateMotoristaVeiculo(registro);
        res.json({ status: linhasAfetadas > 0 ? 'success' : 'failure', linhasAfetadas });
    } catch (error) {
        res.status(500).json({ status: "erro", mensagem: "Erro ao atualizar registro", erro: error.message });
    }
};

const DeleteMotoristaVeiculo = async (req, res) => {
    try {
        const { id } = req.params;
        const { msg, linhasAfetadas } = await mdlMotoristasVeiculos.DeleteMotoristaVeiculo(id);
        res.json({ status: msg, linhasAfetadas });
    } catch (error) {
        res.status(500).json({ status: "erro", mensagem: "Erro ao excluir registro", erro: error.message });
    }
};

module.exports = {
    GetAllMotoristasVeiculos,
    GetMotoristaVeiculoByID,
    InsertMotoristaVeiculo,
    UpdateMotoristaVeiculo,
    DeleteMotoristaVeiculo
};
