import { type ReactElement } from 'react'
import { useTheme } from 'styled-components'
import {
  Box, Carousel, ErrorMsg
} from '../common'
import { useAppSelector, useFetch } from '../../hooks'
import { getOngLogos } from '../../api/getApiServices'
import Skeleton from '../Skeleton'
import LogoContainer from './LogoContainer'

interface ILogo {
  id: string
  logo:string;
}

export default function LogosCarousel(): ReactElement {
  const ongId = useAppSelector(({ ong }) => ong.ongId) || ''
  const {
    data: logos = [], isLoading, isError,
  } = useFetch<ILogo[]>(getOngLogos(ongId), ['logos'], ongId)

  const { primary } = useTheme()

  if (isError) return <ErrorMsg>something went wrong!</ErrorMsg>

  if (isLoading) return <Skeleton number={1} height={8} width={100} mt={0} px={0} />

  return (
    <Box>
      <Carousel Component={LogoContainer} bgColor={primary}>
        {logos}
      </Carousel>
    </Box>
  )
}
