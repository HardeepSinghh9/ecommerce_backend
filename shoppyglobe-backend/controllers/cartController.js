import Cart from "../models/cartModel.js";
import Product from "../models/productModel.js";

// Update Cart will only update quantity, here quantity can be  either increase or decrease, as in 10 can be 2 or 12. unlike addtocart.

const updateCart = async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  if (quantity <= 0) {
    return res
      .status(400)
      .json({ message: "Quantity must be greater than 0." });
  }

  try {
    const cartItem = await Cart.findById(id);

    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    if (cartItem.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Access forbidden" });
    }

    cartItem.quantity = quantity;
    await cartItem.save();
    res.status(200).json({ message: "Cart updated", cartItem });
  } catch (error) {
    console.error("Error updating cart:", error);
    res.status(500).json({ message: "Failed to update cart", error });
  }
};

// Add to Cart with validation if there already exists a cart item, the quantity will be updated,
// if item with qantity 10 is there, then again adding to cart same item will increase quantity not overwrite it.

const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id;

  if (!userId) {
    return res
      .status(400)
      .json({ message: "User ID is missing from the request." });
  }

  if (quantity <= 0) {
    return res
      .status(400)
      .json({ message: "Quantity must be greater than 0." });
  }

  try {
    // Find the existing cart item for this user and product
    const existingCartItem = await Cart.findOne({ userId, productId });

    if (existingCartItem) {
      // If the cart item exists, add the new quantity to the existing quantity
      existingCartItem.quantity += quantity;
      await existingCartItem.save();

      return res.status(200).json({
        message: "Quantity updated in cart",
        cartItem: existingCartItem,
      });
    }

    // If the cart item does not exist, create a new one
    const cartItem = new Cart({ userId, productId, quantity });
    await cartItem.save();

    res.status(200).json({ message: "Product added to cart", cartItem });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ message: "Failed to add product to cart", error });
  }
};

// Remove the whole item from cart unlike reduce Quantity which reduces the quantity of item in cart.

const removeFromCart = async (req, res) => {
  const { id } = req.params;

  try {
    const cartItem = await Cart.findOneAndDelete({
      _id: id,
      userId: req.user.id,
    });

    if (!cartItem) {
      return res
        .status(404)
        .json({ message: "Cart item not found or access forbidden" });
    }

    res.status(200).json({ message: "Product removed from cart" });
  } catch (error) {
    console.error("Error removing from cart:", error);
    res
      .status(500)
      .json({ message: "Failed to remove product from cart", error });
  }
};

export { addToCart, updateCart, removeFromCart };
