
import { FiShoppingCart } from "react-icons/fi";
import { getImgUrl } from "../../utils/getImgUrl";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { addtoCart } from '../../redux/features/cart/cartSlice';
import { useFetchFoodByIdQuery } from "../../redux/features/Foods/foodsApi";


const SingleFood = () => {
    const dispatch = useDispatch();
  const handleAddToCart = (product) =>{
    dispatch(addtoCart(product))
  }
    const {id} = useParams();
    const {data: food, isLoading, isError} = useFetchFoodByIdQuery(id);

    if(isLoading) return <div>Loading...</div>
    if(isError) return <div>Error to load Food Info</div>
  return (
    <div className="max-w-lg shadow-md p-5">
            <h1 className="text-2xl font-bold mb-6">{food.title}</h1>
        {/* Image section */}
        <div className="">
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
            <h3 className="text-2xl font-semibold hover:text-blue-600 mb-3">{food?.title}</h3>
          </Link>
          <p className="text-gray-600 mb-5">
            {food?.description.length > 80 ? `${food.description.slice(0, 80)}...` : food?.description}
          </p>
          <p className="font-medium mb-5">
            ${food?.newPrice}
            <span className="line-through font-normal ml-2">${food?.oldPrice}</span>
          </p>
          <button  onClick={()=> handleAddToCart(food)}
          className="btn-primary px-6 py-2 space-x-1 flex items-center justify-center gap-0">
            <FiShoppingCart className="" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
  );
}

export default SingleFood;
