const db = require("../../../database/databaseconfig");

const GetAllEntregas = async (filtro = {}) => {
    const { descricao, dataInicio, dataEntrega, clienteID } = filtro;
    let query = `
        SELECT e.*, mv.motoristaID, mv.veiculoID, 
               c.nome AS cliente_nome
        FROM Entregas e
        LEFT JOIN MotoristasVeiculos mv ON e.motorisVeiculoId = mv.id
        LEFT JOIN Clientes c ON e.clienteID = c.id
        WHERE e.removido = FALSE
    `;

    const queryParams = [];
    let paramIndex = 1;

    if (descricao) {
        query += ` AND e.descricao ILIKE $${paramIndex}`;
        queryParams.push(`%${descricao}%`);
        paramIndex++;
    }

    if (dataInicio) {
        query += ` AND e.dataInicio = $${paramIndex}`;
        queryParams.push(dataInicio);
        paramIndex++;
    }

    if (dataEntrega) {
        query += ` AND e.dataEntrega = $${paramIndex}`;
        queryParams.push(dataEntrega);
        paramIndex++;
    }

    if (clienteID) {
        query += ` AND e.clienteID = $${paramIndex}`;
        queryParams.push(clienteID);
        paramIndex++;
    }

    return (await db.query(query, queryParams)).rows;
};

const GetEntregaByID = async (id) => {
    return (
        await db.query(
            `SELECT e.*, mv.motoristaID, mv.veiculoID, 
                    c.nome AS cliente_nome
             FROM Entregas e
             LEFT JOIN MotoristasVeiculos mv ON e.motorisVeiculoId = mv.id
             LEFT JOIN Clientes c ON e.clienteID = c.id
             WHERE e.id = $1 AND e.removido = FALSE`,
            [id]
        )
    ).rows[0];
};

const InsertEntrega = async (registro) => {
    let linhasAfetadas;
    let msg = "ok";
    try {
        linhasAfetadas = (
            await db.query(
                `INSERT INTO Entregas (
                    descricao, 
                    dataInicio, 
                    dataEntrega, 
                    motorisVeiculoId, 
                    clienteID)
                 VALUES ($1, $2, $3, $4, $5)`,
                [registro.descricao, registro.dataInicio, registro.dataEntrega, registro.motorisVeiculoId, registro.clienteID]
            )
        ).rowCount;
    } catch (error) {
        msg = `[mdlEntregas|InsertEntrega] Error: ${error.detail}`;
        linhasAfetadas = -1;
    }
    return { msg, linhasAfetadas };
};

const UpdateEntrega = async (registro) => {
    let linhasAfetadas;
    let msg = "ok";
    try {
        linhasAfetadas = (
            await db.query(
            `UPDATE Entregas SET 
                 descricao = $2, 
                 dataInicio = $3, 
                 dataEntrega = $4, 
                 motorisVeiculoId = $5, 
                 clienteID = $6
            WHERE id = $1 AND removido = FALSE`,
                [registro.id, registro.descricao, registro.dataInicio, registro.dataEntrega, registro.motorisVeiculoId, registro.clienteID]
            )
        ).rowCount;
    } catch (error) {
        msg = `[mdlEntregas|UpdateEntrega] ${error.detail}`;
        linhasAfetadas = -1;
    }
    return { msg, linhasAfetadas };
};

const DeleteEntrega = async (id) => {
    let linhasAfetadas;
    let msg = "ok";
    try {
        linhasAfetadas = (
            await db.query(
                `UPDATE Entregas SET 
                    removido = TRUE 
                 WHERE id = $1`,
                [id]
            )
        ).rowCount;
    } catch (error) {
        msg = `[mdlEntregas|DeleteEntrega] ${error.detail}`;
        linhasAfetadas = -1;
    }
    return { msg, linhasAfetadas };
};

module.exports = {
    GetAllEntregas,
    GetEntregaByID,
    InsertEntrega,
    UpdateEntrega,
    DeleteEntrega
};
