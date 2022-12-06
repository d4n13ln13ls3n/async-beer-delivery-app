const chai = require("chai");
const sinon = require("sinon");
const chaiHttp = require("chai-http");

const app = require("../api/app");

const { User } = require("../database/models");
const { createMock, successRegisterResponse, findOneMock, errorRegisterResponseName, errorRegisterResponseEmail } = require("./mocks/users");
const { expect } = require("chai");
const jwt = require("jsonwebtoken");

chai.use(chaiHttp);

describe("Testes da rota /register", () => {
  describe("Verifica se é possível cadastrar novo usuário com sucesso", async () => {
    let response;

    before(async () => {
      sinon.stub(User, "findOne").resolves(null);
      sinon.stub(User, "create").resolves(createMock);
      sinon
        .stub(jwt, "sign")
        .returns(
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwibmFtZSI6IlRheW7DoSBTaWx2YSBNYWPDqmRvIiwiZW1haWwiOiJ0YXluYV9zbTE5OTZAaG90bWFpbC5jb20iLCJyb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2NzAzNTkxNTIsImV4cCI6MTY3MDQ0NTU1Mn0.6DBmMfxe1cjx9KuzKelXjoesZue6SDQ3zREmseg2-aA"
        );

      response = await chai.request(app).post("/register").send({
        name: "Tayná Silva Macêdo",
        email: "tayna_sm1996@hotmail.com",
        password: "123ABC*_",
      });
    });

    after(() => {
      sinon.restore();
    });

    it("retorna status 201", () => {
      expect(response.status).to.be.equal(201);
    });

    it("retorna um objeto com name, email, role e token", () => {
      expect(response.body).to.be.deep.equal(successRegisterResponse);
    });
  });

  describe("Verifica se não é possível cadastrar um usuário com um nome que já existe", async () => {
    let response;

    before(async () => {
      sinon.stub(User, "findOne").resolves(findOneMock);

      response = await chai.request(app).post("/register").send({
        name: "Delivery App Admin",
        email: "adm2@deliveryapp.com",
        password: "--adm2@21!!--",
      });
    });

    after(() => {
      sinon.restore();
    });

    it("retorna status 409", () => {
      expect(response.status).to.be.equal(409);
    });

    it("retorna um objeto com uma mensagem de erro", () => {
      expect(response.body).to.be.deep.equal(errorRegisterResponseName);
    });
  });
  
  describe("Verifica se não é possível cadastrar um usuário com um email que já existe", async () => {
    let response;

    before(async () => {
      sinon.stub(User, "findOne").onCall(0).resolves(null).onCall(1).resolves(findOneMock);

      response = await chai.request(app).post("/register").send({
        name: "Delivery App Admin 2",
        email: "adm@deliveryapp.com",
        password: "--adm2@21!!--",
      });
    });

    after(() => {
      sinon.restore();
    });

    it("retorna status 409", () => {
      expect(response.status).to.be.equal(409);
    });

    it("retorna um objeto com uma mensagem de erro", () => {
      expect(response.body).to.be.deep.equal(errorRegisterResponseEmail);
    });
  });
});
