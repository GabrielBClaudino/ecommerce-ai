import Product from '../models/product.js'
const productController={
    getProducts: async (req,res) =>{
        try {
            const products = await Product.find();
            res.status(200).send(products);    
        } catch (error) {
            res.status(500).send({ message: error.message })
        }
    },
    getProductById: async (req,res) =>{
        try {
            const product = await Product.findById(req.params.id);
            res.status(200).send(product);    
        } catch (error) {
            res.status(500).send({ message: error.message })
        }        
    },
    createProduct: async (req,res) =>{
        try {
            const newProduct = await Product.create(req.body);
            res.status(201).send(newProduct);    
        } catch (error) {
            res.status(500).send({ message: error.message })
        }
    },
    updateProduct: async (req,res) =>{
        try {
            const updateProduct = await Product.findByIdAndUpdate(req.params.id,req.body,{ new : true });  
            res.status(200).send(updateProduct);
        } catch (error) {
            res.status(500).send({ message: error.message })
        }
    },
    deleteProductById: async (req,res) =>{
        try {
            const deleteProduct = await Product.findByIdAndDelete(req.params.id);
            res.status(200).send(deleteProduct)
        } catch (error) {
            res.status(500).send({ message: error.message })
        }
    }
    
}
export default productController;