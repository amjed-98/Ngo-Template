import { type FC } from 'react'
import { LinkedinFilled } from '@ant-design/icons'
import styled from 'styled-components'
import { Card } from 'components/common'

const VolunteerCard: FC<TTeam> = ({
  name, position, img_url: imgUrl, linkedin
}: TTeam) => (

  <VolunteerCards>
    <CustomCard mode="column" smMode="column" pb={1.5} textAlign="center">
      <VolunteerImage src={imgUrl} alt="Volunteer" />
      <VolunteerName>{name}</VolunteerName>
      <VolunteerPosition>{position}</VolunteerPosition>
      <LinkedinIcon onClick={() => window.open(linkedin)} />
    </CustomCard>
  </VolunteerCards>
)

export default VolunteerCard

const VolunteerImage = styled.img`
  height: 180px;
  object-fit: cover;
  object-position: center;

  @media screen and (max-width: 768px) {
    width: 100% !important;
    height: auto;
  }
`
const VolunteerName = styled.p`
  font-size: 1.1rem;
  margin-top: 1.2rem;
  margin-bottom: 0;
`
const VolunteerPosition = styled.p`
  margin-top: 0.4rem;
  font-size: 1rem;
  font-weight: 300;
`
const CustomCard = styled(Card)`
  width: 378px;
  height: 387px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media screen and (max-width: 768px) {
    height: 250px;
  }

  @media screen and (max-width: 420px) {
    height: 150px;
  }
`
const LinkedinIcon = styled(LinkedinFilled)`
  font-size: 2rem;
  cursor: pointer;
  align-self: center;
  transition: all 0.3s ease-in-out;
  color: ${({ theme }) => theme.secondary};

  &:hover {
    color: ${({ theme }) => theme.primary};
  }
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
