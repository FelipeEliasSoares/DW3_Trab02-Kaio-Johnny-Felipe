const jwt = require("jsonwebtoken");
const mdlLogin = require("../login/model/mdlLogin");
const { promisify } = require("util");

const verifyAsync = promisify(jwt.verify);

const Me = async (req, res, next) => {
  try {
    const token = req.cookies.auth_token;

    if (!token) {
      return res
        .status(403)
        .json({ auth: false, message: "Token JWT não fornecido" });
    }

    // Verifica e decodifica o token JWT
    const decoded = await verifyAsync(token, process.env.SECRET_API);

    const usuario = await mdlLogin.GetUsuarioById(decoded.id);

    if (!usuario) {
      return res
        .status(404)
        .json({ auth: false, message: "Usuário não encontrado" });
    }

    req.user = usuario;

    //middleware/controlador
    next();
  } catch (error) {
    if (
      error.name === "TokenExpiredError" ||
      error.name === "JsonWebTokenError"
    ) {
      return res
        .status(403)
        .json({ auth: false, message: "Token JWT inválido ou expirado" });
    }
    console.error("Erro no middleware 'Me':", error);
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
};

module.exports = Me;
