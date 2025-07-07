import Stars from "../../assets/Stars";
import Price from "../../assets/Price";
import { Link } from "react-router-dom";

function Products() {
    <Link to="/" className="">Home</Link>
    return(
        <>
            <div className="flex flex-row justify-center items-center flex-wrap max-w-full font-serif box-border
             p-4 md:gap-4 bg-slate-100">
                {/**box 0 */}
                <div className="flex flex-col justify-center items-start w-1/2 md:w-1/5 rounded-lg bg-white p-1 box-border">
                    <Link to="/overview/0">
                        <img src="/img/shampoo.jpg" alt="shampoo" className="w-sm md:w-full" />
                        <h2 className="font-bold">Radox Shower Shampoo Gel</h2>
                        <Stars />
                        <Price value0="$" value1={10} />
                    </Link>
                </div>
                {/**box 1 */}
                <div className="flex flex-col justify-center items-start w-1/2 md:w-1/5 rounded-lg bg-white p-1 box-border">
                    <Link to="/overview/1">
                        <img src="/img/angus.jpg" alt="angus burgers" className="w-sm md:w-full" />
                        <h2 className="font-bold">Aberdeen Angus Burgers</h2>
                        <Stars />
                        <Price value0="$" value1={18} />
                    </Link>
                </div>
                {/**box 2 */}
                <div className="flex flex-col justify-center items-start w-1/2 md:w-1/5 rounded-lg bg-white p-1 box-border">
                    <Link to="/overview/2">
                        <img src="/img/chicken.jpg" alt="roast chicken" className="w-sm md:w-full" />
                        <h2 className="font-bold">Best Roast Chicken</h2>
                        <Stars />
                        <Price value0="$" value1={12} />
                    </Link>
                </div>
                {/**box 3 */}
                <div className="flex flex-col justify-center items-start w-1/2 md:w-1/5 rounded-lg bg-white p-1 box-border">
                    <Link to="/overview/3">
                        <img src="/img/pasta.jpg" alt="Dolmio Pasta Sauce" className="w-sm md:w-full" />
                        <h2 className="font-bold">Dolmio Pasta</h2>
                        <Stars />
                        <Price value0="$" value1={15} />
                    </Link>
                </div>
                {/**box 4 */}
                <div className="flex flex-col justify-center items-start w-1/2 md:w-1/5 rounded-lg bg-white p-1 box-border">
                    <Link to="/overview/4">
                        <img src="/img/dove.jpg" alt="Dove Colour Care Pro" className="w-sm md:w-full" />
                        <h2 className="font-bold">Dove Colour Care Pro</h2>
                        <Stars />
                        <Price value0="$" value1={17} />
                    </Link>
                </div>
                {/**box 5 */}
                <div className="flex flex-col justify-center items-start w-1/2 md:w-1/5 rounded-lg bg-white p-1 box-border">
                    <Link to="/overview/5">
                        <img src="/img/body-wash.jpg" alt="weleda body wash" className="w-sm md:w-full" />
                        <h2 className="font-bold">Weleda Easy Body Wash</h2>
                        <Stars />
                        <Price value0="$" value1={15} />
                    </Link>
                </div>
                {/**box 6 */}
                <div className="flex flex-col justify-center items-start w-1/2 md:w-1/5 rounded-lg bg-white p-1 box-border ">
                    <Link to="/overview/6">
                        <img src="/img/spray.jpg" alt="flash spray wipe" className="w-sm md:w-full" />
                        <h2 className="font-bold">Flash Spray Wipe</h2>
                        <Stars />
                        <Price value0="$" value1={10} />
                    </Link>
                </div>
                {/**box 7 */}
                <div className="flex flex-col justify-center items-start w-1/2 md:w-1/5 rounded-lg bg-white p-1 box-border">
                    <Link to="/overview/7">
                        <img src="/img/steak.jpg" alt="Ocado Cowboy Steak" className="w-sm md:w-full" />
                        <h2 className="font-bold">Cowboy Steak</h2>
                        <Stars />
                        <Price value0="$" value1={22} />
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Products;
