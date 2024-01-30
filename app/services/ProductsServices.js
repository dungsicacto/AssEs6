import axios from "axios";

class ProductServices {
    constructor(endPoint) {
        this.collectionName = "products";
        this.endPoint = endPoint;
    }

    getAllProducts = async () => {
        const res = await axios.get(this.endPoint + this.collectionName);
        return res.data;
    }

    addProduct = async (product) => {
        try {
            const res = await axios.post(this.endPoint + this.collectionName, product);
            return res.data;
        } catch (error) {
            throw new Error(`loi ${error.message}`)
        }
    }

    deleteProduct = async (id) => {
        try {
            const res = await axios.delete(this.endPoint + this.collectionName + '/' + id)
        } catch (error) {
            
        }
    }

    getProductById = async (id) => {
        try {
            const res = await axios.get(this.endPoint + this.collectionName + '/' + id)
            return res.data;
        } catch (error) {
            throw new Error(`loi ${error.message}`)
        }
    }

    editProduct = async (id, product) => {
        try {
            const res = await axios.put(this.endPoint + this.collectionName + '/' + id, product)
            console.log(data);
            return res.data;
        } catch (error) {
            throw new Error(`loi ${error.message}`)
        }
    }
}
export default ProductServices