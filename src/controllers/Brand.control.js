import Brand from "../models/Brand.model.js";
import { brands } from "../utilities/brands.js";

export const getBrands = async (req, res) => {
  try {
    const listBrand = await Brand.find();
    res.send({ listBrand });
  } catch (error) {
    res.send({ message: error.message });
  }
};
export const createBrands = async (req, res) => {
  try {
    if (Brand) {
      await Brand.deleteMany({});
    }
    const insertBrands = await Brand.insertMany(brands);
    res.send({ insertBrands });
  } catch (error) {
    console.error(error);
    res.send({ message: error.message });
  }
};
