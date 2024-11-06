Users can register and log in.

Authentication is managed using JSON Web Tokens (JWT), providing secure access to the API.

Access to cart and other sensitive endpoints requires a valid token.

Add to Cart: Users can add products to their cart. If a product is already in the cart, the quantity is updated by adding the new quantity.

Update Cart: Users can modify the quantity of products in their cart.

Remove from Cart: Users can remove products from their cart.

Each cart operation requires token validation.

Token Validation: Only authenticated users with a valid token can access cart endpoints.

User-Specific Validation: Users can only manipulate their own cart items. Each operation checks if the cart item belongs to the logged-in user, ensuring secure access.
