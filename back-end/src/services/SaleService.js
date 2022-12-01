const { Sale, SaleProduct } = require('../database/models');
const UserService = require('./UserService');
const ProductService = require('./ProductService');

class SaleService {
  static async register({ userId, sellerName, totPrice, delAddress, delNumber, products }) {
        const { id: sellerId } = await UserService.getSellerByName(sellerName);

        const newSale = await Sale.create({
          userId,
          sellerId,
          totalPrice: totPrice,
          deliveryAddress: delAddress,
          deliveryNumber: delNumber,
          status: 'Pendente',
        });

        const saleProducts = await Promise.all(
          products.map(async ({ name, quantity }) => ({
            saleId: newSale.dataValues.id,
            productId: await ProductService.getProductIdByName(name),
            quantity,
          })),
        );

        await SaleProduct.bulkCreate(saleProducts);
  }

  static async listAllByUserId(userId) {
    const results = await Sale.findAll({ where: { userId }, raw: true });

    const ordersList = results.map(({ id, saleDate, totalPrice, status }) => ({
        id,
        saleDate: saleDate.toLocaleDateString('pt-BR'),
        totalPrice,
        status,
      }));
      
    return ordersList;
  }
}

module.exports = SaleService;