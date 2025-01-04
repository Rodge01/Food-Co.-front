import { Link } from "react-router-dom";
import { HiMiniBars3CenterLeft } from "react-icons/hi2";
import { AiOutlineUser } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import { HiOutlineShoppingCart } from "react-icons/hi";
import avatarimg from "../assets/images21.jpg";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";

const navigation = [
    { name: "Dashboard", href: "/admin" },
    { name: "Orders History", href: "/orders" },
    { name: "Cart Page", href: "/cart" },
    { name: "Check out", href: "/checkout" },
];

const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const cartItems = useSelector((state) => state.cart.cartItems);
    const { currentUser, logout } = useAuth();

    const handleLogout = () => {
        logout();
    };

    return (
        <header className="max-w-screen-2xl mx-auto px-4 py-6">
            <nav className="flex justify-between items-center">
                {/* Left Side */}
                <div className="flex items-center md:gap-16 gap-4">
                    <Link to="/">
                        <HiMiniBars3CenterLeft className="w-6 h-6" />
                    </Link>
                </div>

                {/* Right Side */}
                <div className="relative flex items-center md:space-x-3 space-x-2">
                    <div>
                        {currentUser ? (
                            <>
                                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                                    <img
                                        src={avatarimg}
                                        alt="Avatar"
                                        className={`size-7 rounded-full ${
                                            currentUser ? 'ring-2 ring-blue-500' : ''
                                        }`}
                                    />
                                </button>
                                {/* Show Dropdown */}
                                {isDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-40">
                                        <ul className="py-2">
                                            {navigation.map((item) => (
                                                <li key={item.name} onClick={() => setIsDropdownOpen(false)}>
                                                    <Link to={item.href} className="block px-4 py-2 text-sm hover:bg-gray-100">
                                                        {item.name}
                                                    </Link>
                                                </li>
                                            ))}
                                            <li>
                                                <button
                                                    onClick={handleLogout}
                                                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                                                >
                                                    Logout
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </>
                        ) : (
                            <Link to="/login">
                                <AiOutlineUser className="w-6 h-6" />
                            </Link>
                        )}
                    </div>

                    {/* Heart Icon */}
                    <button className="hidden sm:block">
                        <AiOutlineHeart className="w-6 h-6" />
                    </button>

                    {/* Cart Icon */}
                    <Link to="/cart" className="bg-primary p-1 sm:px-6 px-2 flex items-center">
                        <HiOutlineShoppingCart className="w-6 h-6" />
                        <span className="text-sm font-semibold sm:ml-1">
                            {cartItems.length > 0 ? cartItems.length : 0}
                        </span>
                    </Link>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
