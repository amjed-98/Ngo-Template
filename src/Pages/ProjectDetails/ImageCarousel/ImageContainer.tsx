import { type FC } from 'react';
import styled from 'styled-components';
import { Image } from '../../../components/common';

type TProps = {
  imgUrl: string;
};

const ImageContainer: FC<TProps> = ({ imgUrl }) => (
  <ImageWrapper>
    <Image src={imgUrl} alt='project' />
  </ImageWrapper>
);

export default ImageContainer;

const ImageWrapper = styled.div`
  width: 100%;
  max-height: 40rem;
`;
