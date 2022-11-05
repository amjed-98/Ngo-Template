import { useMemo } from 'react';
import { Footer, Navbar, Skeleton, RenderIf } from 'components';
import { Flex, SectionTitle, Text } from 'components/common';
import { useProducts } from 'hooks';
import { ProductCard } from './ProductCard';

function Shop() {
  const { products, isLoading } = useProducts();

  const memoizedProducts = useMemo(
    () => products?.map((product) => <ProductCard key={product.id} {...product} />),
    [products],
  );
  return (
    <>
      <Navbar />

      <SectionTitle textAlign='center'>Shop</SectionTitle>
      <Text fontSize={1.5} textAlign='center'>
        Buy our products and help us to continue our work
      </Text>

      <Flex gap={3} px={9} py={4}>
        <RenderIf if={isLoading}>
          <Skeleton width={14} height={15} number={8} />
        </RenderIf>

        {memoizedProducts}
      </Flex>

      <Footer />
    </>
  );
}

export default Shop;
