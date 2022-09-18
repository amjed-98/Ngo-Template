import { type FC } from 'react'
import { Box, Image } from '../common'

type TProps = {
  img_url: string;
};

const ImageContainer: FC<TProps> = ({ img_url }) => (
  <Box maxHeight="420px" width="817px">
    <Image src={img_url} />
  </Box>
)

export default ImageContainer
