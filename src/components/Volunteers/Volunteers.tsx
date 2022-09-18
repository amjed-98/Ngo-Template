import { type ReactElement } from 'react'
import styled from 'styled-components'
import VolunteerCard from './VolunteerCard/VolunteerCard'
import { useAppSelector } from '../../hooks'
import { Carousel } from '../common'

export default function Volunteers(): ReactElement {
  const members = useAppSelector((state) => state.ong.ongConfig?.team)

  return (
    <VolunteersSection id="volunteers">
      <SectionTitle>
        Our Team
      </SectionTitle>
      <Carousel Component={VolunteerCard}>
        {members as any[]}
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
