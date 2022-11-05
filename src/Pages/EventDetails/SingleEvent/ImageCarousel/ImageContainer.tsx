import { type FC } from 'react';
import { Box, Image } from 'components/common';

const ImageContainer: FC<TEventImage> = ({ img_url }) => (
  <Box maxHeight='420px' width='817px'>
    <Image src={img_url} />
  </Box>
);

export default ImageContainer;
