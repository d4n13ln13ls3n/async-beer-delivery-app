const { expect } = require("chai");
const chai = require("chai");
const sinon = require("sinon");
const chaiHttp = require("chai-http");

const app = require("../api/app");

const { Product } = require("../database/models");
const { findAllMock } = require("./mocks/products");

chai.use(chaiHttp);

describe("Testes da rota /products", () => {
  describe("Verifica se é possível listar todos os produtos com sucesso", async () => {
    let response;

    before(async () => {
      sinon.stub(Product, "findAll").resolves(findAllMock);

      response = await chai.request(app).get("/products");
    });

    after(() => {
      sinon.restore();
    });

    it("retorna status 200", () => {
      expect(response.status).to.be.equal(200);
    });

    it("retorna um array de objetos com as informações de cada produto", () => {
      expect(response.body).to.be.deep.equal(findAllMock);
    });
  });
});
