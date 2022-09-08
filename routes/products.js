const express = require('express');

//import router
const router = express.Router();

//import services por products
const ProductsService = require('../services/products.service');
const service = new ProductsService();

//import middlewares
const validatorHandler = require('../middlewares/validator.handler');
const {createProductSchema, updateProductsSchema, getProductSchema}  =  require('../schemas/product.schema')

// Get request general products
router.get('/', async (req, res, next) => {
    try {
        const products = await service.find();

        res.json(products);
    } catch (error) {
        next(error)
    }
});

router.get('/:id',
    validatorHandler(getProductSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const result = await service.findOne(id);

            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }
);

// Post request
router.post('/',
    validatorHandler(createProductSchema, 'body'),
    async (req, res, next) => {
        try {
            const body = req.body;
            const newProduct = await service.create(body);

            res.json(newProduct);
        } catch (err) {
            next(err)
        }
    }
);

//Path and put request
router.put('/:id',
    validatorHandler(updateProductsSchema, 'body'),
    async (req, res, next ) => {
        try {
            const body = req.body;
            const { id } = req.params

            const product = await service.update(id, body)

            res.json(product)

        } catch (error) {
            next(error)
        }
    }
);

//Delete request
router.delete('/:id', async (req, res, next) => {
    try {
        const {id} = req.params;
        const {message} = await service.delete(id);

        res.json({
            message,
            id
        })
    } catch (error) {
        next(error)
    }
});

module.exports = router
