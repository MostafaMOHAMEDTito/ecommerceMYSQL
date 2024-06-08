import { Router } from "express";
import {
  createOrder,
  averageOrder,
  purchItem,
  notAnyOrders,
  customerOrder,
  earliestOrder,
} from "./controller/orders.controller.js";
const router = Router();

router.post("/", createOrder);
router.get("/avgOrder", averageOrder);
router.get("/purchItem", purchItem);
router.get("/notAnyOrders", notAnyOrders);
router.get("/customerOrder", customerOrder);
router.get("/earliestOrder", earliestOrder);
export default router;
