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

The fetching of products details for the product details page and the checkout page from the products-info.json was done with react-query
then the storage of the figures of the selected products, and updating the cart was implemented with Zustand

Implementation of Zustand:
- A store was created in the file named ZustandStore.tsx at the root of the src folder
- The main function "create" was imported at the beginning, it's internal functions "(set,get)" were used to hold, read the current values of the cart and update it on the page anytime its function is called.
- "Persist" was also added to the logic to help persist the logic and save the stored details to the local storage so that even when the browser is closed and reopened, the selected items are still there and not lost.
