
import Foodcard from '../food/Foodcard'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useFetchAllFoodsQuery } from '../../redux/features/Foods/foodsApi';




const Recommend = () => {
      const {data: Foods = []} = useFetchAllFoodsQuery();
  return (
    <div className="py-16">
      <h2 className="text-3x1 font-semibold mb-6">Recommend</h2>
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
            Foods.length > 0 && Foods.slice(0,5).map((food, index)=> (
              <SwiperSlide key={index}>
                 <Foodcard  food={food}/>
              </SwiperSlide>
              
            ))
        }
      </Swiper>
    </div>
  );
}

export default Recommend;
