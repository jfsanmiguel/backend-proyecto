const fs = require('fs'); 

class ProductManager{

    constructor(path){
        this.path=path;
    }


async addProduct(title,description,price,thumbnail,code,stock) {
    const products= await getJsonFromFile(this.path);
    let id= products.find(id => id.code === code);
    let counter=products.length;
    if(id){
        console.log(" the product with the id " +code + " already exists")
        return
    }else if(!title || !description || !price || !thumbnail || !stock){
        console.log("Please fill all entries");
    }else{
        const newProduct ={
            title,
            description,
            price,
            thumbnail,
            code: code+counter,
            stock,

        }
        products.push(newProduct);
        await saveJsonInFile(this.path, products);
        counter++;
        console.log('product added successfully');
    }
   
}
getProducts() {
 return getJsonFromFile(this.path);
}
async getProductById(code) {
    const products= await getJsonFromFile(this.path);
    let id= products.find(id => id.code === code);
    if(!id){
        console.log("Not found");
        return
    }else{
    console.log(id);
    return id
    }

}
async updateProduct(code, change, value){
    const products= await getJsonFromFile(this.path);
    let product= products.find(id => id.code === code);
    if(product){
        if(change==='title'){
            product.title=value;
            await saveJsonInFile(this.path, products);   
            }else if(change==='description'){
                product.description=value;
                await saveJsonInFile(this.path, products); 
            }else if(change==='price'){
                product.price=value;
                await saveJsonInFile(this.path, products); 
            }else if(change==='thumbnail'){
                product.thumbnail=value;
                await saveJsonInFile(this.path, products); 
            }else if(change==='stock'){
                product.stock=value;
                await saveJsonInFile(this.path, products); 
            }else{
                console.log('please enter a valid property to change such as title,description,price,thumbnail,stock ')
            }
        
    }else{
        console.log('Product does not exist');
            }
        }
    
 async deleteProduct(code){
    const products= await getJsonFromFile(this.path);
    let product= products.find(id => id.code === code);
    if(!product || !products){
        console.log('Product does not exist');
    }else{
const index= products.indexOf(product);
const deleted=products.splice(index,1);
await saveJsonInFile(this.path, products); 
console.log("the product was successfully deleted");
    }
}

}
const getJsonFromFile = async(path) =>{
    if(!fs.existsSync(path)){
        return [];

    }
    const content= await fs.promises.readFile(path, 'utf-8');
    return JSON.parse(content);
};

const saveJsonInFile= (path,data) =>{
    const content = JSON.stringify(data, null, '\t');//tabulación
    return fs.promises.writeFile(path, content, 'utf-8'); // return vale como async await (devuelve promesa)
}



 async function test() {
    const Pmanager = new ProductManager('Products.js');
    await Pmanager.addProduct('producto prueba', 'Este es un producto prueba', 200, 'Sin imagen','abc123', 25);
    await Pmanager.getProducts();
    await Pmanager.getProductById('abc1230');
    await Pmanager.updateProduct('abc1230','title','producto actualizado');
    await Pmanager.getProducts();
    await Pmanager.addProduct('producto prueba', 'Este es un producto prueba', 200, 'Sin imagen','abc123', 25);
    await Pmanager.deleteProduct('abc1231');
    if(!Pmanager.getProducts()){
        console.log('there are no products')
    }else{
        await Pmanager.getProducts();
    }
    
}

test();
