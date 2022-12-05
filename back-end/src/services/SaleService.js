const { User, Product, Sale, SaleProduct, sequelize } = require('../database/models');
const UserService = require('./UserService');
const ProductService = require('./ProductService');
const HttpErrorHandler = require('../middlewares/errorHandler/HttpErrorHandler');

class SaleService {
  static formatSalesList(sales, role) {
    if (role === 'customer') {
      return sales.map(({ id, totalPrice, saleDate, status }) => ({
        id,
        totalPrice,
        saleDate: saleDate.toLocaleDateString('pt-BR'),
        status,
      }));
    }

    if (role === 'seller') {
      return sales.map(({ id, totalPrice, saleDate, status, deliveryAddress, deliveryNumber }) => ({
        id,
        totalPrice,
        saleDate: saleDate.toLocaleDateString('pt-BR'),
        status,
        deliveryAddress,
        deliveryNumber,
      }));
    }
  }

  static formatProductsList(results, role) {
    const { id, totalPrice, saleDate, status, products } = results;

    const saleInfo = {
      id,
      totalPrice,
      saleDate: saleDate.toLocaleDateString('pt-BR'),
      status,
      products: products.map((product) => ({
        name: product.name,
        quantity: product.SaleProduct.quantity })),
    };

    if (role === 'customer') {
      const { seller } = results;
      return { ...saleInfo, sellerName: seller.name };
    }

    if (role === 'seller') {
      return saleInfo;
    }
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

  static async listAllByUserId(userId, role) {
    const sales = await Sale.findAll({ where: { userId } });

    const ordersList = SaleService.formatSalesList(sales, role);

    return ordersList;
  }

  static async listAllBySellerId(sellerId, role) {
    const sales = await Sale.findAll({ where: { sellerId } });

    const ordersList = SaleService.formatSalesList(sales, role);

    return ordersList;
  }

  static async listProductsByCustomer(userId, saleId) {
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

    return SaleService.formatProductsList(sale, 'customer');
  }

  static async listProductsBySeller(sellerId, saleId) {
    const sale = await Sale.findOne({
      where: { id: saleId, sellerId },
      attributes: ['id', 'totalPrice', 'saleDate', 'status'],
      include: [
        {
          model: Product,
          as: 'products',
          attributes: ['name'],
          through: { attributes: ['quantity'] },
        },
      ],
    });

    if (!sale) throw new HttpErrorHandler(404, 'Sale not found');

    return SaleService.formatProductsList(sale, 'seller');
  }
}

module.exports = SaleService;
