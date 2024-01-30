export default class Product{
    constructor(id,name,img, price,quantity,description,categoryId){
        this.id = id;
        this.img = img;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.description = description;
        this.categoryId = categoryId;
    }
}