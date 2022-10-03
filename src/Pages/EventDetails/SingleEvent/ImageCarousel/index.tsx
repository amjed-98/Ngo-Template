import type { FC } from 'react';
import { Carousel } from 'components/common';
import { Skeleton } from 'components';
import { useEventImages } from 'hooks';
import ImageContainer from './ImageContainer';

type TProps = {
  eventId: string;
};

const ImageCarousel: FC<TProps> = ({ eventId }) => {
  const { images, isLoading } = useEventImages(eventId);

  if (isLoading) return <Skeleton width={25} height={27} number={1} />;

  return <Carousel Component={ImageContainer}>{images}</Carousel>;
};

export default ImageCarousel;
