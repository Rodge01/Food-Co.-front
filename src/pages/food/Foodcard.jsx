import PropTypes from 'prop-types';  // Import PropTypes
import { FiShoppingCart } from "react-icons/fi";
import { getImgUrl } from "../../utils/getImgUrl";
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { addtoCart } from '../../redux/features/cart/cartSlice';

const Foodcard = ({ food }) => {
  const dispatch = useDispatch();
  const handleAddToCart = (product) => {
    dispatch(addtoCart(product));
  };
  return (
    <div className={`rounded-lg transition-shadow duration-300 ${food?.status !== "Available" ? '' : 'border'}`}>
      <div className="flex flex-col sm:flex-row sm:items-start sm:h-auto sm:justify-between gap-3">
        {/* Image section */}
        <div className="sm:h-30 sm:w-40 sm:flex-shrink-0 rounded-md">
          <Link to={`/food/${food._id}`}>
            <img
              src={`${getImgUrl(food.coverImage)}`}
              alt={food.title}
              className="w-full h-full object-contain p-2 rounded-md cursor-pointer hover:scale-105 transition-all duration-200"
            />
          </Link>
        </div>

        {/* Content section */}
        <div className="flex flex-col justify-between gap-2">
          <Link to={`/food/${food._id}`}>
            <h3 className="text-xl font-semibold hover:text-blue-600 mb-3">{food?.title}</h3>
          </Link>
          <p className="text-gray-600 mb-5">
            {food?.description.length > 80 ? `${food.description.slice(0, 80)}...` : food?.description}
          </p>
          <p className="font-medium mb-5">
            ₱{food?.newPrice}
            <span className="line-through font-normal ml-2">₱{food?.oldPrice}</span>
          </p>
         
          <p className={`font-medium mb-5 ${food?.status !== "Available" ? 'text-red-500' : 'text-green-500'}`}>
            {food?.status === "Available" ? 'Available' : 'Not Available'}
          </p>
          <div className="text-green-600 text-xs font-medium mb-4">
              🎉Discount if the Quantity is Over 5!
            </div>  
          <div className="text-green-600 text-xs font-medium mb-4">
              🎉 Free shipping on orders over ₱150!
            </div>     
          {food?.status === "Available" && (
            <button
              onClick={() => handleAddToCart(food)}
              className="btn-primary px-6 py-2 space-x-1 flex items-center justify-center gap-0 "
            >
              <FiShoppingCart />
              <span>Add to Cart</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

Foodcard.propTypes = {
  food: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    coverImage: PropTypes.string.isRequired,
    newPrice: PropTypes.number.isRequired,
    oldPrice: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
};

export default Foodcard;
