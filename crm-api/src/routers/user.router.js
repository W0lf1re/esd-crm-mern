const express = require('express')
const UserController = require('../controllers/user.controller')
const router = express.Router()

const endPoint = "/users"

router.get(`${endPoint}`, UserController.getAll)
router.get(`${endPoint}/:id`, UserController.getOne)
router.post(`${endPoint}`, UserController.create)
router.put(`${endPoint}/:id`, UserController.update)
router.delete(`${endPoint}/:id`, UserController.delete)
router.get(`${endPoint}/customers`, UserController.getAllCustomers)

module.exports = router