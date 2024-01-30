import { object, string, number, date, InferType } from 'yup';
 class Product{
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
let productSchema = object({
    id : string(),
    img : string().required(),
    name : string().required(),
    price : number().required(),
    quantity : number().max(100).required(),
    description : string().required(),
    categoryId : number().transform((value) =>{
        return Number(value);
    }).required().typeError('Category is required')
  });
export {productSchema, Product};
  // parse and assert validity
//   const user = await productSchema.validate(await fetchUser());
  
//   type Product = InferType<typeof productSchema>;