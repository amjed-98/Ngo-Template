import type { ReactElement, SyntheticEvent } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { BookmarkIcon } from 'components/Icons';
import { Flex, Image, Text } from 'components/common';
import { useNgoConfig } from 'hooks';
import { IProductCard } from 'types/interfaces';
import { RenderIf } from 'components';

export function ProductCard({
  id,
  title,
  price,
  default_img: img,
  discount,
}: IProductCard): ReactElement {
  const { currency } = useNgoConfig();
  const navigate = useNavigate();
  const navigateTo = (path: `/products/${string}`) => () => navigate(path);

  const handleBrokenImage = (e: SyntheticEvent<HTMLImageElement>) => {
    const fallBackImage =
      'https://i.pinimg.com/originals/9b/96/92/9b9692c9f0db9f6276e6bd29a98c25e0.png';
    (e.target as HTMLImageElement).src = fallBackImage;
  };
  return (
    <SingleProductCard onClick={navigateTo(`/products/${id}`)}>
      <ProductImage>
        <Image src={img} alt={title} onError={handleBrokenImage} />
      </ProductImage>
      <Flex wrap='nowrap' py={0.4} px={0.8} align='flex-start'>
        <P textAlign='left'>{title}</P>
        <P textAlign='end'>
          {price.toFixed(2)} {currency}
        </P>
      </Flex>

      <RenderIf if={!!discount}>
        <BookmarkIcon position='absolute' top={0} right={0} text={`${discount}`} />
      </RenderIf>
    </SingleProductCard>
  );
}

const ProductImage = styled.div`
  width: 100%;
  height: 230px;
`;
const SingleProductCard = styled.div`
  width: 300px;
  height: 340px;
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);

  &:hover {
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  }
`;

const P = styled(Text)`
  font-weight: bold;
  color: #777777;
`;
