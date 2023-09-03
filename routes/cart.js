const router = require('express').Router();
const cartController = require('../controllers/cartController')


router.get("/find/:id", cartController.getTocart);
router.post("/", cartController.addTocart);
router.post("/quantity", cartController.decrementCart);
router.delete("/:id", cartController.deleteTocart);




module.exports = router;
