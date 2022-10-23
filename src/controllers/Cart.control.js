import Cart from "../models/Cart.model.js";

export const getCart = async (req, res) => {
  const userId = req.payload.userId;
  try {
    const cart = await Cart.findOne({ userId });
    res.send({ products: cart.products });
  } catch (error) {
    res.send({ message: error.message });
  }
};
