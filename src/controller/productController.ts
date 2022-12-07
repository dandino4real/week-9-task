import { Request, Response } from "express";
import Products from "../Model/productModel";

export const createProducts = async (req: Request, res: Response) => {
  try {
    const {
      name,
      image,
      brand,
      category,
      description,
      price,
      countInStock,
      rating,
      numReviews,
    } = req.body;
    const check = await Products.findOne({ name });
    if (!check) {
      const products = {
        name,
        image,
        brand,
        category,
        description,
        price,
        countInStock,
        rating,
        numReviews,
      };

      const newProduct = await Products.create(products);

      res.status(201).json({message:"Product created successfully",
      newProduct});
    }else{
        res.status(500).json({message: "product already exist"})
    }
  } catch (err) {
    
    res.status(500).json({ message: "badrequest" });
  }
};

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const {id} = req.body
    const products = await Products.find({});
    if(products){
    res.status(200).json({message:"products retrieved succesfuly", products });

    }else{
        res.status(404).json('products does not exist')
    }
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

export const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Products.findOne({ id });

    if (!product) {
      return res.status(404).json({ message: `No product with id:${id}` });
    }
    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ message: error });
  }

  res.json({ id: req.params.id });
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const product = await Products.findOneAndUpdate({ id }, req.body, {
      new: true,
    });

    if (!product) {
      res.status(404).json({ id, data: req.body });
    }
    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  //res.send('delete tasks from the controller')
  try {
    const { id: taskID } = req.params;
    const product = await Products.findOneAndDelete({ _id: taskID });
    if (!product) {
      return res.status(404).json({ message: `No task with id:${taskID}` });
    }
    res
      .status(200)
      .json({ message: `Product with id:${taskID} deleted successfully` });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
