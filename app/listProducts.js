import ProductServices from './services/ProductsServices'
import JsonServerConstants from './constants/JsonServerConstants'
import Product from './models/Product';
import { getNameCategory } from './helpers/get_cata';
import { Dialog } from './helpers/dialog';
let img = undefined;
const productServices = new ProductServices(JsonServerConstants.EndPoint);
$(document).ready(function () {
  try {
    const placeholder = $('#placeholder');
    // get list products by call api

    productServices.getAllProducts()
      .then(data => {
        let list = '';
        for (const key in data) {
          const product = data[key];
          const { id, categoryId, name, price, quantity, description } = product;
          list +=
            `<tr>
                    <td hidden value=>${id}>${id}</td>
                    <td>${name}</td>
                    <td id="more" value=${categoryId}>${getNameCategory(categoryId)}</td>
                    <td id="more">${price}</td>
                    <td id="more">${quantity}</td>
                    <td id="more">${description}</td>
                    <td>
                        <button href='deleteCategory.html?id=${id}'><i class="fa fa-pencil" aria-hidden="true"></i> Delete</button><br>
                        <button onclick=deleProduct("${id}") aria-hidden="true" data-bs-toggle="modal" data-bs-target="#exampleModal"></i> Edit</button>
                    </td>
                </tr>`;
        }
        placeholder.append(list);
      })
  } catch (error) {
    console.log(error.message);
  }


  // insert product
  $('#btn-create-product').on('click', () => {

    // encode image to base64
    const id = crypto.randomUUID();
    const name = $('#name').val();
    const price = $('#price').val();
    const quantity = $('#quantity').val();
    const categoryId = $('#category').val();
    const description = $('#description').val();

    let pro = new Product(
      id, name, img, price, quantity, description, categoryId
    )
    productServices.addProduct(pro).then((data) => {
      alert('create success');
      // pop up ok
    }).catch(e => {
      // pop up loi
    })
  })
})

// encode img to base64-img
const fileImage = document.getElementById('image')
console.log(fileImage);

fileImage.addEventListener('change', () => {

  const fr = new FileReader();

  fr.readAsDataURL(fileImage.files[0]);
  document.getElementById('btn-create-product').disabled = true;
  fr.onload = (e) => {
    document.getElementById('btn-create-product').disabled = false;
    img = fr.result;
  }
})
function deleProduct(id) {
  // console.log(id)
  productServices.deleteProduct(id)
    .then(() => {
      let html = Dialog("Oke bro", () => {
        location.reload()
      })
      let a = (document.createElement("diaglog"))
      a.innerHTML = html
      document.body.appendChild(a)
    })
}
window.deleProduct = deleProduct;
