const Customer = require('../models/Customer');
const User = require('../models/User');

const CustomerController = {
    create: async (req, res) => {
        const data = req.body
        const customer = new Customer(data)

        // const user = await User.findById(data.user)

        // if (!user) {
        //     return res.status(400).json({ message: 'User not found' })
        // }

        // user.customers.push(customer)
        // await user.save()
        await customer.save()
        res.send(customer)
    },
    update: async (req, res) => {
        const newCustomer = req.body
        const customer = await Customer.findByIdAndUpdate(req.params.id, newCustomer)
        res.send(customer)
    },
    delete: async (req, res) => {
        const deleteCustomer = await Customer.findByIdAndDelete(req.params.id)
        res.send(deleteCustomer)
    },
    getAll: async (req, res) => {
        const customersList = await Customer.find().populate('invoices')
        res.send(customersList)
    },
    getOne: async (req, res) => {
        const customer = await Customer.findById(req.params.id).populate('invoices')
        res.send(customer)
    },
    getAllByUser(req, res) {
        const { id } = req.params

        const user = User.findById(id).populate('customers')

        if (!user) {
            res.status(404).send('User not found')
        }

        res.send(user.customers)
    }
}

module.exports = CustomerController