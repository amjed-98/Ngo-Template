import type { JSXElementConstructor, ReactElement } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper'
import styled from 'styled-components'

type TProps<TChild extends { id: string }> = {
  children: TChild[] | [child:TChild, child?:TChild][];
  spaceBetween?: number;
  slidesPerView?: number;
  loop?: boolean;
  autoplay?: boolean;
  bgColor?: TBgColor;
  Component: JSXElementConstructor<any>;
};

function Carousel<TChild extends { id: string }>(props: TProps<TChild>): ReactElement {
  const {
    children, spaceBetween, slidesPerView, loop, autoplay, Component, bgColor
  } = props

  const Slides = children.map((child, i) => {
    if (Array.isArray(child)) {
      return (
        <VerticalSlider key={child[i]?.id || i}>
          {child.map(
            (nestedChild) => nestedChild && <Component key={nestedChild.id} {...nestedChild} />
          )}
        </VerticalSlider>
      )
    }

    return (
      <SwiperSlide key={child.id}>
        <Component {...child} />
      </SwiperSlide>
    )
  })

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
      {Slides}
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

const VerticalSlider = styled(SwiperSlide)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
