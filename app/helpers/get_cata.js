let  listCategory = {
    0 : "Table",
    1 : "Phone",
    2 : "Ipad"
}
export function getNameCategory(id) {
    return listCategory[id]
}
export function getMapCategory(){
    return listCategory;
}