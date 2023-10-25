const ProductManager = require('../ProductManager.js');
const productmanager = new ProductManager('Products.js');
const { Router } = require('express');

const router = Router();

router.get('/products', (req, res) => {
    const { query } = req;
    const { limit } = query;
    async function get() {
        const products = await productmanager.getProducts();
        if (!limit) {
            res.status(200).json(products);
        } else {
            const response = products.slice(0, parseInt(limit));
            res.status(200).json(response);
        }
    }
    get();

});

router.post('/products', (req, res) => {
    const { body } = req;
    async function add() {
        await productmanager.addProduct(body.title, body.description, body.price, body.thumbnail, body.code, body.stock, body.category);
        const products = await productmanager.getProducts();
        res.status(201).json(products);
    }
    add();
})

router.get('/products/:productId', (req, res) => {
    const { productId } = req.params;
    async function run() {
        const product = await productmanager.getProductById(parseInt(productId));
        if (!product) {
            res.status(404).json({ error: 'Product not found' })
        } else {
            res.status(200).json(product);
        }
    }
    run();
});
router.put('/products/:productId', (req, res) => {
    const { productId } = req.params;
    const { body } = req;
    async function update() {
        const product = await productmanager.getProductById(parseInt(productId));
        if (!product) {
            res.status(404).json({ error: 'Product not found' })
        } else {
            await productmanager.updateProduct(parseInt(productId), 'title', body.title);
            await productmanager.updateProduct(parseInt(productId), 'description', body.description);
            await productmanager.updateProduct(parseInt(productId), 'price', body.price);
            await productmanager.updateProduct(parseInt(productId), 'thumbnails', body.thumbnail);
            await productmanager.updateProduct(parseInt(productId), 'code', body.code);
            await productmanager.updateProduct(parseInt(productId), 'stock', body.stock);
            await productmanager.updateProduct(parseInt(productId), 'status', body.status);
            await productmanager.updateProduct(parseInt(productId), 'category', body.category);
            res.status(200).json(product);
        }
    }
    update();
});
router.delete('/products/:productId', (req, res) => {
    const { productId } = req.params;
    async function run() {
        const product = await productmanager.getProductById(parseInt(productId));
        if (!product) {
            res.status(404).json({ error: 'Product not found' })
        } else {
            await productmanager.deleteProduct(parseInt(productId));
            res.status(200).json({message:'the following product was deleted',productId});
        }
    }
    run();
});

module.exports = router;