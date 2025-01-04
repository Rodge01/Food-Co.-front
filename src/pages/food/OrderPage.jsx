import { useGetOrderByEmailQuery, useDeleteOrdersByEmailMutation } from '../../redux/features/orders/orderApis'; // Import the delete mutation
import { useAuth } from '../../context/AuthContext';

const OrderPage = () => {
  const { currentUser } = useAuth();
  
  // Fetch orders using the query
  const { data: orders = [], isLoading, isError } = useGetOrderByEmailQuery(currentUser.email);
  
  // Mutation to delete orders
  const [deleteOrders, { isLoading: isDeleting, isError: deleteError }] = useDeleteOrdersByEmailMutation();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error Getting Order Data</div>;

  // Handle clearing order history
  const handleDeleteOrders = async () => {
    try {
      await deleteOrders(currentUser.email);
      alert('Your order history has been cleared.');
    } catch (error) {
      alert('Failed to delete orders.', error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">Order History</h2>
      
      {/* Delete Button */}
      <button
        onClick={handleDeleteOrders}
        disabled={isDeleting}
        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 mb-6"
      >
        {isDeleting ? 'Deleting...' : 'Clear Order History'}
      </button>

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

export default OrderPage;
