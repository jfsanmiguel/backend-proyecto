const fs = require('fs');

class ProductManager {

    constructor(path) {
        this.path = path;
    }


    async addProduct(title, description, price, thumbnail, code, stock, category) {
        const products = await getJsonFromFile(this.path);
        let pid = products.find(ide => ide.code === code);
        let counter = products.length;
        let init=1;
        if (pid) {
            console.log(" the product with the code " + code + " already exists")
            return
        } else if (!title || !description || !price || !thumbnail || !stock || !category) {
            console.log("Please fill all entries");
        } else {
            const newProduct = {
                title,
                description,
                price,
                thumbnail,
                code,
                status: true,
                stock,
                category,
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
            }else if (change === 'status') {
                product.stock = value;
                await saveJsonInFile(this.path, products);
            }
            else if (change === 'thumbnail') {
                product.thumbnail = value;
                await saveJsonInFile(this.path, products);
            } else if (change === 'stock') {
                product.stock = value;
                await saveJsonInFile(this.path, products);
            } else if (change === 'category') {
                product.stock = value;
                await saveJsonInFile(this.path, products);
            }
            else {
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



//   async function test() {
//    const Pmanager = new ProductManager('Products.js');
//    await Pmanager.addProduct('test product', 'This is a test product', 200, ['No image'], 'abc123', 25,'test');
//    await Pmanager.getProducts();
//    await Pmanager.updateProduct('abc1230', 'title', 'producto actualizado');
//    await Pmanager.getProducts();
//    await Pmanager.getProductById(1);
//    await Pmanager.addProduct('test product ', 'This is a test product', 200, ['No image'], 'abc123', 25,'test');
//    await Pmanager.deleteProduct(1);
//    await Pmanager.addProduct('Arnotta', 'Fungus 1', 200, ['No image'], 'o1', 24,'fungi');
//    await Pmanager.addProduct('Mushroom', 'Fungus 2', 150, ['No image'], 'c2', 23,'fungi');
//    await Pmanager.addProduct('Shiitake', 'Fungus 3', 350, ['No image'], 's3', 22,'fungi');
//    await Pmanager.addProduct('Porcini', 'Fungus 4', 300, ['No image'], 'p4', 21,'fungi');
//    await Pmanager.addProduct('Enoki', 'Fungus 5', 320, ['No image'], 'e5', 20,'fungi');
//    await Pmanager.addProduct('Trufa', 'Fungus 6', 500, ['No image'], 't6', 19,'fungi');
//    await Pmanager.addProduct('Huitlacoche', 'Fungus 7', 400, ['No image'], 'h7', 18,'fungi');
//    await Pmanager.addProduct('Matsutake', 'Fungus 8', 450, ['No image'], 'm8', 17,'fungi');
//     await Pmanager.addProduct('Portobello', 'Fungus 9', 280, ['No image'], 'p9', 16,'fungi');
//    await Pmanager.addProduct('Gírgola', 'Fungus 10', 200, ['No image'], 'g10', 16,'fungi');
    
//      if (!Pmanager.getProducts()) {
//       console.log('there are no products')
//    } else {
//         await Pmanager.getProducts();
//     }

//  }

// test();

module.exports= ProductManager
