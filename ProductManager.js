const fs = require('fs');

class ProductManager {

    constructor(path) {
        this.path = path;
    }


    async addProduct(title, description, price, thumbnail, code, stock) {
        const products = await getJsonFromFile(this.path);
        let pid = products.find(ide => ide.code === code);
        let counter = products.length;
        let init=1;
        if (pid) {
            console.log(" the product with the code " + code + " already exists")
            return
        } else if (!title || !description || !price || !thumbnail || !stock) {
            console.log("Please fill all entries");
        } else {
            const newProduct = {
                title,
                description,
                price,
                thumbnail,
                code,
                stock,
                id: counter + init,

            }
            products.push(newProduct);
            await saveJsonInFile(this.path, products);
            init++;
            console.log('product added successfully');
        }

    }
    getProducts() {
        return getJsonFromFile(this.path);
    }
    async getProductById(code) {
        const products = await getJsonFromFile(this.path);
        let productId = products.find(ide => ide.id === code);
        if (!productId) {
            console.log("Not found");
            return
        } else {
            console.log(productId);
            return productId
        }

    }
    async updateProduct(id, change, value) {
        const products = await getJsonFromFile(this.path);
        let product = products.find(pro => pro.id === id);
        if (product) {
            if (change === 'title') {
                product.title = value;
                await saveJsonInFile(this.path, products);
            } else if (change === 'description') {
                product.description = value;
                await saveJsonInFile(this.path, products);
            } else if (change === 'price') {
                product.price = value;
                await saveJsonInFile(this.path, products);
            }
            else if (change === 'code') {
                product.code = value;
                await saveJsonInFile(this.path, products);
            }
            else if (change === 'thumbnail') {
                product.thumbnail = value;
                await saveJsonInFile(this.path, products);
            } else if (change === 'stock') {
                product.stock = value;
                await saveJsonInFile(this.path, products);
            } else {
                console.log('please enter a valid property to change such as title,description,price,thumbnail,stock ')
            }

        } else {
            console.log('Product does not exist');
        }
    }

    async deleteProduct(id) {
        const products = await getJsonFromFile(this.path);
        let product = products.find(pro => pro.id === id);
        if (!product || !products) {
            console.log('Product does not exist');
        } else {
            const index = products.indexOf(product);
            const deleted = products.splice(index, 1);
            await saveJsonInFile(this.path, products);
            console.log("the product was successfully deleted");
        }
    }

}
const getJsonFromFile = async (path) => {
    if (!fs.existsSync(path)) {
        return [];

    }
    const content = await fs.promises.readFile(path, 'utf-8');
    return JSON.parse(content);
};

const saveJsonInFile = (path, data) => {
    const content = JSON.stringify(data, null, '\t');//tabulación
    return fs.promises.writeFile(path, content, 'utf-8'); // return vale como async await (devuelve promesa)
}



// async function test() {
//     const Pmanager = new ProductManager('Products.js');
//     await Pmanager.addProduct('producto prueba', 'Este es un producto prueba', 200, 'Sin imagen', 'abc123', 25);
//     await Pmanager.getProducts();
//     await Pmanager.updateProduct('abc1230', 'title', 'producto actualizado');
//     await Pmanager.getProducts();
//     await Pmanager.getProductById(1);
//     await Pmanager.addProduct('producto prueba ', 'Este es un producto prueba', 200, 'Sin imagen', 'abc123', 25);
//     await Pmanager.deleteProduct(1);
//     await Pmanager.addProduct('producto prueba 1', 'Este es un producto prueba', 200, 'Sin imagen', 'a1', 24);
//     await Pmanager.addProduct('producto prueba 2', 'Este es un producto prueba', 200, 'Sin imagen', 'a2', 23);
//     await Pmanager.addProduct('producto prueba 3', 'Este es un producto prueba', 200, 'Sin imagen', 'a3', 22);
//     await Pmanager.addProduct('producto prueba 4', 'Este es un producto prueba', 200, 'Sin imagen', 'a4', 21);
//     await Pmanager.addProduct('producto prueba 5', 'Este es un producto prueba', 200, 'Sin imagen', 'a5', 20);
//     await Pmanager.addProduct('producto prueba 6', 'Este es un producto prueba', 200, 'Sin imagen', 'a6', 19);
//     await Pmanager.addProduct('producto prueba 7', 'Este es un producto prueba', 200, 'Sin imagen', 'a7', 18);
//     await Pmanager.addProduct('producto prueba 8', 'Este es un producto prueba', 200, 'Sin imagen', 'a8', 17);
//     await Pmanager.addProduct('producto prueba 9', 'Este es un producto prueba', 200, 'Sin imagen', 'a9', 16);
//     await Pmanager.addProduct('producto prueba 10', 'Este es un producto prueba', 200, 'Sin imagen', 'a10', 16);
    
//     if (!Pmanager.getProducts()) {
//         console.log('there are no products')
//     } else {
//         await Pmanager.getProducts();
//     }

// }

//test();

module.exports= ProductManager
