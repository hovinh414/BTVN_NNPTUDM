var SchemaCategory = require("../schema/category");
var SchemaProduct = require("../schema/product");

module.exports = {
  // Read categories with associated products
  getCategories: function () {
    return SchemaCategory.find({ isDelete: false })
      .sort({ order: 1 })
      .populate({
        path: "products",
        match: { isDelete: false },
        options: { sort: { order: 1 } },
      })
      .exec();
  },

  // Create category
  createCategory: function (category) {
    return new SchemaCategory(category).save();
  },
  findByIdAndUpdate: async function (categoryId, updateData) {
    try {
      const updatedCategory = await SchemaCategory.findByIdAndUpdate(
        categoryId,
        updateData,
        { new: true }
      );

      return updatedCategory;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  // Update category
  updateCategory: function (categoryId, updateData) {
    return SchemaCategory.findByIdAndUpdate(categoryId, updateData, {
      new: true,
    });
  },

  // Delete category
  deleteCategory: async function (categoryId) {
    try {
      // Soft delete the category
      const updatedCategory = await SchemaCategory.findByIdAndUpdate(
        categoryId,
        { isdelete: true },
        { new: true }
      );

      // Soft delete all products in the category
      await SchemaProduct.updateMany(
        { category: categoryId },
        { isdelete: true }
      );

      return updatedCategory;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};
