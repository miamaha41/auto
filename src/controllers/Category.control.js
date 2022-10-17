import Category from "../models/Category.model.js";
import categories from "../utilities/categories.js";

export const getCategories = async (req, res) => {
  try {
    const listCategory = await Category.find();
    res.send({ listCategory });
  } catch (error) {
    ``;
    res.send({ message: error.message });
  }
};
export const createCategories = async (req, res) => {
  try {
    if (Category) {
      await Category.deleteMany({});
    }
    const importCategories = await Category.insertMany(categories);
    res.send({ importCategories });
  } catch (error) {
    console.error(error);
    res.send({ message: error.message });
  }
};
