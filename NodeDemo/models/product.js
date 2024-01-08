var SchemaProduct = require('../schema/product');

module.exports = {
    // Read products
    getProducts: function () {
        return SchemaProduct.find({ isdelete: false }).sort({ order: 1 }).exec();
    },

    // Create product
    createProduct: function (product) {
        return new SchemaProduct(product).save();
    },

    // Update product
    updateProduct: function (productId, updateData) {
        return SchemaProduct.findByIdAndUpdate(productId, updateData, { new: true });
    },

    // Delete product
    deleteProduct: async function (productId) {
        try {
            const updatedProduct = await SchemaProduct.findByIdAndUpdate(
                productId,
                { isDelete: true },
                { new: true }
            );

            return updatedProduct;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
};
