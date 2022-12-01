const express = require('express')
const InvoiceController = require('../controllers/invoice.controller')
const router = express.Router()

const endPoint = "/invoices"

router.get(`${endPoint}`, InvoiceController.getAll)
router.get(`${endPoint}/:id`, InvoiceController.getOne)
router.post(`${endPoint}`, InvoiceController.create)
router.put(`${endPoint}/:id`, InvoiceController.update)
router.delete(`${endPoint}/:id`, InvoiceController.delete)
router.get(`${endPoint}/customers/:id`, InvoiceController.getAllByCustomer)

module.exports = router