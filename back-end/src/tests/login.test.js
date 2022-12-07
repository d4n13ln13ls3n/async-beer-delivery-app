const chai = require("chai");
const sinon = require("sinon");
const chaiHttp = require("chai-http");

const app = require("../api/app");

const { User } = require("../database/models");
const { findOneMock, successLoginResponse, errorLoginResponse, adminToken } = require("./mocks/users");
const { expect } = require("chai");
const jwt = require("jsonwebtoken");

chai.use(chaiHttp);

describe("Testes da rota /login", () => {
  describe("Verifica se é possível fazer login com sucesso", async () => {
    let response;

    before(async () => {
      sinon.stub(User, "findOne").resolves(findOneMock);
      sinon
        .stub(jwt, "sign")
        .returns(adminToken);

      response = await chai.request(app).post("/login").send({
        email: "adm@deliveryapp.com",
        password: "--adm2@21!!--",
      });
    });

    after(() => {
      sinon.restore();
    });

    it("retorna status 200", () => {
      expect(response.status).to.be.equal(200);
    });

    it("retorna um objeto com name, email, role e token", () => {
      expect(response.body).to.be.deep.equal(successLoginResponse);
    });
  });

  describe("Verifica se não é possível fazer login com um email inválido", async () => {
    let response;

    before(async () => {
      sinon.stub(User, "findOne").resolves(null);

      response = await chai.request(app).post("/login").send({
        email: "invalid@email.com",
        password: "--adm2@21!!--",
      });
    });

    after(() => {
      sinon.restore();
    });

    it("retorna status 404", () => {
      expect(response.status).to.be.equal(404);
    });

    it("retorna um objeto com uma mensagem de erro", () => {
      expect(response.body).to.be.deep.equal(errorLoginResponse);
    });
  });

  describe("Verifica se não é possível fazer login com uma senha inválida", async () => {
    let response;

    before(async () => {
      sinon.stub(User, "findOne").resolves(null);

      response = await chai.request(app).post("/login").send({
        email: "adm@deliveryapp.com",
        password: "_invalidPassword*",
      });
    });

    after(() => {
      sinon.restore();
    });

    it("retorna status 404", () => {
      expect(response.status).to.be.equal(404);
    });

    it("retorna um objeto com uma mensagem de erro", () => {
      expect(response.body).to.be.deep.equal(errorLoginResponse);
    });
  });
});
