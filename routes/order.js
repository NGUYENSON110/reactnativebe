const router = require('express').Router();
const orderController = require('../controllers/ordersController');

router.get("/", orderController.getUserOrders)


module.exports = router;
