import type { ReactElement } from 'react'
import { Carousel } from 'components/common'
import Skeleton from 'components/Skeleton'
import ImageContainer from './ImageContainer'

interface IProps {
  images: { id: string; img_url: string }[];
  isLoading?: boolean;
}

export function EventCarousel({ images, isLoading }: IProps): ReactElement {
  if (isLoading) return <Skeleton width={25} height={27} number={1} />

  return (
    <Carousel Component={ImageContainer}>
      {images}
    </Carousel>
  )
}

EventCarousel.defaultProps = {
  isLoading: false,
}
