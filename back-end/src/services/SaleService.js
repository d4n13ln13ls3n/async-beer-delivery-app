const { User, Product, Sale, SaleProduct } = require('../database/models');
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

  static formatProductsList(results) {
    const { id, totalPrice, saleDate, status, seller, products } = results;

    const productsList = {
      id,
      totalPrice,
      status,
      sellerName: seller.name,
      products: products.map((product) => (
        { name: product.name, quantity: product.SaleProduct.quantity })),
    };

    return { ...productsList, saleDate: saleDate.toLocaleDateString('pt-BR') };
  }

  static async listProductsByOrder(userId, saleId) {
    const results = await Sale.findOne({
      where: { userId, id: saleId },
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

    return SaleService.formatProductsList(results);
  }
}

module.exports = SaleService;
