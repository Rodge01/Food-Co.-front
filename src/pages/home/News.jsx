import { Link } from "react-router-dom";
import f1 from '../../assets/Fnoc.jpg'
import f2 from '../../assets/chingchong.jpg'
import f3 from '../../assets/ear.jpg'
import f4 from '../../assets/pes.webp'
import f5 from '../../assets/haha.jpg'
 import { Swiper, SwiperSlide } from 'swiper/react';

 // Import Swiper styles
 import 'swiper/css';
 import 'swiper/css';
 import 'swiper/css/pagination';
 import 'swiper/css/navigation';
 
 import { Pagination, Navigation} from 'swiper/modules';

const news = [
    {
        "id": 1,
        "title": "𝐓𝐞𝐚𝐦 𝐏𝐇 𝐁𝐮𝐫𝐧𝐬 𝐁𝐫𝐢𝐠𝐡𝐭 𝐚𝐭 𝐭𝐡𝐞 𝐌𝟔 𝐖𝐨𝐫𝐥𝐝 𝐂𝐡𝐚𝐦𝐩𝐢𝐨𝐧𝐬𝐡𝐢𝐩𝐬",
        "description": "Hailed as the new M6 World Champions, Fnatic ONIC Philippines (FNOP) triumphed over Team Liquid Indonesia (TLID) with a leading score of 4-1. The M6 World Tournament took place at the Axiata Arena in Bukit Jalil, Kuala Lumpur, Malaysia, on December 15, 2024.",
        "image": f1
    },
    {
        "id": 2,
        "title": "China 'monster ship' spotted near Luzon",
        "description": "The Philippine Coast Guard (PCG) on Saturday evening confirmed the presence of the so-called ''monster ship'' of the China Coast Guard near Luzon.",
        "image": f2
    },
    {
        "id": 3,
        "title": "a little genius has found a way that allow everyone to legally access all the channels from our TVs (regardless of the TV model and year).",
        "description": "Once plugged in, the box will act as a satellite and allow the TV to access all the channels and streaming applications (including the most prestigious ones) Their real stroke of genius in making all this possible was the idea of buying thousands of accesses to channels and applications and then redistributing them to the boxes thanks to artificial intelligence. The AI they have developed allows all the TVs connected to the box to choose and watch any programme without waiting or interruption",
        "image": f3
    },
    {
        "id": 4,
        "title": "Peso drops back to P58:$1; PSEi gains",
        "description": "THE peso ended the first trading week of 2025 down against the dollar, but the stock market advanced with investors said to have welcomed the latest manufacturing data. The currency weakened by 29 centavos to P58.2:$1 while the Philippine Stock Exchange index (PSEi) added 53.42 points, or 0.82 percent, to close Friday at 6,603.81.",
        "image": f4
    },
    {
        "id": 5,
        "title": "Soldier who blew up Tesla at Trump hotel left note saying blast was to be a 'wake up call' for US",
        "description": "LAS VEGAS — A highly decorated Army soldier who fatally shot himself in a Tesla Cybertruck just before it blew up outside the Trump hotel in Las Vegas left notes saying the New Year's Day explosion was a stunt to serve as a wake up call for the country's ills, investigators said Friday.",
        "image": f5
    }
]
const News = () => {
  return (
    <div className='py-16'>
      <h2 className='text-3x1 font-semibold mb-6'>News</h2>
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
            slidesPerView: 2,
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
            news.map((item, index)=> (
                <SwiperSlide key={index}>
                    <div className='flex flex-col sm:flex-row sm:justify-between items-center gap-12'>
                        <div className='py-4'>
                            <Link to='/'>
                            <h3 className='text-lg font-medium hover:text-blue-500 mb-4'>{item.title}</h3>
                            </Link>
                            <div className='w-10 h-[4px] bg-primary'></div>
                            <p className='text-sm text-gray-600'>{item.description}</p>
                        </div>
                        <div /*className='flex-shrink-0'*/>
                            <img src={item.image} alt="" className='w-full object-cover'/>
                        </div>
                    </div>
                </SwiperSlide>
            ))
        }
      </Swiper>
    </div>
  );
}

export default News;
