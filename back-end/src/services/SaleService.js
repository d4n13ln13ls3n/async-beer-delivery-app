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

  static async listAllByUserId(userId) {
    const sales = await Sale.findAll({ where: { userId } });
    const ordersList = SaleService.formatSalesList(sales, 'customer');
    return ordersList;
  }

  static async listAllBySellerId(sellerId) {
    const sales = await Sale.findAll({ where: { sellerId } });
    const ordersList = SaleService.formatSalesList(sales, 'seller');
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

  // static async updateStatus(prevStatus, saleId) {
  //   let status;

  //   if (prevStatus === 'Pendente') status = 'Preparando';
  //   if (prevStatus === 'Preparando') status = 'Em Trânsito';
  //   if (prevStatus === 'Em Trânsito') status = 'Entregue';

  //   const saleUpdated = await Sale.update({ status }, { where: { id: saleId } });

  //   console.log(saleUpdated);

  //   return saleUpdated.status;
  // }

  // static async updateStatus(saleId) {
  //   let status;

  //   const { status: prevStatus } = await Sale.findOne({ where: { id: saleId } });

  //   if (prevStatus === 'Pendente') status = 'Preparando';
  //   if (prevStatus === 'Preparando') status = 'Em Trânsito';
  //   if (prevStatus === 'Em Trânsito') status = 'Entregue';

  //   await Sale.update({ status }, { where: { id: saleId } });

  //   const { status: newStatus } = await Sale.findOne({ where: { id: saleId } });

  //   return newStatus;
  // }

  static async newStatusSeller(saleId) {
    let newStatus;
    const { status: prevStatus } = await Sale.findOne({ where: { id: saleId } });

    if (prevStatus === 'Pendente') newStatus = 'Preparando';
    if (prevStatus === 'Preparando') newStatus = 'Em Trânsito';

    return newStatus;    
  }

  static async newStatusCustomer(saleId) {
    let newStatus;
    const { status: prevStatus } = await Sale.findOne({ where: { id: saleId } });

    if (prevStatus === 'Em Trânsito') newStatus = 'Entregue';

    return newStatus;    
  }

  static async updateStatus(saleId, role) {
    let status;

    if (role === 'seller') {
      status = await SaleService.newStatusSeller(saleId);
    }
    if (role === 'customer') {
      status = await SaleService.newStatusCustomer(saleId);
    }

    await Sale.update({ status }, { where: { id: saleId } });

    const { status: newStatus } = await Sale.findOne({ where: { id: saleId } });

    return newStatus;
  }
}

module.exports = SaleService;