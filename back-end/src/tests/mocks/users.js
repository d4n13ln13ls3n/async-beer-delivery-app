const adminToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkRlbGl2ZXJ5IEFwcCBBZG1pbiIsImVtYWlsIjoiYWRtQGRlbGl2ZXJ5YXBwLmNvbSIsInJvbGUiOiJhZG1pbmlzdHJhdG9yIiwiaWF0IjoxNjcwNDM2ODQzfQ.L-HOjyC3Fpshu7tOfWc2iwgMsMbcZW_0AHHXEUiy2bs"

const customerToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywibmFtZSI6IkNsaWVudGUgWsOpIEJpcml0YSIsImVtYWlsIjoiemViaXJpdGFAZW1haWwuY29tIiwicm9sZSI6ImN1c3RvbWVyIiwiaWF0IjoxNjcwNDM2Nzc1fQ.a-ZG3t60qIkrwehzh4O6ygo1SGfkIwE71jvVprN00xI"

const sellerToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6IkZ1bGFuYSBQZXJlaXJhIiwiZW1haWwiOiJmdWxhbmFAZGVsaXZlcnlhcHAuY29tIiwicm9sZSI6InNlbGxlciIsImlhdCI6MTY3MDQzNjkzMX0.i4Qij6uK1nwaEQ_oJMlhSCGXNB5PW63SlodYDCVOPf4"

const newCustomerToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwibmFtZSI6IlRheW7DoSBTaWx2YSBNYWPDqmRvIiwiZW1haWwiOiJ0YXluYV9zbTE5OTZAaG90bWFpbC5jb20iLCJyb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2NzA0MzcyMjV9.IW3ABlCQcLqWeoFeo6dcoNotB6RnDu4KLBzHUE90vOk"

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
  token: adminToken,
};

const successRegisterResponse = {
  name: "Tayná Silva Macêdo",
  email: "tayna_sm1996@hotmail.com",
  role: "customer",
  token: newCustomerToken,
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
  adminToken,
  customerToken,
  sellerToken,
  newCustomerToken,
};
