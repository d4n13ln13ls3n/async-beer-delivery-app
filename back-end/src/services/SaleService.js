const { User, Product, Sale, SaleProduct, sequelize } = require('../database/models');
const UserService = require('./UserService');
const ProductService = require('./ProductService');
const HttpErrorHandler = require('../middlewares/errorHandler/HttpErrorHandler');

class SaleService {
  static formatSalesListCustomer(sales) {
    return sales.map(({ id, totalPrice, saleDate, status }) => ({
      id,
      totalPrice,
      saleDate: saleDate.toLocaleDateString('pt-BR'),
      status,
    }));
  }

  static formatProductsList(results) {
    const { id, totalPrice, saleDate, status, seller, products } = results;

    return {
      id,
      totalPrice,
      saleDate: saleDate.toLocaleDateString('pt-BR'),
      status,
      sellerName: seller.name,
      products: products.map((product) => ({
        name: product.name,
        quantity: product.SaleProduct.quantity,
      })),
    };
  }

  static async register({ userId, sellerName, totPrice, delAddress, delNumber, products }) {
    const newSale = await sequelize.transaction(async (t) => {
      const { id: sellerId } = await UserService.getSellerByName(sellerName);

      const { id } = await Sale.create({
          userId,
          sellerId,
          totalPrice: totPrice,
          deliveryAddress: delAddress,
          deliveryNumber: delNumber,
          status: 'Pendente' },
        { transaction: t });

      const saleProducts = await Promise.all(products.map(async ({ name, quantity }) => ({
          saleId: id, productId: await ProductService.getProductIdByName(name), quantity })));

      await SaleProduct.bulkCreate(saleProducts, { transaction: t });

      return id;
    });
    return newSale;
  }

  static async listAllByUserId(userId) {
    const sales = await Sale.findAll({ where: { userId } });

    const ordersList = SaleService.formatSalesListCustomer(sales);

    return ordersList;
  }

  static async listProductsBySale(userId, saleId) {
    const sale = await Sale.findOne({
      where: { id: saleId, userId },
      attributes: ['id', 'totalPrice', 'saleDate', 'status'],
      include: [
        { model: User, as: 'seller', attributes: ['name'] },
        {
          model: Product,
          as: 'products',
          attributes: ['name'],
          through: { attributes: ['quantity'] },
        },
      ],
    });

    if (!sale) throw new HttpErrorHandler(404, 'Sale not found');

    return SaleService.formatProductsList(sale);
  }
}

module.exports = SaleService;
