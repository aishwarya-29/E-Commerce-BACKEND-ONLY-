## E-COMMERCE WEBSITE (BACKEND ONLY)

### ROUTES

- _'/'_ : home page
- _'/browse'_ : browse all products
- _'/product'_ : api to display all products
- _'/product/:id'_ : api to display specific product
- _'/category'_ : api to view all categories
- _'/category/:categoryName'_ : api to view all products in categoryName
- _'/user/login'_ : user login page
- _'/user/signup'_ : user signup page
- _'/seller/login'_ : seller login page
- _'/seller/signup'_ : seller signup page
- _'/cart'_ : view products in cart
- _'/user/:id'_ : view user profile (api)
- _'/seller/:id'_ : view seller profile (api)



### API ENDPOINTS

- create, remove, update, display PRODUCTS --> '/products/:id' (POST/DELETE/PUT/GET)
- create, remove, update, display USERS    --> '/user/:id' (POST/DELETE/PUT/GET)
- update, remove, display PRODUCT FROM CART         --> '/cart' (PUT/DELETE/GET)


### MODELS
- User Schema = {
    email,
    password
}

- Product Schema = {
    name,
    category,
    price,
    sellerID,
    stock
}

- Seller Schema = {
    email,
    password
}

- Cart Schema = {
    user,
    products = []
}



### DESCRIPTION

This is the back-end code of a simple e-commerce website. 
Two kinds of users can access this application - buyer and seller.
A buyer can view, browse products and add certain products to their cart.
A seller can add a product, update its details and remove a product when it is out of stock.

