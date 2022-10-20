import createHttpError from "http-errors";
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
    if (updateProduct.errors) res.send({ message: error.message });
    res.send({ updateProduct, message: "Product was updated!" });
  } catch (error) {
    res.send({ message: error.message });
  }
};
export const getProductById = async (req, res) => {
  const productId = req.params.id;
  if (!productId) {
    res.send({ message: "Must have product Id!" });
  }
  try {
    let product = await Product.findById(productId);
    res.send({ product });
  } catch (error) {
    res.send({ message: error.message });
  }
};
export const getProductByName = async (req, res, next) => {
  const name = req.query.name;
  console.log(name);
  if (!name) {
    res.send({ message: "Must have product name!" });
  }
  try {
    let product = await Product.find({ name });
    console.log(product);
    if (product.length === 0) {
      next(createHttpError.NotFound("Not find any product!"));
    }
    res.send({ product });
  } catch (error) {
    res.send({ message: error.message });
    next(error);
  }
};
export const paginationProduct = async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    console.log(page, limit);
    const products = await Product.find({ ...req.query })
      // We multiply the "limit" variables by one just to make sure we pass a number and not a string
      .limit(limit * 1)
      .skip((page - 1) * limit)
      // We sort the data by the date of their creation in descending order (user 1 instead of -1 to get ascending order)
      .sort({ createdAt: -1 });

    // Getting the numbers of products stored in database
    const count = await Product.countDocuments();

    return res.status(200).json({
      products,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (err) {
    next(err);
  }
};
