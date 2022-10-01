import { type FC } from 'react'
import styled from 'styled-components'
import HtmlParser from 'html-react-parser'
import { Footer, Navbar } from 'components'
import { useAllPlatformConfig } from 'hooks'
import { Box, Image } from 'components/common'

const Aboutus:FC = () => {
  const {
    description: {
      description = '',
      title_description: titleDesc,
      img_url: imgUrl
    } = {}
  } = useAllPlatformConfig()

  return (
    <>
      <Navbar />
      <Container>
        <PageTitle>{titleDesc}</PageTitle>
        <Box fontSize={1.2} lineHeight={1.8} color="#999" mt={2.2}>
          {HtmlParser(description)}
        </Box>
        <Image src={imgUrl} alt="About us 1" />

      </Container>
      <Footer />
    </>
  )
}

export default Aboutus

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    width: 75%;
    margin: auto;
    justify-content: center;
    align-items: center;
    margin-top: 4.2rem;
`

const PageTitle = styled.h1`
    font-size: 2.4rem;
    font-weight: bold;
    color: ${({ theme }) => theme.primary};
    
`
