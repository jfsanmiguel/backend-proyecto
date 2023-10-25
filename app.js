
const express = require('express');
const productRouter=require('./src/routers/products.router.js')
const cartRouter=require('./src/routers/carts.router.js')
const app = express();
const PORT=8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.status(200).json({message: "Welcome to Fungstore"})
})
app.use('/api',productRouter,cartRouter);

app.listen(PORT, () => {
    console.log(`Server running in http://localhost:${PORT}`);
});
