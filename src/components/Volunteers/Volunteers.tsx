import { type ReactElement, useMemo } from 'react'
import styled from 'styled-components'
import chunk from 'lodash/chunk'
import VolunteerCard from './VolunteerCard/VolunteerCard'
import { useAppSelector } from '../../hooks'
import { Carousel } from '../common'

export default function Volunteers(): ReactElement {
  const members = useAppSelector((state) => state.ong.ongConfig?.team)
  const memoizedMembersCards = useMemo(
    () => [
      ...chunk(members, 3).map((threeMembers, i) => (
        <VolunteerCards key={threeMembers[i].id}>
          {threeMembers.map((member) => (
            <VolunteerCard {...member} key={member.id} />
          ))}
        </VolunteerCards>
      )),
    ],
    [members]
  )

  return (
    <VolunteersSection id="volunteers">
      <SectionTitle>Our Team</SectionTitle>
      <Carousel dots>{memoizedMembersCards}</Carousel>
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

const VolunteerCards = styled.div`
  display: flex !important;
  justify-content: center;
  align-items: center;
  height: 450px !important;
  padding-bottom: 2.4rem;
  gap: 4.8rem;
  margin-top: 4.8rem;
  @media screen and (max-width: 768px) {
    margin-top: 1.2rem;
    height: 250px !important;
  }
`
