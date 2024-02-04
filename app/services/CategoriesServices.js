import axios from "axios";

class CategoryServices   {
    constructor(endPoint) {
        this.collectionName = "categories";
        this.endPoint = endPoint;
    }

    getAllCategories = async () => {
        const res = await axios.get(this.endPoint + this.collectionName);
        return res.data;
    }

    addCategory = async (category) => {
        try {
            const res = await axios.post(this.endPoint + this.collectionName, category);
            return res.data;
        } catch (error) {
            throw new Error(`loi ${error.message}`)
        }
    }

    deleteCategory = async (id) => {
        try {
            const res = await axios.delete(this.endPoint + this.collectionName + '/' + id)
        } catch (error) {
            
        }
    }
    editCategory = async (id, category) => {
        try {
            const res = await axios.put(this.endPoint + this.collectionName + '/' + id, category)
            console.log(data);
            return res.data;
        } catch (error) {
            throw new Error(`loi ${error.message}`)
        }
    }

    getCategoryById = async (id) => {
        try {
            const res = await axios.get(this.endPoint + this.collectionName + '/' + id)
            return res.data;
        } catch (error) {
            throw new Error(`loi ${error.message}`)
        }
    }
}

export default CategoryServices