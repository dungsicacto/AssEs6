import ProductServices from '../../app/services/ProductsServices'
import JsonServerConstants from '../../app/constants/JsonServerConstants'
import { Product } from '../../app/models/Product';  
const productServices = new ProductServices(JsonServerConstants.EndPoint);
$(document).ready(function () {
    try {
        const placeholder = $('#list-products-placeholder');

        productServices.getAllProducts()
            .then(data => {
                let list = '';
                for (const key in data) {
                    const product = data[key];
                    const { id , name,imgUrl, price, quantity, description,categoryId } = product;
                    const img = new Image();
                    img.src = imgUrl;
                    console.log(img);
                    list +=
                        `
                        <div class="col-md-3 mb-3 text-center">
                            <img src="${img}" alt="${name}-img">
                            <h4>${name}</h4> 
                            <h5>${price}</h5>   
                        </div>
                        `;
                }
                placeholder.append(list);
            })
    } catch (error) {
        console.log(error.message);
    }

});