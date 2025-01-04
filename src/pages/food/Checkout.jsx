import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCreateOrderMutation } from "../../redux/features/orders/orderApis";
import Swal from "sweetalert2";
import { useState } from "react";

const Checkout = () => {
  const cartItems = useSelector(state => state.cart.cartItems);

  // Calculate the total price considering the quantity of items
  const totalPrice = cartItems
    .reduce((acc, item) => acc + item.newPrice * item.quantity, 0)
    .toFixed(2);

  // Calculate the total quantity of items in the cart
  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Apply a 5% discount if there are 5 or more items in the cart
  const discount = totalQuantity >= 5 ? 0.05 : 0;
  const discountAmount = (discount * totalPrice).toFixed(2);

  // Calculate the shipping fee (free if total price is greater than 150)
  const shippingFee = totalPrice > 150 ? 0 : 20;

  // Calculate the final price (including the shipping fee and discount)
  const finalPrice = (parseFloat(totalPrice) + shippingFee - parseFloat(discountAmount)).toFixed(2);

  const { currentUser } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  const onSubmit = async (data) => {
    const newOrder = {
        name: data.name,
        email: currentUser?.email,
        address: {
            city: data.city
        },
        phone: data.phone,
        foodIds: cartItems.map(item => item?._id),
        totalPrice: finalPrice,
    };
    try {
      await createOrder(newOrder).unwrap();

      Swal.fire({
        title: "Confirmed Order",
        text: "Your Order placed successfully!",
        icon: "success",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Okay"
      });
      navigate("/orders")
    } catch (err) {
      console.error("Error placing an order:", err);
      alert("Failed to Create an Order");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  return (
    <section>
      <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
        <div className="container max-w-screen-lg mx-auto">
          <div>
            <h2 className="font-semibold text-xl text-gray-600 mb-2">Cash On Delivery</h2>
            <p className="text-gray-500 mb-2">
              Total Price: <span className="font-bold">₱{finalPrice}</span> {/* Display final price including shipping and discount */}
            </p>
            <p className="text-gray-500 mb-6">
              Items:{" "}
              <span className="font-bold">
                {cartItems.length > 0
                  ? cartItems.reduce((acc, item) => acc + item.quantity, 0)
                  : 0}
              </span>
            </p>
            {discount > 0 && (
              <p className="text-gray-500 mb-2">
                Discount: <span className="font-bold">₱{discountAmount}</span>
              </p>
            )}
            <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
              <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3 my-8">
                <div className="text-gray-600">
                  <p className="font-medium text-lg">Personal Details</p>
                  <p>Please fill out all the fields.</p>
                </div>
                <div className="lg:col-span-2">
                  <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                    <div className="md:col-span-5">
                      <label htmlFor="name">Full Name</label>
                      <input
                        {...register('name', { required: "Name is required" })}
                        type="text"
                        name="name"
                        id="name"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      />
                      {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                    </div>

                    <div className="md:col-span-5">
                      <label htmlFor="email">Email Address</label>
                      <input
                        {...register('email', { required: "Email is required" })}
                        type="text"
                        name="email"
                        id="email"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        disabled
                        defaultValue={currentUser?.email}
                        placeholder="email@domain.com"
                      />
                      {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                    </div>

                    <div className="md:col-span-5">
                      <label htmlFor="phone">Phone Number</label>
                      <input
                        {...register('phone', { required: "Phone number is required" })}
                        type="tel"
                        name="phone"
                        id="phone"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        placeholder="+63"
                      />
                      {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
                    </div>

                    <div className="md:col-span-3">
                      <label htmlFor="address">Address / Street</label>
                      <input
                        {...register('address', { required: "Address is required" })}
                        type="text"
                        name="address"
                        id="address"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      />
                      {errors.address && <p className="text-red-500">{errors.address.message}</p>}
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="city">City</label>
                      <input
                        {...register('city', { required: "City is required" })}
                        type="text"
                        name="city"
                        id="city"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      />
                      {errors.city && <p className="text-red-500">{errors.city.message}</p>}
                    </div>

                    <div className="md:col-span-5 mt-3">
                      <div className="inline-flex items-center">
                        <input
                          type="checkbox"
                          name="billing_same"
                          id="billing_same"
                          className="form-checkbox cursor-pointer"
                          onChange={handleCheckboxChange}
                        />
                        <label htmlFor="billing_same" className="ml-2 cursor-pointer">
                          I agree to the <Link className="underline underline-offset-2 text-blue-600">Terms & Conditions</Link> and{" "}
                          <Link className="underline underline-offset-2 text-blue-600">Shopping Policy.</Link>
                        </label>
                      </div>
                    </div>

                    <div className="md:col-span-5 text-right">
                      <button
                        disabled={!isChecked}
                        className="bg-blue-500 hover:bg-blue-700 text-white cursor-pointer font-bold py-2 px-4 rounded"
                      >
                        Place an Order
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
