const express = require("express")
const productRouter = require("./product")
const transactionRouter = require("./transaction")
const mainRouter = express.Router()

mainRouter.use('/products', productRouter)
mainRouter.use('/transaction', transactionRouter)


module.exports = mainRouter