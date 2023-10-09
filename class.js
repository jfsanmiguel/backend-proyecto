class ProductManager{

    constructor(){
        this.products= [];
    }


addProduct(title,description,price,thumbnail,stock) {
    let id= this.products.find(id => id.code === code);
    if(id){
        console.log(" the product with the id " +code + " already exists")
        return
    }else if(!title || !description || !price || !thumbnail || !stock){
        console.log("Please fill all entries");
    }else{
        this.products.push({
            title,
            description,
            price,
            thumbnail,
            code: this.products.length + 1,
            stock,
        })
    console.log("product added");
    }
   
}
getProducts() {
 console.log(this.products);
}
getProductById(code) {
    let id= this.products.find(id => id.code === code);
    if(!id){
        console.log("Not found");
        return
    }else{
    console.log(id);
    return
    }

}
}

const Pmanager = new ProductManager();
Pmanager.addProduct("producto prueba","Este es un producto prueba",200,"sin imagen","abc123",25);
Pmanager.getProducts();
Pmanager.getProductById(1);

