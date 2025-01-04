import { useGetAllOrdersQuery } from "../../../redux/features/orders/orderApis";

const Order = () => {
  const { data: orders = [], isLoading, isError, error } = useGetAllOrdersQuery();

  if (isLoading) return <div className="loading-screen">Loading...</div>;
  if (isError) return <div className="error-message">Error Getting Order Data: {error.message}</div>; // Display the error message

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">Transaction History</h2>
      
      {orders.length === 0 ? (
        <div className="text-center text-lg text-gray-600">No Orders Found!</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order, index) => (
            <div key={order._id} className="order-card bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 ease-in-out">
              <div className="order-header flex justify-between items-center mb-4">
                <p className="text-black font-bold text-xl"># {index + 1}</p>
              
              </div>
              
              <div className="order-details mb-4">
                <h3 className="font-semibold text-lg">Order ID: {order._id}</h3>
                <p className="text-gray-600"><strong>Name:</strong> {order.name}</p>
                <p className="text-gray-600"><strong>Email:</strong> {order.email}</p>
                <p className="text-gray-600"><strong>Phone:</strong> {order.phone}</p>
                <p className="text-gray-600"><strong>Total Price:</strong> ₱{order.totalPrice}</p>
              </div>

              <div className="address-section mb-4">
                <h4 className="font-semibold text-sm text-gray-700">Address:</h4>
                <p className="text-gray-600">{order.address.city}</p>
              </div>

              <div className="food-section mb-4">
                <h4 className="font-semibold text-sm text-gray-700">Food Ids:</h4>
                <ul className="list-disc pl-5 text-gray-600">
                  {order.foodIds.map((foodId) => (
                    <li key={foodId}>{foodId}</li>
                  ))}
                </ul>
              </div>

              <div className="order-date mb-4">
                <h4 className="font-semibold text-sm text-gray-700">Order Date:</h4>
                <p className="text-gray-600">{new Date(order.createdAt).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Order;
