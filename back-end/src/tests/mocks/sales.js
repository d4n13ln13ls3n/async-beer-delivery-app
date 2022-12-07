const createMock = {
  id: 1,
  userId: 2,
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
    totalPrice: '137.64',
    deliveryAddress: 'Av. Paulista',
    deliveryNumber: '800',
    saleDate: new Date("2022-12-07T19:13:53.000Z"),
    status: 'Pendente'
  },
];

const listAllCustomerResponse = [
	{
		"id": 1,
		"totalPrice": "137.64",
		"saleDate": "07/12/2022",
		"status": "Pendente"
	}
]

module.exports = { createMock, findAllMock, listAllCustomerResponse };
