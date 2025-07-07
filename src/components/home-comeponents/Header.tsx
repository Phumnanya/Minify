import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { ZustandStore } from "../../ZustandStore";

function Header() {
    const totalItems = ZustandStore((state) => state.totalItems());

    return(
        <>
            <div className="flex flex-row bg-teal-600 items-center justify-between box-border w-full
              p-2 sticky top-0 mb-2 z-40">
                <div className="font-serif font-bold w-fit">
                <h1 className="text-start text-white text-2xl md:text-5xl inline-block"> 
                    <img src="/img/icons8-maxcdn12-48.png" alt="m" className="inline-block max-w-sm 
                    align-middle md:align-top" />inify
                </h1>
                </div>
                <div className="second box w-fit">
                    <input type='search' placeholder="search" className="rounded-3xl min-w-5 md:w-auto" />
                    <button type="button" className="bg-orange-600 text-white hidden md:inline-block w-fit p-2 rounded-full ml-1 align-middle">
                        <img src="/img/icons8-search-64.png" className="size-8" />
                    </button>
                </div>
                <div className="third box w-fit text-right">
                    <Link to="/cart">
                        <div className="rounded-full w-fit bg-white relative inline-block mr-2 p-2">
                            <span><FontAwesomeIcon icon={faShoppingCart} className="w-5 md:size-10" /></span>
                            <p className="absolute rounded-full bg-orange-600 text-white w-5 box-border px-0 
                            text-center top-0 right-0">{totalItems}</p>
                        </div>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Header;
