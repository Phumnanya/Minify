import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

function Footer() {
    return(
        <>
            <footer className="bg-teal-600 w-full p-5 text-white font-serif mt-4">
                <img src="/img/icons8-maxcdn0-96.png" alt="minify logo" className="w-10 md:w-sm mx-auto" />
                <br />
                <ul className="list-none text-white p-1">
                    <li className="border-b-2 border-white mb-2"><Link to="/" className="">Home</Link></li>
                    <li className="border-b-2 border-white mb-2"><Link to="/" className="">About</Link></li>
                    <li className="border-b-2 border-white mb-2"><Link to="/" className="">Contact</Link></li>
                    <li className="border-b-2 border-white mb-2"><Link to="/" className="">Collection</Link></li>
                </ul>
                <br /> 
                <h3 className="font-bold">Newsletter <FontAwesomeIcon icon={faEnvelope} className="w-5 md:size-7 align-bottom" /></h3>
                <p>Sign up for our weekly newsletter and free coupons below</p>
                <br />
                <input type="email" placeholder="enter email address" className="box-border inline-block w-3/5 rounded-full" />
                <button type="button" className="bg-orange-600 text-white p-2 md:p-4 text-center rounded-3xl max-w-fit">Sign up</button>
                <br />
                <h5 className="text-center font-bold">&copy; Minify 2025</h5>
            </footer>
        </>
    )
}

export default Footer;