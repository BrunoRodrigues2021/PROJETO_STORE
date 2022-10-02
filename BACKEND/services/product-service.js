const Product = require("../sequelize/models/product-model");

class ProductService {
    async getProducts() {
        const products = await Product.findAll();

        return products;
    }

    async insertProduct() {
        const newProduct = await Product.create({
            name: 'Leite',
            userId: 5
        });
    }
}

module.exports =  new ProductService();
