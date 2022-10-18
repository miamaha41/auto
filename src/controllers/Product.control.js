import Product from "../models/Product.model.js";
import products from "../utilities/product.js";

export const createProducts = async (req, res) => {
  try {
    if (Product) {
      await Product.deleteMany({});
    }
    const importProducts = await Product.insertMany(products);
    res.send({ importProducts });
  } catch (error) {
    console.error(error);
    res.send({ message: error.message });
  }
};

export const insertedProduct = async (req, res) => {
  const product = req.body;
  if (!product) {
    res.send({ message: "Must have product!" });
  }
  try {
    const insertProduct = new Product(product);
    await insertProduct.save();
    if (!insertProduct) res.send({ message: insertProduct.error.message });
    res.send({ insertProduct, message: "Product was inserted!" });
  } catch (error) {
    res.send({ message: error.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const listProduct = await Product.find();
    res.send({ listProduct });
  } catch (error) {
    res.send({ message: error.message });
  }
};

export const deletedProduct = async (req, res) => {
  const productId = req.params.id;
  console.log(productId);
  if (!productId) {
    res.send({ message: "Must have product Id!" });
  }
  try {
    const deleteProduct = await Product.findByIdAndDelete(productId);
    if (!deleteProduct) {
      return res.status(401).json({
        success: false,
        message: "Product not found !",
      });
    }
    res.send({ deleteProduct, message: "Product was deleted!" });
  } catch (error) {
    res.send({ message: error.message });
  }
};

export const updatedProduct = async (req, res) => {
  let product = req.body;
  const productId = req.params.id;
  if (!product || !productId) {
    res.send({ message: "Must have product , product ID!" });
  }
  try {
    let updateProduct = await Product.findOneAndUpdate(
      { _id: productId },
      product,
      {
        new: true,
      }
    );
    if (updateProduct.error) res.send({ message: error.message });
    res.send({ updateProduct, message: "Product was updated!" });
  } catch (error) {
    res.send({ message: error.message });
  }
};
export const getProductById = async (req, res) => {
  console.log(req.params);
  const productId = req.params.id;
  console.log(productId);
  if (!productId) {
    res.send({ message: "Must have product Id!" });
  }
  try {
    let product = await Product.findById(productId);
    console.log(product);
    if (product.error) res.send({ message: error.message });
    res.send({ product });
  } catch (error) {
    res.send({ message: error.message });
  }
};
