// routes/checkout.route.js
import express from "express";
import { previewCheckout } from "../controllers/checkoutController.js";

const router = express.Router();

router.post("/preview", previewCheckout);

export default router;
