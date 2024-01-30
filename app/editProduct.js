import ProductServices from './services/ProductsServices'
import JsonServerConstants from './constants/JsonServerConstants'
import { Product } from './models/Product';
import { getNameCategory } from './helpers/get_cata';
import { Dialog } from './helpers/dialog';
import { productSchema } from './models/Product';
let img = undefined;

const productServices = new ProductServices(JsonServerConstants.EndPoint);

const id = window.location.toString().split('=')[1];

$(document).ready(function () {
    productServices.getProductById(id)
        .then((data) => {
            
            const { id, categoryId, name, price, quantity, description } = data;
            
            $('#id').val(id);
            $('#name').val(name);
            $('#price').val(price);
            $('#quantity').val(quantity);
            $('#category').val(categoryId);
            $('#description').val(description);
        })
        .then()
        .catch((err) => {
            console.log(err.message);
        })
})
