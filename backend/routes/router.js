const express = require("express");
const routerApp = express.Router();

const appLogin = require("../apps/login/controller/ctlLogin");
const Me = require("../apps/middleware/auth");
const appClientes = require("../apps/clientes/controller/ctlClientes");
const appVeiculos = require("../apps/veiculos/controller/ctlVeiculos");
const appMotoristas = require("../apps/motoristas/controller/ctlMotoristas");

routerApp.use((req, res, next) => {
  next();
});

// Rota raiz para teste
routerApp.get("/", (req, res) => {
  res.send("Olá mundo!");
});

// Rotas de Autenticação
routerApp.post("/login", appLogin.Login);
routerApp.post("/logout", appLogin.Logout);
routerApp.get("/api/auth/me", Me, appLogin.Me);


// Rotas de Motoristas
routerApp.get("/motoristas", Me, appMotoristas.GetAllMotoristas);
routerApp.get("/motoristas/:id", Me, appMotoristas.GetMotoristaByID);
routerApp.post("/motoristas", Me, appMotoristas.InsertMotorista);
routerApp.put("/motoristas/:id", Me, appMotoristas.UpdateMotorista);
routerApp.delete("/motoristas/:id", Me, appMotoristas.DeleteMotorista);

// Rotas de Veiculos
routerApp.get("/veiculos", Me, appVeiculos.GetAllVeiculos);
routerApp.get("/veiculos/:id", Me, appVeiculos.GetVeiculosByID);
routerApp.post("/veiculos", Me, appVeiculos.InsertVeiculo);
routerApp.put("/veiculos/:id", Me, appVeiculos.UpdateVeiculo);
routerApp.delete("/veiculos/:id", Me, appVeiculos.DeleteVeiculo);

// Rotas de Clientes
routerApp.get("/clientes", Me, appClientes.GetAllClientes);
routerApp.get("/clientes/:id", Me, appClientes.GetClientesByID);
routerApp.post("/clientes", Me, appClientes.InsertClientes);
routerApp.put("/clientes/:id", Me, appClientes.UpdateClientes);
routerApp.delete("/clientes/:id", Me, appClientes.DeleteClientes);

module.exports = routerApp;
