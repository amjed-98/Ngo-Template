import { type FC } from 'react';
import styled from 'styled-components';
import { Image } from 'components/common';

const ImageContainer: FC<TProjectImage> = ({ img_url }) => (
  <ImageWrapper>
    <Image src={img_url} alt='project' />
  </ImageWrapper>
);

export default ImageContainer;

const ImageWrapper = styled.div`
  width: 100%;
  max-height: 40rem;
`;
