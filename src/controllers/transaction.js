const pagination = require("../helpers/pagination");
const response = require("../helpers/response");
const model = require("../models");

const createTransaction = async (req, res) => {
  try {
    const body = req.body;
    const payload = {
      id_user: body.id_user,
      address: body.address,
      phone: body.phone,
      total: body.total,
    };
    const { productItem } = body;
    const transaction = await model.transaction.create(payload);
    console.log(transaction.id);
    await Promise.all(
      productItem.map((product) => {
        return model.transaction_item.create({
          id_product: product.id_product,
          id_transaction: transaction.id,
          quantity: product.quantity,
          total: product.total,
        });
      })
    );
    return response(res, {
      data: transaction,
      status: 200,
      message: "success create transaction",
    });
  } catch (error) {
    return response(res, {
      status: 500,
      message: "terjadi error",
      error,
    });
  }
};


const getHistoryById = async (req, res) => {
    try {
        const {id} = req.params
        const result = await model.transaction.findOne({
            where:{id},
            include: [
                {
                  model: model.transaction_item,
                  as: "transaction_item",
                  include: [
                    {
                      model: model.products,
                      as: "product",
                      // attributes: ['id', 'name', 'price', 'image']
                    },
                  ],
                },
              ],
        })
        return response(res, {
            data: result,
            status: 200,
            message: "success create transaction",
          });
    } catch (error) {
        return response(res, {
            status: 500,
            message: "terjadi error",
            error,
          });
    }
}

const getAllHistory = async (req, res) => {
  try {
    const { per_page, page, status } = req.query;
    console.log(req.query);

    let { sortBy, sort } = req.query;
    const where = {};
    const limit = parseInt(per_page ?? 10);
    const offset = parseInt((page ?? 1) * limit) - limit;
    if (status) {
      where.status = status;
    }
    const result = await model.transaction.findAndCountAll({
      where,
      include: [
        {
          model: model.transaction_item,
          as: "transaction_item",
          include: [
            {
              model: model.products,
              as: "product",
              // attributes: ['id', 'name', 'price', 'image']
            },
          ],
        },
      ],
      limit: limit,
      offset: offset,
      order: [[sortBy ?? "createdAt", sort ?? "DESC"]]
    });
    return pagination(res, req, {
        data: result.rows,
        total: result.count,
        status: 200,
        message: "get all history succes",
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
};

module.exports = {
  createTransaction,
  getHistoryById,
  getAllHistory,
};
