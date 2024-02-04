import ProductServices from './services/ProductsServices'
import JsonServerConstants from './constants/JsonServerConstants'
import { Product } from './models/Product';
import { getNameCategory } from './helpers/get_cata';
import { Dialog } from './helpers/dialog';
import { productSchema } from './models/Product';
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
                    <td hidden value="${id}">${id}</td>
                    <td>${name}</td>
                    <td id="more" value=${categoryId}>${getNameCategory(categoryId)}</td>
                    <td id="more">${price}</td>
                    <td id="more">${quantity}</td>
                    <td id="more">${description}</td>
                    <td>
                          <a href="/editProduct.html?id=${id}")>
                            <button class="btn btn-primary m-1 btn-modal-edit-product" style="min-width: 110px">
                              Edit
                            </button><br>
                          </a>
                       
                        <button onclick="deleteProduct(${id})" class="btn btn-danger m-1" style="min-width: 110px":70px">Delete</button>
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
    

    const id = Date.now().toString();
    const name = $('#name').val();
    const price = $('#price').val();
    const quantity = $('#quantity').val();
    const categoryId = $('#category').val();
    const description = $('#description').val();

    let pro = new Product(
      id, name, img, price, quantity, description, categoryId
    )
    console.log(img);
    productSchema.validate(pro).then((data) => {
      productServices.addProduct(pro)
        .then((data) => {
          // pop up ok
          alert('create success');
          location.reload();
        })

        .catch(e => {
          // pop up loi
        })
    }).catch((err) => {
      // ValidationError[]
      alert(err);
    });
  })
})

// encode img to base64-img
const fileImage = document.getElementById('image')

fileImage.addEventListener('change', () => {

  const fr = new FileReader();

  fr.readAsDataURL(fileImage.files[0]);
  // document.getElementById('btn-edit-product').disabled = true;
  fr.onload = (e) => {
    // document.getElementById('btn-edit-product').disabled = false;
    img = fr.result;
  }
})

// handler delete product

console.log();
function deleteProduct(id) {
  console.log(id);
  productServices.deleteProduct(id)
    .then(() => {
      alert('Delete success');
      location.reload();
      // let diaglog = Dialog('Delete success', () => {
      //   location.reload();
      // })
      // document.body.appendChild(diaglog);
      // // alert('Delete success');
      // location.reload();
    })
    .catch(e => {
      alert ('Delete fail');
    })
}
window.deleteProduct = deleteProduct;

// handler edit product


// function editProduct(id) {

//   productServices.getProductById(id)
//     .then(data => {
//       const { id, name, price, quantity, description, categoryId } = data;
//       $('#id').val(id);
//       $('#name').val(name);
//       $('#price').val(price);
//       $('#quantity').val(quantity);
//       $('#description').val(description);
//       $('#category').val(categoryId);

//       productServices.editProduct(id, data)
//         .then(() => {
//           alert('Edit success');
//           location.reload();
//         })
//     })
// }
// window.editProduct = editProduct;