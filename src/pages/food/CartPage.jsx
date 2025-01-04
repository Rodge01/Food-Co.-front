import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getImgUrl } from "../../utils/getImgUrl";
import { removeFromCart, clearCart } from '../../redux/features/cart/cartSlice';

const CartPage = () => {
    const cartItems = useSelector((state) => state.cart.cartItems);
    const dispatch = useDispatch();

    // Calculate total price considering quantity of each item
    const totalPrice = cartItems
        .reduce((acc, item) => acc + item.newPrice * item.quantity, 0)
        .toFixed(2);

    // Calculate total quantity of items in the cart
    const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    // Apply a 5% discount if there are 5 or more items in the cart
    const discount = totalQuantity >= 5 ? 0.05 : 0;
    const discountAmount = (discount * totalPrice).toFixed(2);

    // Deduct the discount from the total price
    const totalPriceAfterDiscount = (totalPrice - discountAmount).toFixed(2);

    // Determine if the shipping fee is free based on the total price, or if there are no items in the cart
    const shippingFee = cartItems.length === 0 ? 0 : (totalPrice > 150 ? 0 : 20);

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    const handleRemoveFromCart = (food) => {
        dispatch(removeFromCart(food));
    };

    // Check if the cart is empty or the total price is zero
    const isCartEmpty = cartItems.length === 0 || totalPrice === "0.00";

    return (
        <div className="flex mt-12 h-full flex-col overflow-hidden bg-white shadow-xl">
            <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                <div className="flex items-start justify-between">
                    <div className="text-lg font-medium text-gray-900">Shopping cart</div>
                    <div className="ml-3 flex h-7 items-center">
                        <button
                            type="button"
                            onClick={handleClearCart}
                            className="relative -m-2 py-1 px-2 bg-red-500 text-white rounded-md hover:bg-secondary transition-all duration-200"
                        >
                            Clear Cart
                        </button>
                    </div>
                </div>

                <div className="mt-8">
                    {isCartEmpty ? (
                        <div className="text-center text-red-500">
                            <p>No items in the cart. Please add items to your cart before proceeding.</p>
                        </div>
                    ) : (
                        <ul className="-my-6 divide-y divide-gray-200">
                            {cartItems.map((food) => (
                                <li key={food._id} className="flex py-6">
                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                        <img
                                            src={`${getImgUrl(food.coverImage)}`}
                                            alt=""
                                            className="h-full w-full object-cover object-center"
                                        />
                                    </div>
                                    <div className="ml-4 flex flex-1 flex-col">
                                        <div>
                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                                <h3>
                                                    <Link to="/">{food.title}</Link>
                                                </h3>
                                                <p className="ml-4">₱{food.newPrice}</p>
                                            </div>
                                            <p className="mt-1 text-sm text-gray-500">
                                                <strong>Category:</strong> {food.category}
                                            </p>
                                        </div>
                                        <div className="flex items-center justify-between mt-2">
                                            <div className="flex items-center">
                                                <p className="text-gray-500">
                                                    <strong>Qty:</strong> {food.quantity}
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => handleRemoveFromCart(food)}
                                                className="text-indigo-600 hover:text-indigo-500"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                {!isCartEmpty && (
                    <>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                            <p>Shipping Fee</p>
                            <p>₱{shippingFee}</p>
                        </div>

                        {discount > 0 && (
                            <div className="flex justify-between text-base font-medium text-gray-900">
                                <p>Discount (5%)</p>
                                <p>-₱{discountAmount}</p>
                            </div>
                        )}

                        <div className="flex justify-between text-base font-medium text-gray-900">
                            <p>Subtotal</p>
                            <p>₱{totalPriceAfterDiscount}</p>
                        </div>

                        <p className="mt-0.5 text-sm text-gray-500">
                            Shipping Fee calculated at checkout.
                        </p>
                        <div className="mt-6">
                            <Link
                                to="/checkout"
                                className="flex items-center justify-center rounded-md bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                            >
                                Checkout
                            </Link>
                        </div>
                    </>
                )}
                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                    <Link to="/">
                        or
                        <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500 ml-1"
                        >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
