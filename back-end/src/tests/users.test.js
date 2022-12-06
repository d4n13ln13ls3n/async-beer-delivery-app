const chai = require("chai");
const sinon = require("sinon");
const chaiHttp = require("chai-http");

const app = require("../api/app");

const { User } = require("../database/models");
const {
  findAllMock,
  errorListAllResponse,
  findAllSellersMock,
  errorListSellersResponse,
  errorListSellersInvalidTokenResponse,
  findOneSellerMock,
  errorRegisterResponseName,
  errorRegisterResponseEmail,
} = require("./mocks/users");
const { expect } = require("chai");

chai.use(chaiHttp);

describe("Testes da rota /users", () => {
  describe("Verifica se é possível listar todos os vendedores e clientes com sucesso", async () => {
    let response;
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkRlbGl2ZXJ5IEFwcCBBZG1pbiIsImVtYWlsIjoiYWRtQGRlbGl2ZXJ5YXBwLmNvbSIsInJvbGUiOiJhZG1pbmlzdHJhdG9yIiwiaWF0IjoxNjcwMzYyMjcyLCJleHAiOjE2NzA0NDg2NzJ9.a-uDyD4gpKbJZ-4clkgmEEo_4USOUiSwSv0LxlCQ0L0";

    before(async () => {
      sinon.stub(User, "findAll").resolves(findAllMock);

      response = await chai
        .request(app)
        .get("/users")
        .set("Authorization", token);
    });

    after(() => {
      sinon.restore();
    });

    it("retorna status 200", () => {
      expect(response.status).to.be.equal(200);
    });

    it("retorna um array de objetos com as informações dos usuários", () => {
      expect(response.body).to.be.deep.equal(findAllMock);
    });
  });

  describe("Verifica se não é possível listar todos os vendedores e clientes quando o token não é de administrador", async () => {
    let response;
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6IkZ1bGFuYSBQZXJlaXJhIiwiZW1haWwiOiJmdWxhbmFAZGVsaXZlcnlhcHAuY29tIiwicm9sZSI6InNlbGxlciIsImlhdCI6MTY3MDM2Mjc3MiwiZXhwIjoxNjcwNDQ5MTcyfQ.eYK2z-E6RP36q90gcvA75tfBGWMxaD3IHUIGsaiBkfY";

    before(async () => {
      response = await chai
        .request(app)
        .get("/users")
        .set("Authorization", token);
    });

    after(() => {
      sinon.restore();
    });

    it("retorna status 401", () => {
      expect(response.status).to.be.equal(401);
    });

    it("retorna uma mensagem de erro", () => {
      expect(response.body).to.be.deep.equal(errorListAllResponse);
    });
  });

  describe("Verifica se é possível cadastrar um novo vendedor com sucesso", async () => {
    let response;
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkRlbGl2ZXJ5IEFwcCBBZG1pbiIsImVtYWlsIjoiYWRtQGRlbGl2ZXJ5YXBwLmNvbSIsInJvbGUiOiJhZG1pbmlzdHJhdG9yIiwiaWF0IjoxNjcwMzYyMjcyLCJleHAiOjE2NzA0NDg2NzJ9.a-uDyD4gpKbJZ-4clkgmEEo_4USOUiSwSv0LxlCQ0L0";

    before(async () => {
      sinon.stub(User, "findOne").resolves(null);
      sinon.stub(User, "create").resolves(null);

      response = await chai
        .request(app)
        .post("/users")
        .send({
          name: "Daniel Yabu",
          email: "daniel@email.com",
          password: "senhaSUPERsecreta1254*-",
          roleToRegister: "seller",
        })
        .set("Authorization", token);
    });

    after(() => {
      sinon.restore();
    });

    it("retorna status 201", () => {
      expect(response.status).to.be.equal(201);
    });
  });

  describe("Verifica se não é possível cadastrar um novo vendedor se o token não for de administrador", async () => {
    let response;
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6IkZ1bGFuYSBQZXJlaXJhIiwiZW1haWwiOiJmdWxhbmFAZGVsaXZlcnlhcHAuY29tIiwicm9sZSI6InNlbGxlciIsImlhdCI6MTY3MDM2Mjc3MiwiZXhwIjoxNjcwNDQ5MTcyfQ.eYK2z-E6RP36q90gcvA75tfBGWMxaD3IHUIGsaiBkfY";

    before(async () => {
      response = await chai
        .request(app)
        .post("/users")
        .send({
          name: "Daniel Yabu",
          email: "daniel@email.com",
          password: "senhaSUPERsecreta1254*-",
          roleToRegister: "seller",
        })
        .set("Authorization", token);
    });

    after(() => {
      sinon.restore();
    });

    it("retorna status 401", () => {
      expect(response.status).to.be.equal(401);
    });

    it("retorna mensagem de erro", () => {
      expect(response.body).to.be.deep.equal(errorListAllResponse);
    });
  });

  describe("Verifica se não é possível cadastrar um novo vendedor se o nome já existir", async () => {
    let response;
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkRlbGl2ZXJ5IEFwcCBBZG1pbiIsImVtYWlsIjoiYWRtQGRlbGl2ZXJ5YXBwLmNvbSIsInJvbGUiOiJhZG1pbmlzdHJhdG9yIiwiaWF0IjoxNjcwMzYyMjcyLCJleHAiOjE2NzA0NDg2NzJ9.a-uDyD4gpKbJZ-4clkgmEEo_4USOUiSwSv0LxlCQ0L0";

    before(async () => {
      sinon.stub(User, "findOne").resolves(findOneSellerMock);

      response = await chai
        .request(app)
        .post("/register")
        .send({
          name: "Fulana Pereira",
          email: "fulana2@deliveryapp.com",
          password: "fulana@123",
          roleToRegister: "seller",
        })
        .set("Authorization", token);
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

  describe("Verifica se não é possível cadastrar um novo vendedor se o email já existir", async () => {
    let response;
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkRlbGl2ZXJ5IEFwcCBBZG1pbiIsImVtYWlsIjoiYWRtQGRlbGl2ZXJ5YXBwLmNvbSIsInJvbGUiOiJhZG1pbmlzdHJhdG9yIiwiaWF0IjoxNjcwMzYyMjcyLCJleHAiOjE2NzA0NDg2NzJ9.a-uDyD4gpKbJZ-4clkgmEEo_4USOUiSwSv0LxlCQ0L0";

    before(async () => {
      sinon
        .stub(User, "findOne")
        .onCall(0)
        .resolves(null)
        .onCall(1)
        .resolves(findOneSellerMock);

      response = await chai
        .request(app)
        .post("/register")
        .send({
          name: "Fulana Pereira Silva",
          email: "fulana@deliveryapp.com",
          password: "fulana@123",
          roleToRegister: "seller",
        })
        .set("Authorization", token);
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

describe("Testes da rota /users/sellers", () => {
  describe("Verifica se é possível listar todos os vendedores com sucesso", async () => {
    let response;
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywibmFtZSI6IkNsaWVudGUgWsOpIEJpcml0YSIsImVtYWlsIjoiemViaXJpdGFAZW1haWwuY29tIiwicm9sZSI6ImN1c3RvbWVyIiwiaWF0IjoxNjcwMzYzMTc4LCJleHAiOjE2NzA0NDk1Nzh9.ccbssZhyzPbmoJwDsn-CuQUpoBb58Tx5h3-Atxk85fI";

    before(async () => {
      sinon.stub(User, "findAll").resolves(findAllSellersMock);

      response = await chai
        .request(app)
        .get("/users/sellers")
        .set("Authorization", token);
    });

    after(() => {
      sinon.restore();
    });

    it("retorna status 200", () => {
      expect(response.status).to.be.equal(200);
    });

    it("retorna um array de objetos com o nome de cada vendedor", () => {
      expect(response.body).to.be.deep.equal(findAllSellersMock);
    });
  });

  describe("Verifica se não é possível listar todos os vendedores caso seja passado um token inválido", async () => {
    let response;
    const token = "eyJhbGciOiJIUzI1";

    before(async () => {
      response = await chai
        .request(app)
        .get("/users/sellers")
        .set("Authorization", token);
    });

    after(() => {
      sinon.restore();
    });

    it("retorna status 500", () => {
      expect(response.status).to.be.equal(500);
    });

    it("retorna uma mensagem de erro", () => {
      expect(response.body).to.be.deep.equal(
        errorListSellersInvalidTokenResponse
      );
    });
  });

  describe("Verifica se não é possível listar todos os vendedores caso não seja passado um token válido", async () => {
    let response;

    before(async () => {
      response = await chai.request(app).get("/users/sellers");
    });

    after(() => {
      sinon.restore();
    });

    it("retorna status 401", () => {
      expect(response.status).to.be.equal(401);
    });

    it("retorna uma mensagem de erro", () => {
      expect(response.body).to.be.deep.equal(errorListSellersResponse);
    });
  });
});

describe("Testes da rota /users/:userId", () => {
  describe("Verifica se é possível excluir um usuário com sucesso", async () => {
    let response;
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkRlbGl2ZXJ5IEFwcCBBZG1pbiIsImVtYWlsIjoiYWRtQGRlbGl2ZXJ5YXBwLmNvbSIsInJvbGUiOiJhZG1pbmlzdHJhdG9yIiwiaWF0IjoxNjcwMzYyMjcyLCJleHAiOjE2NzA0NDg2NzJ9.a-uDyD4gpKbJZ-4clkgmEEo_4USOUiSwSv0LxlCQ0L0";

    before(async () => {
      sinon.stub(User, "destroy").resolves(null);

      response = await chai
        .request(app)
        .delete("/users/2")
        .set("Authorization", token);
    });

    after(() => {
      sinon.restore();
    });

    it("retorna status 204", () => {
      expect(response.status).to.be.equal(204);
    });
  });

  describe("Verifica se não é possível excluir um usuário caso o token não seja de administrador", async () => {
    let response;
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywibmFtZSI6IkNsaWVudGUgWsOpIEJpcml0YSIsImVtYWlsIjoiemViaXJpdGFAZW1haWwuY29tIiwicm9sZSI6ImN1c3RvbWVyIiwiaWF0IjoxNjcwMzYzMTc4LCJleHAiOjE2NzA0NDk1Nzh9.ccbssZhyzPbmoJwDsn-CuQUpoBb58Tx5h3-Atxk85fI";

    before(async () => {
      response = await chai
        .request(app)
        .delete("/users/2")
        .set("Authorization", token);
    });

    after(() => {
      sinon.restore();
    });

    it("retorna status 401", () => {
      expect(response.status).to.be.equal(401);
    });

    it("retorna mensagem de erro", () => {
      expect(response.body).to.be.deep.equal(errorListAllResponse);
    });
  });
});
