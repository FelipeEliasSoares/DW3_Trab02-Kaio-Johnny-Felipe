const express = require("express");
const routerApp = express.Router();

const appLogin = require("../apps/login/controller/ctlLogin");

const Me = require("../apps/middleware/auth");
const appClientes = require("../apps/clientes/controller/ctlClientes");
const appEntregas = require("../apps/entregas/controller/ctlEntregas");
const appVeiculos = require("../apps/veiculos/controller/ctlVeiculos");
const appMotoristas = require("../apps/motoristas/controller/ctlMotoristas");
const appMotoristasVeiculos = require("../apps/motoristasVeiculos/controller/ctlMotoristasVeiculos");


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


/// Rotas de Motoristas
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
routerApp.post("/clientes", Me, appClientes.InsertCliente);
routerApp.put("/clientes/:id", Me, appClientes.UpdateCliente);
routerApp.delete("/clientes/:id", Me, appClientes.DeleteCliente);

// Rotas Entregas
routerApp.get("/entregas", Me, appEntregas.GetAllEntregas);
routerApp.get("/entregas/:id", Me, appEntregas.GetEntregaByID);
routerApp.post("/entregas", Me, appEntregas.InsertEntrega);
routerApp.put("/entregas/:id", Me, appEntregas.UpdateEntrega);
routerApp.delete("/entregas/:id", Me, appEntregas.DeleteEntrega);

// Rotas de Usuários
routerApp.get("/usuarios", Me, appUsuarios.GetAllUsuarios);
routerApp.get("/usuarios/:id", Me, appUsuarios.GetUsuarioByID);
routerApp.post("/usuarios", Me, appUsuarios.InsertUsuario);
routerApp.put("/usuarios/:id", Me, appUsuarios.UpdateUsuario);
routerApp.delete("/usuarios/:id", Me, appUsuarios.DeleteUsuario);

// Rotas para MotoristasVeiculos
routerApp.get("/motoristas-veiculos", Me, appMotoristasVeiculos.GetAllMotoristasVeiculos);
routerApp.get("/motoristas-veiculos/:id", Me, appMotoristasVeiculos.GetMotoristaVeiculoByID);
routerApp.post("/motoristas-veiculos", Me, appMotoristasVeiculos.InsertMotoristaVeiculo);
routerApp.put("/motoristas-veiculos/:id", Me, appMotoristasVeiculos.UpdateMotoristaVeiculo);

module.exports = routerApp;
