import type { JSXElementConstructor, ReactElement } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'

import { Navigation, Autoplay } from 'swiper'

type TProps = {
  children: any[];
  spaceBetween?: number;
  slidesPerView?: number;
  loop?: boolean;
  autoplay?: boolean;
  bgColor?: TBgColor;
  Component: JSXElementConstructor<any>;
};

function Carousel(props: TProps): ReactElement {
  const {
    children, spaceBetween, slidesPerView, loop, autoplay, Component, bgColor,
  } = props

  return (
    <Swiper
      spaceBetween={spaceBetween}
      modules={[Navigation, Autoplay]}
      grabCursor
      loop={loop}
      autoplay={autoplay && { delay: 5000, disableOnInteraction: false }}
      slidesPerView={slidesPerView}
      style={{ backgroundColor: bgColor }}
      className="mySwiper"
    >
      {children?.map((child) => (
        <SwiperSlide key={child.id}>
          <Component {...child} />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
export default Carousel

Carousel.defaultProps = {
  spaceBetween: 30,
  slidesPerView: 3,
  loop: false,
  autoplay: true,
  bgColor: 'initial',
}
