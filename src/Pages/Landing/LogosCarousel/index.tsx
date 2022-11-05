import { type ReactElement } from 'react';
import { useTheme } from 'styled-components';
import { Box, Carousel, ErrorMsg } from 'components/common';
import { useLogos } from 'hooks';
import Skeleton from 'components/Skeleton';
import LogoContainer from './LogoContainer';

export default function LogosCarousel(): ReactElement {
  const { logos, isError, isLoading } = useLogos();
  const { primary } = useTheme();

  if (isError) return <ErrorMsg>something went wrong!</ErrorMsg>;

  if (isLoading) return <Skeleton number={1} height={8} width={100} mt={0} px={0} />;

  return (
    <Box>
      <Carousel Component={LogoContainer} bgColor={primary}>
        {logos}
      </Carousel>
    </Box>
  );
}
