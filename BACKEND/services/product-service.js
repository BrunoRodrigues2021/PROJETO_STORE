const Product = require("../sequelize/models/product-model");
const {logger} = require("../logger");
const path = require("path");
const _fileName = path.basename(__filename);
const SharedConstants = require("../utils/constants/shared-constants");
const ProductConstants = require("../utils/constants/product-constants");
const ProductErrors = require("../utils/errors/product-errors");
const Op = require("sequelize").Op;

class ProductService {
    async getProducts(
        productName,
        sortBy = ProductConstants.SortBy.DEFAULT_SORT_BY,
        sortOrder = SharedConstants.SortOrder.ASC,
        page = SharedConstants.Pagination.PAGE.DEFAULT_VALUE,
        pageSize = SharedConstants.Pagination.PAGE_SIZE.DEFAULT_VALUE
    ) {
        let sort = [];
        const conditions = {}

        if (productName) {
            conditions.name = {[Op.like]: `%${productName}%`};
        }
        if (sortBy) {
            sort.push([sortBy, sortOrder]);
        }

        try {
            return await Product.findAndCountAll({
                where: conditions,
                order: sort,
                limit: +pageSize,
                offset: (+page - 1) * +pageSize
            });
        } catch (error) {
            logger.error(`${_fileName} : Error fetching products : Error: ${JSON.stringify(error)}`);
        }
    }

    async getProductByParam(param, value) {
        let product;

        try {
            product = await Product.findOne({
                where: {[param]: value}
            })
        } catch (error) {
            logger.error(`${_fileName} : Error getting product by ${param} : Product${param}: ${value} : Error: ${JSON.stringify(error)}`);
            throw ProductErrors.DATABASE_ERROR;
        }

        if (!product) {
            throw ProductErrors.PRODUCT_NOT_FOUND;
        }
    }

    async insertProduct() {
        const newProduct = await Product.create({
            name: 'Leite',
            userId: 5
        });
    }

    async updateProduct(productId, fields) {
        await this.getProductByParam('id', productId);

        const transaction = await Product.sequelize.transaction();

        try {
            const updateProductPayload = {};

            if (fields.name) {
                updateProductPayload.name = fields.name
            }
            if (fields.value) {
                updateProductPayload.value = fields.value
            }

            if (Object.keys(updateProductPayload).length > 0) {
                await Product.update(updateProductPayload, {
                    where: {
                        id: productId
                    },
                    transaction
                });
            }

            await transaction.commit();
        } catch (error) {
            await transaction.rollback();
            logger.error(`${_fileName} : Error updating product : ProductId: ${productId} : Error: ${JSON.stringify(error)}`);
        }
    }
}

module.exports = new ProductService();
