// controllers/checkout.controller.js
import { previewCheckoutService } from "../services/checkoutService.js";

export const previewCheckout = async (req, res) => {
  try {
    const data = await previewCheckoutService(req.body);
    res.json({
      success: true,
      data,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};
