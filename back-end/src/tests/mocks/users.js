const findOneMock = {
  id: 1,
  name: "Delivery App Admin",
  email: "adm@deliveryapp.com",
  role: "administrator",
};

const findOneSellerMock = {
  id: 2,
  name: "Fulana Pereira",
  email: "fulana@deliveryapp.com",
  password: "3c28d2b0881bf46457a853e0b07531c6",
  role: "seller",
};

const findAllMock = [
  {
    id: 2,
    name: "Fulana Pereira",
    email: "fulana@deliveryapp.com",
    role: "seller",
  },
  {
    id: 3,
    name: "Cliente Zé Birita",
    email: "zebirita@email.com",
    role: "customer",
  },
];

const findAllSellersMock = [
  {
    name: "Fulana Pereira",
  },
];

const createMock = {
  id: 4,
  name: "Tayná Silva Macêdo",
  email: "tayna_sm1996@hotmail.com",
  password: "0ddc03c7736839c8df15bfb71b5b67d8",
  role: "customer",
};

const successLoginResponse = {
  name: "Delivery App Admin",
  email: "adm@deliveryapp.com",
  role: "administrator",
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkRlbGl2ZXJ5IEFwcCBBZG1pbiIsImVtYWlsIjoiYWRtQGRlbGl2ZXJ5YXBwLmNvbSIsInJvbGUiOiJhZG1pbmlzdHJhdG9yIiwiaWF0IjoxNjcwMzU0Mjk0LCJleHAiOjE2NzA0NDA2OTR9.eXdA9bSak7Th_b2hPvx99ftoEVaLFbFUGNmH3Ns2unQ",
};

const successRegisterResponse = {
  name: "Tayná Silva Macêdo",
  email: "tayna_sm1996@hotmail.com",
  role: "customer",
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwibmFtZSI6IlRheW7DoSBTaWx2YSBNYWPDqmRvIiwiZW1haWwiOiJ0YXluYV9zbTE5OTZAaG90bWFpbC5jb20iLCJyb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2NzAzNTkxNTIsImV4cCI6MTY3MDQ0NTU1Mn0.6DBmMfxe1cjx9KuzKelXjoesZue6SDQ3zREmseg2-aA",
};

const errorLoginResponse = {
  message: "Invalid user or password",
};

const errorRegisterResponseName = {
  message: "Name already registered",
};

const errorRegisterResponseEmail = {
  message: "Email already registered",
};

const errorListAllResponse = {
  message: "Access not granted",
};

const errorListSellersResponse = {
  message: "Token not found",
};

const errorListSellersInvalidTokenResponse = {
  message: "jwt malformed",
};

module.exports = {
  findOneMock,
  findOneSellerMock,
  findAllMock,
  findAllSellersMock,
  createMock,
  successLoginResponse,
  successRegisterResponse,
  errorLoginResponse,
  errorRegisterResponseName,
  errorRegisterResponseEmail,
  errorListAllResponse,
  errorListSellersResponse,
  errorListSellersInvalidTokenResponse,
};
