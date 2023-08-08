// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default () => {
  return (
    <></>
    // <Swiper
    //   // effect={'coverflow'}
    //   grabCursor={true}
    //   centeredSlides={true}
    //   loop={true}
    //   slidesPerView={'auto'}
    //   coverflowEffect={{
    //     rotate: 0,
    //     stretch: 0,
    //     depth: 50,
    //     modifier: 2.5,
    //   }}
    //   pagination={{ el: '.swiper-pagination', clickable: true }}
    //   navigation={{
    //     nextEl: '.swiper-button-next',
    //     prevEl: '.swiper-button-prev',
    //     // clickable: true,
    //   }}
    //   modules={[EffectCoverflow, Pagination, Navigation]}
    //   className="swiper_container"
    // >
    //   <SwiperSlide>Slide 1</SwiperSlide>
    //   <SwiperSlide>Slide 2</SwiperSlide>
    //   <SwiperSlide>Slide 3</SwiperSlide>
    //   <SwiperSlide>Slide 4</SwiperSlide>
    //   <div className="slider-controler">
    //     <div className="swiper-button-prev slider-arrow">
    //       {/* <ion-icon name="arrow-back-outline"></ion-icon> */}
    //       back
    //     </div>
    //     <div className="swiper-button-next slider-arrow">
    //       {/* <ion-icon name="arrow-forward-outline"></ion-icon> */}
    //       next
    //     </div>
    //     <div className="swiper-pagination"></div>
    //   </div>
    // </Swiper>
  );
};
