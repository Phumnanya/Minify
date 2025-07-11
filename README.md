MINIFY

This is a mini e-commerce store with a few products, built for an interview assessment for the role of junior-mid level frontend developer with Stackbuld and to also demonstrate my skill and abilities. 
The project was built with technologies that include: 
- React
- Typescript
- Tailwind CSS
- Zustand
- React-query library

The first contact with the live page hosted on https://minify-ecru.vercel.app brings you to the home page where the products are displayed with their names, prices, images and product ratings. 
The product ratings was implemented using the {react-star-ratings} library. the images were drawn from the images contained in the "public/img" folder of the project. 

Second page is the product details page where the user can get an overview and details of any product they select{ this page was implemented with the application of the react dynamic route feature, each product 
detail was drawn from a local json file named "produc-info.json" which is also in the public folder}, from wherein they can choose quantity, click the add to cart button and see the number 
updated on the cart icon on the top right corner of the sticky navbar which contains an internal route to the cart/checkout page where the user can see a rundown of all the items they have selected, 
the quantity(adjustable), remove products and total amount before payment.

The fetching of products details for the product details page from the products-info.json was done with react-query
then the storage of selected products figures, and updating the cart was implemented with Zustand
