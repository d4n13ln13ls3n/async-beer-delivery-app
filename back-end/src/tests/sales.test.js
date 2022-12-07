const chai = require("chai");
const sinon = require("sinon");
const chaiHttp = require("chai-http");

const app = require("../api/app");

const { User, Sale, Product, SaleProduct } = require("../database/models");
const { customerToken, findOneSellerMock } = require("./mocks/users");
const { createMock, findAllMock, listAllCustomerResponse } = require("./mocks/sales");
const { expect } = require("chai");
const {
  findOneMockFirstResult,
  findOneSecondResult,
} = require("./mocks/products");

chai.use(chaiHttp);

describe("Testes da rota /sales", () => {
  describe("Verifica se é possível cadastrar uma venda com sucesso", async () => {
    let response;

    before(async () => {
      sinon.stub(User, "findOne").resolves(findOneSellerMock);
      sinon.stub(Sale, "create").resolves(createMock);
      sinon
        .stub(Product, "findOne")
        .onCall(0)
        .resolves(findOneMockFirstResult)
        .onCall(1)
        .resolves(findOneSecondResult);
      sinon.stub(SaleProduct, "bulkCreate").resolves(null);

      response = await chai
        .request(app)
        .post("/sales")
        .send({
          sellerName: "Fulana Pereira",
          totPrice: 137.64,
          delAddress: "Av. Paulista",
          delNumber: 800,
          products: [
            {
              name: "Antarctica Pilsen 300ml",
              quantity: 12,
            },
            {
              name: "Skol Beats Senses 313ml",
              quantity: 24,
            },
          ],
        })
        .set("Authorization", customerToken);
    });

    after(() => {
      sinon.restore();
    });

    it("retorna status 201", () => {
      expect(response.status).to.be.equal(201);
    });

    it("retorna um objeto com a propriedade newSaleId", () => {
      expect(response.body).to.have.property("newSaleId");
    });
  });
});

describe('Testes da rota /sales/customers', () => {
  describe('Verifica se é possível listar todos os pedidos de um cliente com sucesso', () => {
    let response;

    before(async () => {
      sinon.stub(Sale, "findAll").resolves(findAllMock);

      response = await chai
        .request(app)
        .get("/sales/customers")
        .set("Authorization", customerToken);
    });

    after(() => {
      sinon.restore();
    });

    it("retorna status 200", () => {
      expect(response.status).to.be.equal(200);
    });

    it("retorna um array de objetos com as informações dos pedidos", () => {
      console.log(response.body);
      expect(response.body).to.be.deep.equal(listAllCustomerResponse);
    });
  })
})