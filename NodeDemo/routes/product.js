var express = require("express");
const { model } = require("mongoose");
const { use } = require(".");
var router = express.Router();
var responseData = require("../helper/responseData");
var modelProduct = require("../models/product");
const { validationResult } = require("express-validator");

router.get("/", async function (req, res, next) {
  console.log(req.query);
  var productAll = await modelProduct.getProducts(req.query);
  responseData.responseReturn(res, 200, true, productAll);
});
router.post("/add", async (req, res) => {
  try {
    // Lấy thông tin sản phẩm từ body của request
    const { name, price, order, category } = req.body;

    // Kiểm tra xem các thông tin cần thiết có được cung cấp không
    if (!name || !price || !order || !category) {
      return responseData.responseReturn(
        res,
        400,
        false,
        "Thiếu thông tin sản phẩm"
      );
    }

    // Tạo mới sản phẩm
    const newProduct = await modelProduct.createProduct({
      name: name,
      price: price,
      order: order,
      category: category,
    });

    responseData.responseReturn(res, 200, true, newProduct);
  } catch (error) {
    console.error(error);
    responseData.responseReturn(res, 500, false, "Lỗi server");
  }
});
router.put("/edit/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const updateData = req.body;
    if (!updateData) {
      return responseData.responseReturn(
        res,
        400,
        false,
        "Không có dữ liệu cập nhật được gửi lên"
      );
    }
    const updatedProduct = await modelProduct.updateProduct(
      productId,
      updateData
    );
    if (!updatedProduct) {
      return responseData.responseReturn(
        res,
        404,
        false,
        "Không tìm thấy sản phẩm"
      );
    }

    responseData.responseReturn(res, 200, true, updatedProduct);
  } catch (error) {
    console.error(error);
    responseData.responseReturn(res, 500, false, "Lỗi server");
  }
});
router.post("/delete/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await modelProduct.deleteProduct(productId);
    if (!deletedProduct) {
      return responseData.responseReturn(
        res,
        404,
        false,
        "Không tìm thấy sản phẩm"
      );
    }
    responseData.responseReturn(res, 200, true, "Xóa sản phẩm thành công");
  } catch (error) {
    console.error(error);
    responseData.responseReturn(res, 500, false, "Lỗi server");
  }
});
module.exports = router;
