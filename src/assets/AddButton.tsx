import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

export default function Button() {
    return(
        <div className="mx-auto">
        <button type="button" className="max-w-fit bg-orange-600 text-white p-2 md:p-4 text-center rounded-3xl">
            Add to cart <FontAwesomeIcon icon={faShoppingCart} />
        </button>
        </div>
    )
}