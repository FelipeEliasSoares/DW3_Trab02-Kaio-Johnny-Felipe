const db = require("../../../database/databaseconfig");

const GetAllEntregas = async (filtro = {}) => {
    const { descricao, dataInicio, dataEntrega, clienteID } = filtro;
    let query = `
        SELECT e.*, mv.motoristaID, mv.veiculoID, 
               c.nome AS cliente_nome
        FROM Entregas e
        LEFT JOIN MotoristasVeiculos mv ON e.motorisVeiculoId = mv.id
        LEFT JOIN Clientes c ON e.clienteID = c.id
        WHERE e.softDelete = FALSE
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
             WHERE e.id = $1 AND e.softDelete = FALSE`,
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

// Função para atualizar uma Entrega
const UpdateEntrega = async (registro) => { 
    console.log("Recebendo atualização para Entrega:", registro);
    
    // Padronização dos nomes dos campos
    if (
        !registro.id || 
        !registro.descricao || 
        !registro.dataInicio || 
        !registro.dataEntrega || 
        !registro.motoristaVeiculoId || 
        !registro.clienteID
    ) { 
        console.error("Dados inválidos para atualização:", registro);
        throw new Error('Invalid input data'); 
    }

    let linhasAfetadas;
    let msg = "ok";

    try {
        linhasAfetadas = (
            await db.query(
                `UPDATE Entregas SET 
                    descricao = $2, 
                    dataInicio = $3, 
                    dataEntrega = $4, 
                    motoristaVeiculoId = $5, 
                    clienteID = $6
                WHERE id = $1 AND softDelete = FALSE`,
                [
                    registro.id, 
                    registro.descricao, 
                    registro.dataInicio, 
                    registro.dataEntrega, 
                    registro.motoristaVeiculoId, 
                    registro.clienteID
                ]
            )
        ).rowCount;

        console.log(`Linhas afetadas: ${linhasAfetadas}`);
    } catch (error) {
        msg = `[mdlEntregas|UpdateEntrega] ${error.detail || error.message}`;
        linhasAfetadas = -1;
        console.error("Erro ao atualizar entrega:", error);
    }

    return { msg, linhasAfetadas };
};




const DeleteEntrega = async (id) => { if (!id || isNaN(id)) { return { msg: 'Invalid ID', linhasAfetadas: 0 }; }
    let linhasAfetadas;
    let msg = "ok";
    try {
        linhasAfetadas = (
            await db.query(
                `UPDATE Entregas SET 
                    softDelete = TRUE 
                 WHERE id = $1`,
                [id]
            )
        ).rowCount;
    } catch (error) {
        msg = `[Error in DeleteEntrega] ${error.detail}`;
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
