import JsonServerConstants from './constants/JsonServerConstants'
import Category from './models/Category';
import CategoriesServices from '/app/services/CategoriesServices'

const categoryServices = new CategoriesServices(JsonServerConstants.EndPoint);

$(document).ready(function () {
  try {
    // get id from url 
    const urlParams = new URLSearchParams(window.location.search);
    const idUrl = urlParams.get('id');

    // get category by id
    categoryServices.getCategoryById(idUrl)
      .then((oldData) => {
        const { id, name } = oldData;
        $('#id').val(id);
        $('#name').val(name);
      })
      // handler edit category
      .then(() => {
        $('#btn-edit-category').on('click', () => {
          const id = $('#id').val();
          const newName = $('#name').val();

          let newCategory = new Category(
            id, newName
          )
          categoryServices.editCategory(idUrl, newCategory)
            .then(() => {
              alert('Update success');
              window.location.href = '/listCategories.html';
            })
            .catch((err) => {
              location.href = '/listCategories.html';
              alert('Update success');
              console.log(err.message);
            })
        });
      })
  } catch (error) {}
});