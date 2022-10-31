import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';


import React from 'react'

function Slider({ children, slidesPerView = 1, spaceBetween = 50 }) {
  return (
    <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={spaceBetween}
      slidesPerView={slidesPerView}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
    >
        {
            React.Children.map(children, (child) =><SwiperSlide>{ child }</SwiperSlide>)
        }
    </Swiper>
  )
}

export default Slider