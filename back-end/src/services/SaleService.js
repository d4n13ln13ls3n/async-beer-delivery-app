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
}

module.exports = SaleService;