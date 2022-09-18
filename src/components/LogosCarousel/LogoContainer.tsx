import { type FC } from 'react'
import { Box, Flex, Image } from '../common'

type TProps = {
  logo: string;
};

const LogoContainer: FC<TProps> = ({ logo }) => (
  <Flex py={1.5} px={1.5} justify="space-around">
    <Box>
      <Image src={logo} alt="logo" maxHeight="8rem" />
    </Box>
  </Flex>
)

export default LogoContainer
