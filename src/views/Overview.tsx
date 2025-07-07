import Header from "../components/home-comeponents/Header"
import Stars from "../assets/Stars"
import Footer from "../components/home-comeponents/Footer"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import Extra from "../assets/Extra"
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Loader from "../assets/Loader"
import { ZustandStore } from "../ZustandStore"
import { useState } from "react";

type Product = {
  id: string;
  name: string;
  desc: string;
  price: number;
  image: string;
};

function Overview() {
    const [quantity, setQuantity] = useState(0);

    const addItem = ZustandStore((state) => state.addItem);

    const { id } = useParams<{ id: string }>();
    
      const { data, isLoading, error } = useQuery<Product[]>({
      queryKey: ["products"],
      queryFn: async () => {
        const response = await fetch("/products-info.json");
        if (!response.ok) throw new Error("Failed to fetch products");
        return response.json();
      },
    });
    
      if (isLoading) return <Loader /> ;
      if (error) return <p>Something went wrong!</p>;
    
      const product = data?.find((p: Product) => p.id === id);
    
      if (!product) {
        return (
          <div style={{ padding: "1rem" }}>
            <h1>Product not found</h1>
            <p>Sorry, no product with ID {id} exists.</p>
          </div>
        );
      }

    return(
        <>
            <Header />
            <div className="flex flex-row items-center justify-center box-border w-full p-2 mb-2">
                {/**box 0 */}
                <div className="w-1/2">
                    <img src={`/img/${product.image}`} alt={product.name} className="w-sm md:w-1/2 mx-auto" />
                </div>

                {/**box 1 */}
                <div className="w-1/2 p-2 md:p-4 self-start">
                    {/**product name */}
                    <h1 className="font-bold">{product.name}</h1>
                    <Stars />
                    <h1 className="font-bold">${product.price}</h1>  {/**price */}
                    <br />

                    {/**product detail */}
                    <p className="font-serif mb-3">
                        {product.desc}
                    </p>

                    {/**quantity and counter */}
                    <div className="flex flex-row items-center justify-start w-fit">
                        <div>
                            <button type="button" className="font-bold px-4 py-1 text-center bg-teal-600
                             text-white text-2xl rounded-full" onClick={() => setQuantity((q) => Math.max(0, q - 1))}
                             >-
                             </button>
                        </div>
                        <div className="inline-block border-2 border-orange-600 text-center w-20 px-4 py-1
                             box-border rounded-3xl mx-2"><p className="font-bold">{quantity}</p>
                        </div>
                        <div>
                            <button type="button" className="font-bold px-4 py-1 text-center bg-teal-600
                             text-white text-2xl rounded-full" onClick={() => setQuantity((q) => q + 1)}>
                                +
                            </button>
                        </div>
                    </div> 

                    {/**add to cart button */}
                    <div className="mt-5 mx-auto my-auto text-center w-fit">
                        <button type="button" className="max-w-fit bg-orange-600 text-white p-2 md:p-4 
                        text-center rounded-3xl" onClick={() => {
                                if (quantity > 0 && product) {
                                addItem(product.id, quantity);
                                setQuantity(0);
                                }
                            }}>
                            Add to cart <FontAwesomeIcon icon={faShoppingCart} />
                        </button>
                    </div>
                </div>
            </div>
            <Extra />
            <Footer />
        </>
    )
}

export default Overview;