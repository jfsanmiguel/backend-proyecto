
const express = require('express');
const ProductManager=require('./ProductManager.js');
const productmanager=new ProductManager('./Products.js');

const app = express();
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.send('Product Manager');
})
app.get('/products', (req, res) => {
    const { query } = req;
    const { limit } = query;
    async function get(){
        const products= await productmanager.getProducts();
        if (!limit) {
            res.json(products);
        } else {
            const response = products.slice(0, parseInt(limit));
            res.json(response);
        }
    }
        get();
      
});

app.get('/products/:productId', (req, res) => {
    const { productId } = req.params;
    async function run() {
    const product = await productmanager.getProductById(parseInt(productId));
    if (!product) {
        res.json({ error: 'Product not found' })
    } else {
        res.json(product);
    }
    }
    run();
});

app.listen(8080, () => {
    console.log('server listening to port 8080');
});
