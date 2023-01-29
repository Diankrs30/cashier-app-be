const response = require("../helpers/response")
const model = require("../models")
const { Op } = require("sequelize");
const pagination = require("../helpers/pagination");

const getAllProducts = async (req,res) => {
        const { per_page, page, search, category } = req.query;
  console.log(req.query);

  let { sortBy, sort } = req.query;
  const where = {};
  const whereOr = [];
  const limit = parseInt(per_page ?? 10);
  const offset = parseInt((page ?? 1) * limit) - limit;

  if (search) {
    whereOr.push(
      {
        name: {
          [Op.like]: `%${search}%`,
        },
      },
    );
  }
  if (category) {
      where.category = category;
  }
  if (whereOr.length !== 0) where[Op.or] = whereOr;
  try {
    const result = await model.products.findAndCountAll({
      where,
      limit: limit,
      offset: offset,
      order: [[sortBy ?? "createdAt", sort ?? "DESC"]],
    });
    return pagination(res, req, {
      data: result.rows,
      total: result.count,
      status: 200,
      message: "get product succes",
      limit,
      offset,
      query: req.query,
    });
      } catch (error) {
        console.log(error);
        return response(res, {
          status: 500,
          message: "terjadi error",
          error,
        });
      }
}

const createProduct = async (req,res) => {
    try {
        const image = req.file;
    const body = req.body;
    if(image){
      const newBody = {
        ...body,
        image: image.path,
      };
      const result = await model.products.create(newBody);
      return response(res, {
        data: result,
        status: 200,
        message: "mantapp",
      });
    }
    const result = await model.products.create(body);
        return response(res, {
          data: result,
          status: 200,
          message: "mantapp",
        });
      } catch (error) {
        console.log(error);
        return response(res, {
          status: 500,
          message: "terjadi error",
          error,
        });
      }
}

const updateProduct = async (req,res) => {
    try {
        const {id} = req.params
    let body = req.body;
    const image = req.file;
    const cekId = await model.products.findOne({where:{id}})
    if(cekId===null){
      return response(res,{status:404,message:"id tidak ditemukan"})
    }
    if(image){
      body = {
        ...body,
        image: image.path,
      };}
      const result = await model.products.update(body,{where:{id}})
    return response(res, {
        data: result,
        status: 200,
        message: "mantapp",
      });
    } catch (error) {
        console.log(error);
        return response(res, {
          status: 500,
          message: "terjadi error",
          error,
        });
    }
}

const deleteProduct = async(req, res) => {
    try {
      const {id} = req.params
      const result = await model.products.destroy({where:{id}})
      return response(res, {
        data: result,
        status: 200,
        message: "data terhapus",
      });
    } catch (error) {
      return response(res, {
        status: 500,
        message: "terjadi error",
        error,
      });
    }
  }

module.exports = {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct
}