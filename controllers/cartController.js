const Cart = require("../models/cart");

module.exports = {
    addTocart: async (req, res) => {
        const { userId, cartItem, quantity } = req.body;
        try {
            const cart = await Cart.findOne({ userId });
            if (cart) {
                const existingProduct = cart.products.find(
                    product => product.cartItem.toString() === cartItem
                );

                if (existingProduct) {
                    existingProduct.quantity += 1
                } else {
                    cart.products.push({ cartItem, quantity })
                }

                await cart.save();
                res.status(200).json("Add to cart successfully")
            }
            else {
                const newCart = new Cart({
                    userId,
                    products: [
                        {
                            cartItem, quantity: quantity
                        }
                    ]
                });
                await newCart.save();
                res.status(200).json("Add to cart successfully")

            }
        } catch (error) {
            res.status(500).json(error)
        }
    },

    getTocart: async (req, res) => {
        const userId = req.params.id;
        try {
            const cart = await Cart.find({ userId })
                // .populate("products.cartItem", '_id title supplier price imageUrl');
            res.status(200).json(cart)
        } catch (error) {
            res.status(500).json(error)
        }
    },

    deleteTocart: async (req, res) => {
        try {
            await Cart.findByIdAndDelete(req.params.id);
            res.status(200).json('Sucessfully Deleted');
        } catch (error) {
            res.status(500).json(error);
        }
    },

    decrementCart: async (req, res) => {
        const { userId, cartItem } = req.body;

        try {
            const cart = await Cart.findOne({ userId });
            if (!cart) {
                return res.status(404).json("cart not fouind")
            }

            const existingProduct = cart.products.find(
                product => product.cartItem.toString() === cartItem
            );
            if (!existingProduct) {
                return res.status(404).json("cart not found")

            }

            if (existingProduct.quantity === 1) {
                cart.products = cart.products.filter(
                    product => product.cartItem.toString() !== cartItem
                )
            }
            else {
                existingProduct.quantity -= 1;
            }

            await cart.save();

            if (existingProduct.quantity === 0) {
                await Cart.updateOne(
                    { userId },
                    { $pull: { products: { cartItem } } }
                )
            }

            res.status(200).json("Product updated")
        } catch (error) {
            res.status(500).json(error)
        }
    },

}