const db = require("../../../database/databaseconfig");

const GetAllMotoristasVeiculos = async (filtro = {}) => {
    const { motoristaNome, veiculoPlaca } = filtro;
    let query = `
        SELECT mv.*, m.nome AS motorista_nome, m.cpf AS motorista_cpf, 
               v.placa AS veiculo_placa, v.modelo AS veiculo_modelo
        FROM MotoristasVeiculos mv
        INNER JOIN Motoristas m ON mv.motoristaID = m.id
        INNER JOIN Veiculos v ON mv.veiculoID = v.id
        WHERE mv.softDelete = FALSE
    `;

    const queryParams = [];
    let paramIndex = 1;

    if (motoristaNome) {
        query += ` AND m.nome ILIKE $${paramIndex}`;
        queryParams.push(`%${motoristaNome}%`);
        paramIndex++;
    }

    if (veiculoPlaca) {
        query += ` AND v.placa ILIKE $${paramIndex}`;
        queryParams.push(`%${veiculoPlaca}%`);
        paramIndex++;
    }

    return (await db.query(query, queryParams)).rows;
};

const GetMotoristaVeiculoByID = async (id) => {
    return (
        await db.query(
            `SELECT mv.*, m.nome AS motorista_nome, m.cpf AS motorista_cpf, 
                    v.placa AS veiculo_placa, v.modelo AS veiculo_modelo
             FROM MotoristasVeiculos mv
             INNER JOIN Motoristas m ON mv.motoristaID = m.id
             INNER JOIN Veiculos v ON mv.veiculoID = v.id
             WHERE mv.id = $1 AND mv.softDelete = FALSE`,
            [id]
        )
    ).rows[0];
};

const InsertMotoristaVeiculo = async (registro) => {
    let linhasAfetadas;
    let msg = "ok";
    try {
        linhasAfetadas = (
            await db.query(
                "INSERT INTO MotoristasVeiculos (motoristaID, veiculoID) VALUES ($1, $2)",
                [registro.motoristaID, registro.veiculoID]
            )
        ).rowCount;
    } catch (error) {
        msg = `[mdlMotoristasVeiculos|InsertMotoristaVeiculo] ${error.detail}`;
        linhasAfetadas = -1;
    }
    return { msg, linhasAfetadas };
};

const UpdateMotoristaVeiculo = async (registro) => {
    let linhasAfetadas;
    let msg = "ok";
    try {
        linhasAfetadas = (
            await db.query(
                "UPDATE MotoristasVeiculos SET motoristaID = $2, veiculoID = $3 WHERE id = $1 AND softDelete = FALSE",
                [registro.id, registro.motoristaID, registro.veiculoID]
            )
        ).rowCount;
    } catch (error) {
        msg = `[mdlMotoristasVeiculos|UpdateMotoristaVeiculo] ${error.detail}`;
        linhasAfetadas = -1;
    }
    return { msg, linhasAfetadas };
};

const DeleteMotoristaVeiculo = async (id) => {
    let linhasAfetadas;
    let msg = "ok";
    try {
        linhasAfetadas = (
            await db.query(
                "UPDATE MotoristasVeiculos SET softDelete = TRUE WHERE id = $1",
                [id]
            )
        ).rowCount;
    } catch (error) {
        msg = `[mdlMotoristasVeiculos|DeleteMotoristaVeiculo] ${error.detail}`;
        linhasAfetadas = -1;
    }
    return { msg, linhasAfetadas };
};

module.exports = {
    GetAllMotoristasVeiculos,
    GetMotoristaVeiculoByID,
    InsertMotoristaVeiculo,
    UpdateMotoristaVeiculo,
    DeleteMotoristaVeiculo
};