
const express = require('express');
const ProductManager=require('./src/ProductManager.js');
const productmanager=new ProductManager('./src/Products.js');

const app = express();
const PORT=8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.status(200).json({message: "Welcome to Fungstore"})
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

app.listen(PORT, () => {
    console.log(`Server running in http://localhost:${PORT}`);
});
