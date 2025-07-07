import Header from "../components/home-comeponents/Header";
import Footer from "../components/home-comeponents/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { ZustandStore } from "../ZustandStore";
import { useQuery } from "@tanstack/react-query";

type Product = {
  id: string;
  name: string;
  desc: string;
  price: number;
  image: string;
};

function Cart() {

    //payment success code
    const success = () => {
    const total = document.getElementById('total');
    const paymentSuccess = document.getElementById('paymentSuccess');
    if (total && paymentSuccess) {
        total.style.display = "none";
        paymentSuccess.style.display = "block";
    }
    }

    const cart = ZustandStore((state) => state.cart);
    const increaseItem = ZustandStore((state) => state.increaseItem);
    const decreaseItem = ZustandStore((state) => state.decreaseItem);
    const removeItem = ZustandStore((state) => state.removeItem);

    //query products
    const { data: products } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
        const response = await fetch("/products-info.json");
        if (!response.ok) throw new Error("Failed to fetch products");
        return response.json();
    },
    });

    //subtotal calculation
    const subtotal = cart.reduce((acc, item) => {
        const product = products?.find((p) => p.id === item.productId);
        if (!product) return acc;
        return acc + product.price * item.quantity;
    }, 0);


    return (
    <>
      <Header />

      <div id="total">
        <div className="mx-auto w-4/5 font-serif mb-3 font-bold text-start border-b-2 border-black mt-5">Cart</div>

        {cart.length === 0 && (
          <div className="text-center p-4">Your cart is empty.</div>
        )}

        {cart.map((item) => {
          const product = products?.find((p) => p.id === item.productId);
          if (!product) return null;

          return (
            <div key={item.productId} className="flex flex-row w-4/5 mx-auto justify-center items-start p-4 md:divide-x divide-black font-serif">
              <div className="w-1/4">
                <img src={`/img/${product.image}`} alt={product.name} className="w-20" />
              </div>
              <div className="w-1/4">
                <p className="text-center font-bold">{product.name}</p>
              </div>
              <div className="w-1/4">
                <div className="text-end font-bold">${product.price}</div>
              </div>

              <div className="w-1/4 flex flex-col items-center">
                <button
                  type="button"
                  className="text-orange-600 font-bold"
                  onClick={() => removeItem(item.productId)}
                >
                  <FontAwesomeIcon icon={faTrashCan} className="w-5 md:size-7 align-bottom" /> remove
                </button>

                <div className="flex flex-row items-center justify-start w-fit mt-2">
                  <button
                    type="button"
                    className="font-bold px-3 py-1 text-center bg-teal-600 text-white text-lg rounded-full"
                    onClick={() => decreaseItem(item.productId)}
                  >-</button>

                  <div className="inline-block border-2 border-orange-600 text-center w-15 px-4 py-1 box-border rounded-3xl mx-2">
                    <p className="font-bold">{item.quantity}</p>
                  </div>

                  <button
                    type="button"
                    className="font-bold px-3 py-1 text-center bg-teal-600 text-white text-lg rounded-full"
                    onClick={() => increaseItem(item.productId)}
                  >+</button>
                </div>
              </div>
            </div>
          );
        })}

        <div className="w-4/5 font-serif font-bold p-4 mt-5 mb-3 bg-slate-100 mx-auto rounded-lg">
          <h2 className="text-center">CART SUMMARY</h2>
          <div className="flex flex-row justify-between items-center mb-5 mt-5">
            <p className="self-start">Subtotal</p>
            <p className="self-end">${subtotal}</p>
          </div>
          <p className="font-light">NB: Delivery fees not included yet</p>
          <br />
          <button type="button" onClick={success} className="bg-orange-600 w-full md:w-2/5 p-3 text-white block mx-auto text-center">
            PLACE ORDER
          </button>
        </div>
      </div>

      <div style={{ display: "none" }} className="w-4/5 mx-auto font-serif" id="paymentSuccess">
        <div className="w-4/5 mx-auto">
          <img src="/img/icons8-done-96.png" alt="successful payment" className="w-md md:w-full mx-auto" />
          <h1 className="font-bold text-center mt-5">Thank You</h1>
          <h1 className="font-bold text-center mt-5">Payment Successful!!</h1>
          <h1 className="font-bold text-center mt-5">Order ID: 8101710392</h1>
          <Link to="/" className="mx-auto text-center block mt-10">
            <button type="button" className="max-w-fit bg-orange-600 text-white p-2 md:p-4 text-center rounded-3xl">
              Back to home
            </button>
          </Link>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Cart;