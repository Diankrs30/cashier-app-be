
const express = require('express')
const transactionRouter = express.Router()
const transactionController = require('./../controllers/transaction')

transactionRouter

        .get('/',  transactionController.getAllHistory)
        .get('/history-user/:id',  transactionController.getHistoryById)
        .post('/' ,transactionController.createTransaction)
        // .patch('/:id', upload ,transactionController.updatetransaction)
        // .delete('/:id',transactionController.deletetransaction)



module.exports = transactionRouter