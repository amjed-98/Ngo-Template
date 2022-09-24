import styled from 'styled-components'
import { Carousel } from 'components/common'
import ImageContainer from './ImageContainer'

interface IProps {
  images: {
    id: string;
    img_url: string;
  }[];
}

function ImageCarousel({ images }: IProps) {
  return (
    <Section>
      <Carousel Component={ImageContainer}>
        {images}
      </Carousel>

      <Triangle />
    </Section>
  )
}

export default ImageCarousel

const Section = styled.section`
  position: relative;
`

const Triangle = styled.div`
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translate(-50%, 99%);
  border: 2.2rem solid transparent;
  border-top: 2.2rem solid ${({ theme }) => theme.primary};
`
