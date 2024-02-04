import JsonServerConstants from './constants/JsonServerConstants'
import Category from './models/Category';
import CategoriesServices from '/app/services/CategoriesServices'

const categoryServices = new CategoriesServices(JsonServerConstants.EndPoint);

$(document).ready(function () {
    try {
        const placeholder = $('#placeholder');

        categoryServices.getAllCategories()
            .then((data) => {
                let list = '';
                for (const key in data) {
                  const category = data[key];
                  const { id,  name} = category;
                  list +=
                    `<tr>
                            <td hidden value=${id}${id}</td>
                            <td>${name}</td>
                            <td>
                                  <a href="/editCategory.html?id=${id}")>
                                    <button class="btn btn-primary m-1 btn-modal-edit-product" style="min-width: 110px">
                                      Edit
                                    </button><br>
                                  </a>
                               
                                <button onclick=deleteCategory("${id}") class="btn btn-danger m-1" style="min-width: 110px":70px">Delete</button>
                            </td>
                        </tr>`
                }
                placeholder.append(list);
            })
    } catch (error) {

    }
});

// delete category
function deleteCategory(id) {
    categoryServices.deleteCategory(id)
        .then(() => {
            alert('Delete success');
            window.location.reload();
        })
}
window.deleteCategory = deleteCategory;

//insert category
$('#btn-create-category').on('click', () => {
    

  const id = Date.now().toString();
  const name = $('#name').val();

  let category = new Category(
    id, name
  )
  categoryServices.addCategory(category)
    .then((data) => {
      // pop up ok
      alert('create success');
      location.reload();
    })
})
