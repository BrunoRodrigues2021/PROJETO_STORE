const Product = require("../sequelize/models/product-model");
const {logger} = require("../logger");
const SharedConstants = require("../utils/constants/shared-constants");
const ProductConstants = require("../utils/constants/product-constants");
const ProductErrors = require("../utils/errors/product-errors");
const Op = require("sequelize").Op;
const sequelize = require("sequelize");

const path = require("path");
const _fileName = path.basename(__filename);

class ProductService {
    async getProducts(
        name,
        value,
        sortBy = ProductConstants.SortBy.DEFAULT_SORT_BY,
        sortOrder = SharedConstants.SortOrder.ASC,
        page = SharedConstants.Pagination.PAGE.DEFAULT_VALUE,
        pageSize = SharedConstants.Pagination.PAGE_SIZE.DEFAULT_VALUE
    ) {
        let sort = [];
        const conditions = {}

        if (name) {
            conditions.name = {[Op.like]: `%${name}%`};
        }
        if (value) {
            conditions.value = sequelize.where(sequelize.cast(sequelize.col('value'), 'CHAR'),
                {[Op.like]: `%${value}%`});
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

    async getProductByParam(param = 'id', value) {
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

        return product;
    }

    async insertProduct() {
        await Product.create({
            name: 'Produto Teste',
            value: 1599.99,
            userId: 5
        });
    }

    async updateProduct(productId, fields) {
        await this.getProductByParam(ProductConstants.Product.ID, productId);

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

    async deleteProduct(listOfProductId) {
        const transaction = await Product.sequelize.transaction();
        try {
            await Product.destroy( {
                where: {
                    id: listOfProductId
                },
                transaction
            });
            await transaction.commit();
        } catch (error) {
            await transaction.rollback();
            logger.error(`${_fileName} : Error deleting products : ProductList: ${listOfProductId} : Error: ${JSON.stringify(error)}`);
        }
    }
}

module.exports = new ProductService();
