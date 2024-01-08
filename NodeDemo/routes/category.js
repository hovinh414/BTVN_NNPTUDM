var express = require("express");
const { model } = require("mongoose");
const { use } = require(".");
var router = express.Router();
var responseData = require("../helper/responseData");
var modelCategory = require("../models/category");
const { validationResult } = require("express-validator");

router.get("/", async function (req, res, next) {
  console.log(req.query);
  try {
    var categoryAll = await modelCategory.getCategories(req.query);
    console.log(categoryAll);
    responseData.responseReturn(res, 200, true, categoryAll);
  } catch (error) {
    console.error(error);
    responseData.responseReturn(res, 500, false, "Lỗi server");
  }
});
router.post("/add", async function (req, res, next) {
  const newCategory = await modelCategory.createCategory({
    name: req.body.name,
    order: req.body.order,
    isDelete: req.body.isDelete,
  });
  responseData.responseReturn(res, 200, true, newCategory);
});
router.put("/edit/:id", async function (req, res, next) {
  try {
    const updatedCategory = await modelCategory.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedCategory) {
      responseData.responseReturn(res, 404, false, "khong tim thay category");
      return;
    }
    responseData.responseReturn(res, 200, true, updatedCategory);
  } catch (error) {
    console.error(error);
    responseData.responseReturn(res, 500, false, "loi server");
  }
});
router.post("/delete/:id", async function (req, res, next) {
  try {
    const idToUpdate = req.params.id;
    const updatedCategory = await modelCategory.findByIdAndUpdate(
      idToUpdate,
      { isDelete: true },
      { new: true }
    );

    if (!updatedCategory) {
      return responseData.responseReturn(
        res,
        404,
        false,
        "Không tìm thấy category"
      );
    }

    responseData.responseReturn(res, 200, true, "Cập nhật thành công");
  } catch (error) {
    console.error(error);
    responseData.responseReturn(res, 500, false, "Lỗi server");
  }
});

module.exports = router;
