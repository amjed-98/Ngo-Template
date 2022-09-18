import { ReactElement } from 'react'
import { Carousel } from '../common'
import Skeleton from '../Skeleton'
import ImageContainer from './ImageContainer'

interface IProps {
  imgs: { id: string; img_url: string }[];
  isLoading?: boolean;
}

export function EventCarousel({ imgs, isLoading }: IProps): ReactElement {
  if (isLoading) return <Skeleton width={25} height={27} number={1} />

  return (
    <Carousel Component={ImageContainer}>
      {imgs}
    </Carousel>
  )
}

EventCarousel.defaultProps = {
  isLoading: false,
}
