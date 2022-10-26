import Cart from "../models/Cart.model.js";
import Product from "../models/Product.model.js";

export const getCart = async (req, res) => {
  const userId = req.payload.userId;
  try {
    const cart = await Cart.findOne({ userId });
    res.send({ products: cart.products, bill: cart.bill });
  } catch (error) {
    res.send({ message: error.message });
  }
};
export const createCart = async (req, res) => {
  const userId = req.payload.userId;
  const { productId, quantity } = req.body;
  try {
    const cart = await Cart.findOne({ userId });
    const product = await Product.findOne({ _id: productId });
    if (!product) {
      res.status(404).send({ message: "Product not found" });
      return;
    }
    const { currentPrice, name, imgSrc } = product;
    const productQuantity = product.quantity;
    //If cart already exists for user,
    if (cart) {
      const productIndex = cart.products.findIndex(
        (product) => product.productId == productId
      );
      //check if product exists or not
      if (productIndex > -1) {
        let product = cart.products[productIndex];
        product.quantity += Number(quantity);
        cart.bill = cart.products.reduce((acc, curr) => {
          return acc + curr.quantity * curr.currentPrice;
        }, 0);
        cart.products[productIndex] = product;
        await cart.save();
        res.status(200).send(cart);
      } else {
        cart.products.push({
          productId,
          name,
          quantity,
          currentPrice,
          productQuantity,
          imgSrc: imgSrc[0],
        });
        cart.bill = cart.products.reduce((acc, curr) => {
          return acc + curr.quantity * curr.currentPrice;
        }, 0);
        await cart.save();
        res.status(200).send(cart);
      }
    } else {
      //no cart exists, create one
      const newCart = await Cart.create({
        userId,
        products: [
          {
            productId,
            name,
            quantity,
            currentPrice,
            imgSrc: imgSrc[0],
            productQuantity,
          },
        ],
        bill: quantity * currentPrice,
      });

      return res.status(201).send(newCart);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("something went wrong");
  }
};
export const clearCart = async (req, res) => {
  try {
    const userId = req.payload.userId;
    const del = await Cart.findOneAndDelete({ userId });
    if (del) {
      return res.status(200).send(del);
    }
  } catch (error) {
    console.log(error);
  }
};
