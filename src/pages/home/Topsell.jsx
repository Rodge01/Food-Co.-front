import { useState } from "react";
import Foodcard from '../food/Foodcard'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useFetchAllFoodsQuery } from "../../redux/features/Foods/foodsApi";

const categories = ["Choose a Category", "Fries and Drinks", "All Fries", "Ala Carte", "Fried Siomai with Rice", "Lemonade"]
const Topsell = () => {
    const [selectedCategory, setSelectCatergory] = useState("Choose a Category");
   const {data: Foods = []} = useFetchAllFoodsQuery();
      console.log(Foods);
    const filteredFoods = selectedCategory === "Choose a Category" ? Foods: Foods.filter(food => 
      food.category.toLowerCase() === selectedCategory.toLowerCase())

  return (
    <div className="py-10">
      <h2 className="text-3x1 font-semibold mb-6">Poteto Co. Menu</h2>
      {/*left Side*/}
      <div className="mb-8 flex items-center">
        <select onChange={(e) => setSelectCatergory(e.target.value) }
         name="category" id="category" className="border bg-[#EAEAEA]
         bg-gray-180 rounded-md px-4 py-2 focus:outline-none">
            {
                categories.map((category, index)=>(
                <option key={index} value={category}>{category}</option>
                ))
            }
        </select>
      </div>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        navigation={true}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 50,
          },
          1180: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
  {
            filteredFoods.length > 0 && filteredFoods.map((food, index)=> (
              <SwiperSlide key={index}>
                 <Foodcard  food={food}/>
              </SwiperSlide>
            ))
        }
      </Swiper>
      
    </div>
  );
}

export default Topsell;
