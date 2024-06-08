import { Router } from "express";
import {addProduct , getSumByCategory , getTotalItemsSold} from "./controller/product.controller.js"
const router = Router();

router.post("/", addProduct);
router.get("/sumByCategory", getSumByCategory);
router.get("/itemsSold",getTotalItemsSold)
export default router;
