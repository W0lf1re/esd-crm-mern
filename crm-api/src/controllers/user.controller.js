const User = require('../models/User');
const bcrypt = require('bcrypt');
const Customer = require('../models/Customer');

const UserController = {
    async create(req, res) {
        const user = new User(req.body);

        // user.password = await bcrypt.hash(user.password, 10);

        try {
            await user.save();
            res.status(201).send(user);
        } catch (error) {
            res.status(400).send({
                error: error.message
            });
        }
    },
    async update(req, res) {
        try {
            const user = await User.findByIdAndUpdate(req.params, req.body) 
            res.status(201).send(user);
        } catch (error) {
            res.status(400).send({
                error: error.message
            });
        }
    },
    async delete(req, res) {
        const { id } = req.params
        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        res.send(user);
    },
    async getAll(req, res) {
        const users = await User.find();
        res.json(users);
    },
    async getOne(req, res) {
        const { id } = req.params
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        res.send(user);
    },
    getAllCustomers: async (req, res) => {
        // const user = await User.findById(id).populate('customers')

        // if(!user) {
        //     res.status(404).send('User not found')
        // }

        // res.send(user.customers)
        res.send('Get all customers')
    }
}

module.exports = UserController;