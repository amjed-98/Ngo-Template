import { type ReactElement } from 'react'
import styled from 'styled-components'
import { Carousel } from 'components/common'
import { useAllPlatformConfig } from 'hooks'
import VolunteerCard from './VolunteerCard'

export default function Volunteers(): ReactElement {
  const { team: volunteers = [] } = useAllPlatformConfig()

  return (
    <VolunteersSection id="volunteers">
      <SectionTitle>
        Our Team
      </SectionTitle>
      <Carousel Component={VolunteerCard}>
        {[...volunteers]}
      </Carousel>
    </VolunteersSection>
  )
}

const VolunteersSection = styled.section`
  text-align: center;
  margin-top: 10.2rem;
  padding: 0 4.1rem;
`
const SectionTitle = styled.h1`
  font-size: 2.1rem;
  font-weight: bold;
  margin-bottom: 0;
`
