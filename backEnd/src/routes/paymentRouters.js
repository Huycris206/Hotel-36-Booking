import express from 'express';
import { 
    createPayment, 
    getAllPayments, 
    updatePaymentStatus, 
    deletePayment 
} from '../controllers/paymentController.js';

const router = express.Router();

// Endpoint: /api/payments
router.post("/", createPayment);
router.get("/", getAllPayments);
router.put("/:id", updatePaymentStatus);
router.delete("/:id", deletePayment);

export default router;  