const express = require("express");
const router = express.Router();
const mercadoPagoPixController = require("../controllers/mercadoPagoPixController.js");

//  CRIAR PAGAMENTO 
router.post("/payments", mercadoPagoPixController.createPix);

// POST WEBHOOK 
router.post("/webhook",  mercadoPagoPixController.createWebHook);

// GET STATUS PAGAMENTO 
router.get("/webhook/:id",  mercadoPagoPixController.getPaymentStatus);

module.exports = router;
