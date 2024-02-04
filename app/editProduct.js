import ProductServices from './services/ProductsServices'
import JsonServerConstants from './constants/JsonServerConstants'
import { Product } from './models/Product';
import { getNameCategory } from './helpers/get_cata';
import { Dialog } from './helpers/dialog';
import { productSchema } from './models/Product';
let img = undefined;

const productServices = new ProductServices(JsonServerConstants.EndPoint);

$(document).ready(function () {

    // get id from url
    const urlParams = new URLSearchParams(window.location.search);
    const idUrl = urlParams.get('id');
    console.log(idUrl);


    // get product by id
    productServices.getProductById(idUrl)
        .then((oldData) => {
            const { id,name, img, price, quantity, description, categoryId } = oldData;

            $('#name').val(name);
            $('#img').val(img);
            $('#price').val(price);
            $('#quantity').val(quantity);
            $('#category').val(description);
            $('#description').val(categoryId);
        })
        // handler edit proudct
        .then(() => {
            $('#btn-edit-product').on('click', () => {
                const id = $('#id').val();
                const newName = $('#name').val();
                const newPrice = $('#price').val();
                const newQuantity = $('#quantity').val();
                const newCategoryId = $('#category').val();
                const newDescription = $('#description').val();

                console.log(img);
                let newPro = new Product(
                    idUrl,newName, img, newPrice, newQuantity, newDescription, newCategoryId
                )
                productSchema.validate(newPro).then((data) => {
                    productServices.editProduct(idUrl, newPro)
                        .then(() => {
                            alert('Update success');
                            // window.location.href = '/listProducts.html';
                        })
                        .catch((err) => {
                            alert('Update fail');
                            // location.href = '/listProducts.html';
                        })
                })
                    .catch((err) => {
                        console.log(err.message);
                    })
            });
        })
        .catch((err) => {
            console.log(err.message);
        })

})
// encode img to base64-img
const fileImage = document.getElementById('image')

fileImage.addEventListener('change', () => {

    const fr = new FileReader();

    fr.readAsDataURL(fileImage.files[0]);
    fr.onload = (e) => {
        img = fr.result;
    }
})