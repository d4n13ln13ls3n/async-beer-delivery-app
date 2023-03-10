const chai = require("chai");
const sinon = require("sinon");
const chaiHttp = require("chai-http");

const app = require("../api/app");

const {
  User,
  Sale,
  Product,
  SaleProduct,
  sequelize,
} = require("../database/models");
const {
  customerToken,
  findOneSellerMock,
  sellerToken,
} = require("./mocks/users");
const {
  createMock,
  findAllMock,
  listAllCustomerResponse,
  listAllSellerResponse,
  findOneMock,
  listProductsCustomerResponse,
  listProductsSellerResponse,
  findOnePreparandoMock,
  updateStatusPreparandoResponse,
  findOneEmTransitoMock,
  updateStatusEmTransitoResponse,
  findOneEntregueMock,
  updateStatusEntregueResponse,
} = require("./mocks/sales");
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

describe("Testes da rota /sales/customers", () => {
  describe("Verifica se é possível listar todos os pedidos de um cliente com sucesso", () => {
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
      expect(response.body).to.be.deep.equal(listAllCustomerResponse);
    });
  });
});

describe("Testes da rota /sales/sellers", () => {
  describe("Verifica se é possível listar todas vendas feitas por um vendedor com sucesso", () => {
    let response;

    before(async () => {
      sinon.stub(Sale, "findAll").resolves(findAllMock);

      response = await chai
        .request(app)
        .get("/sales/sellers")
        .set("Authorization", sellerToken);
    });

    after(() => {
      sinon.restore();
    });

    it("retorna status 200", () => {
      expect(response.status).to.be.equal(200);
    });

    it("retorna um array de objetos com as informações dos pedidos", () => {
      expect(response.body).to.be.deep.equal(listAllSellerResponse);
    });
  });
});

describe("Testes da rota sales/:saleId/customers", () => {
  describe("Verifica se é possível listar os detalhes de um pedido específico de um cliente", () => {
    let response;

    before(async () => {
      sinon.stub(Sale, "findOne").resolves(findOneMock);

      response = await chai
        .request(app)
        .get("/sales/1/customers")
        .set("Authorization", customerToken);
    });

    after(() => {
      sinon.restore();
    });

    it("retorna status 200", () => {
      expect(response.status).to.be.equal(200);
    });

    it("retorna um objeto com os detalhes de um pedido específico", () => {
      expect(response.body).to.be.deep.equal(listProductsCustomerResponse);
    });
  });
});

describe("Testes da rota sales/:saleId/sellers", () => {
  describe("Verifica se é possível listar os detalhes de um pedido específico de um vendedor", () => {
    let response;

    before(async () => {
      sinon.stub(Sale, "findOne").resolves(findOneMock);

      response = await chai
        .request(app)
        .get("/sales/1/sellers")
        .set("Authorization", sellerToken);
    });

    after(() => {
      sinon.restore();
    });

    it("retorna status 200", () => {
      expect(response.status).to.be.equal(200);
    });

    it("retorna um objeto com os detalhes de um pedido específico", () => {
      expect(response.body).to.be.deep.equal(listProductsSellerResponse);
    });
  });
});

describe("Testes da rota sales/:saleId", () => {
  describe('Verifica se é possível atualizar o status do pedido de "Pendente" para "Preparando" com sucesso', () => {
    let response;

    before(async () => {
      sinon
        .stub(Sale, "findOne")
        .onCall(0)
        .resolves(findOneMock)
        .onCall(1)
        .resolves(findOnePreparandoMock);
      sinon.stub(Sale, "update").resolves(null);

      response = await chai
        .request(app)
        .patch("/sales/1")
        .set("Authorization", sellerToken);
    });

    after(() => {
      sinon.restore();
    });

    it("retorna status 200", () => {
      expect(response.status).to.be.equal(200);
    });

    it("retorna um objeto com o novo status do pedido", () => {
      expect(response.body).to.be.deep.equal(updateStatusPreparandoResponse);
    });
  });

  describe('Verifica se é possível atualizar o status do pedido de "Preparando" para "Em Trânsito" com sucesso', () => {
    let response;

    before(async () => {
      sinon
        .stub(Sale, "findOne")
        .onCall(0)
        .resolves(findOnePreparandoMock)
        .onCall(1)
        .resolves(findOneEmTransitoMock);
      sinon.stub(Sale, "update").resolves(null);

      response = await chai
        .request(app)
        .patch("/sales/1")
        .set("Authorization", sellerToken);
    });

    after(() => {
      sinon.restore();
    });

    it("retorna status 200", () => {
      expect(response.status).to.be.equal(200);
    });

    it("retorna um objeto com o novo status do pedido", () => {
      expect(response.body).to.be.deep.equal(updateStatusEmTransitoResponse);
    });
  });

  describe('Verifica se é possível atualizar o status do pedido de "Em Trânsito" para "Entregue" com sucesso', () => {
    let response;

    before(async () => {
      sinon
        .stub(Sale, "findOne")
        .onCall(0)
        .resolves(findOneEmTransitoMock)
        .onCall(1)
        .resolves(findOneEntregueMock);
      sinon.stub(Sale, "update").resolves(null);

      response = await chai
        .request(app)
        .patch("/sales/1")
        .set("Authorization", customerToken);
    });

    after(() => {
      sinon.restore();
    });

    it("retorna status 200", () => {
      expect(response.status).to.be.equal(200);
    });

    it("retorna um objeto com o novo status do pedido", () => {
      expect(response.body).to.be.deep.equal(updateStatusEntregueResponse);
    });
  });
});
