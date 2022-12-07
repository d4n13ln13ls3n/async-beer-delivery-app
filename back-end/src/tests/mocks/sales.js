const createMock = {
  id: 1,
  userId: 3,
  sellerId: 2,
  totalPrice: 137.64,
  deliveryAddress: "Av. Paulista",
  deliveryNumber: 800,
  status: "Pendente",
};

const findAllMock = [
  {
    id: 1,
    userId: 3,
    sellerId: 2,
    totalPrice: "137.64",
    deliveryAddress: "Av. Paulista",
    deliveryNumber: "800",
    saleDate: new Date("2022-12-07T19:13:53.000Z"),
    status: "Pendente",
  },
];

const findOneMock = {
  id: 1,
  totalPrice: "137.64",
  saleDate: new Date("2022-12-07T19:13:53.000Z"),
  status: "Pendente",
  seller: { name: "Fulana Pereira" },
  products: [
    { name: "Antarctica Pilsen 300ml", SaleProduct: { quantity: 12 } },
    { name: "Skol Beats Senses 313ml", SaleProduct: { quantity: 24 } },
  ],
};

const findOnePreparandoMock = {
  id: 1,
  totalPrice: "137.64",
  saleDate: new Date("2022-12-07T19:13:53.000Z"),
  status: "Preparando",
  seller: { name: "Fulana Pereira" },
  products: [
    { name: "Antarctica Pilsen 300ml", SaleProduct: { quantity: 12 } },
    { name: "Skol Beats Senses 313ml", SaleProduct: { quantity: 24 } },
  ],
};

const findOneEmTransitoMock = {
  id: 1,
  totalPrice: "137.64",
  saleDate: new Date("2022-12-07T19:13:53.000Z"),
  status: "Em Trânsito",
  seller: { name: "Fulana Pereira" },
  products: [
    { name: "Antarctica Pilsen 300ml", SaleProduct: { quantity: 12 } },
    { name: "Skol Beats Senses 313ml", SaleProduct: { quantity: 24 } },
  ],
};

const findOneEntregueMock = {
  id: 1,
  totalPrice: "137.64",
  saleDate: new Date("2022-12-07T19:13:53.000Z"),
  status: "Entregue",
  seller: { name: "Fulana Pereira" },
  products: [
    { name: "Antarctica Pilsen 300ml", SaleProduct: { quantity: 12 } },
    { name: "Skol Beats Senses 313ml", SaleProduct: { quantity: 24 } },
  ],
};

const listAllCustomerResponse = [
  {
    id: 1,
    totalPrice: "137.64",
    saleDate: "07/12/2022",
    status: "Pendente",
  },
];

const listAllSellerResponse = [
  {
    id: 1,
    totalPrice: "137.64",
    saleDate: "07/12/2022",
    status: "Pendente",
    deliveryAddress: "Av. Paulista",
    deliveryNumber: "800",
  },
];

const listProductsCustomerResponse = {
  id: 1,
  totalPrice: "137.64",
  saleDate: "07/12/2022",
  status: "Pendente",
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
  sellerName: "Fulana Pereira",
};

const listProductsSellerResponse = {
  id: 1,
  totalPrice: "137.64",
  saleDate: "07/12/2022",
  status: "Pendente",
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
};

const updateStatusPreparandoResponse = {
  newStatus: "Preparando",
};

const updateStatusEmTransitoResponse = {
  newStatus: "Em Trânsito",
};

const updateStatusEntregueResponse = {
  newStatus: "Entregue",
};

module.exports = {
  createMock,
  findAllMock,
  findOneMock,
  findOnePreparandoMock,
  findOneEmTransitoMock,
  findOneEntregueMock,
  listAllCustomerResponse,
  listAllSellerResponse,
  listProductsCustomerResponse,
  listProductsSellerResponse,
  updateStatusPreparandoResponse,
  updateStatusEmTransitoResponse,
  updateStatusEntregueResponse,
};
