import type { FC } from 'react';
import styled from 'styled-components';
import { Progress } from 'antd';
import { SectionTitle, Link, Box } from 'components/common';
import { usePremiumSection } from 'hooks';
import HTMLReactParser from 'html-react-parser';
import { useTranslation } from 'react-i18next';
import Modal from 'components/Modal';
import ProjectDonateForm from 'components/Forms/ProjectDonateForm';
import RenderIf from 'components/RenderIf';
import { CalendarIcon } from 'components/Icons';
import BuyEventForm from 'components/Forms/BuyEventForm';
import BuyCourseForm from 'components/Forms/BuyCourseForm';

const PremiumSection: FC = () => {
  const { t } = useTranslation();

  const {
    premiumSection: {
      premiumEvent: {
        id: eventId = '',
        title: eventTitle = '',
        description: eventDesc = '',
        imageURL: eventImage,
        course,
        EventTickets = [],
        price = 0,
      } = {},
      premiumProject: {
        id: projectId = '',
        title: projectTitle = '',
        description: projectDesc = '',
        imageURL: projectImage,
        donated = 0,
        amount = 1,
      } = {},
    },
    isPremiumSection,
  } = usePremiumSection();

  if (!isPremiumSection) return null;

  const title = projectTitle || eventTitle;
  const description = (projectDesc || eventDesc).slice(0, 120);
  const bgImage =
    projectImage || eventImage || 'https://i.pinimg.com/originals/9b/96/92/9b9692c9f0db9f6276e6bd29a98c25e0.png';
  const sectionName = eventId && <p>{course ? t('Courses') : t('Events')}</p>;
  const Form = (eventId &&
    (course ? (
      <BuyCourseForm courseId={eventId} />
    ) : (
      <BuyEventForm event={{ EventTickets, price, id: eventId }} />
    ))) || <ProjectDonateForm projectId={projectId} />;

  return (
    <Section bgImage={bgImage}>
      <SectionDetail>
        <Header>
          <SectionImage src='https://picsum.photos/200' alt='event' />
          {sectionName}
        </Header>
        <SectionTitle fontSize={2.8} padding={0} marginTop={0} marginBottom={0}>
          {title}
        </SectionTitle>
        <EventDescription>{HTMLReactParser(description)}</EventDescription>
        <Link align='left' to='' color='blue' underlined>
          Read more
        </Link>
      </SectionDetail>

      <RenderIf if={!!projectId}>
        <IconSection>
          <ProgressContainer>
            <CustomProgress
              type='circle'
              showInfo
              percent={(donated / amount) * 100}
              strokeWidth={2}
              trailColor='none'
              width={250}
            />
            <Donated>Donated</Donated>
          </ProgressContainer>

          <Modal btnText={t('Donate Now')} title={`Donate to ${title}`}>
            {Form}
          </Modal>
        </IconSection>
      </RenderIf>

      <RenderIf if={!!eventId}>
        <IconSection>
          <Box>
            <CalendarIcon size='10rem' date={new Date('startTime').getDate()} />
          </Box>
          <Modal
            title={`${t('Buy')} ${course ? t('Courses') : t('Tickets available')}`}
            btnText={course ? 'attend' : 'buy ticket'}
          >
            {Form}
          </Modal>
        </IconSection>
      </RenderIf>
    </Section>
  );
};

export default PremiumSection;

const Section = styled.section<{ bgImage: string }>`
  display: flex;
  justify-content: space-between;
  padding: 4rem 4.1rem;
  padding-right: 9.2rem;
  gap: 4rem;
  align-items: flex-start;
  margin-block: 6.2rem;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.5) 100%),
    url(${({ bgImage }) => bgImage}) no-repeat center center;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0;
    text-align: center;

    & > :first-child {
      text-align: center;

      img {
        align-self: center;
      }
    }

    & > :last-child {
      text-align: center;
      padding: 0;
    }
  }
`;

const Header = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1.4rem;
  p {
    font-size: 2rem;
    font-weight: 600;
    line-height: 1.2;
    color: white;
  }
`;
const SectionImage = styled.img`
  width: 50px;
`;

const SectionDetail = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1.2rem;
  height: 100%;
`;

const EventDescription = styled.p`
  color: ${({ theme }) => theme.secondary};
  line-height: 1.8;
  font-size: 1.2rem;
  margin-top: 1.4rem;
  padding-right: 4rem;

  @media (max-width: 768px) {
    padding-inline: 4.1rem;
  }
`;
const IconSection = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  gap: 3.8rem;
  align-items: center;
  height: 100%;
  padding-left: 9.2rem;
`;
const ProgressContainer = styled.div`
  position: relative;
`;
const CustomProgress = styled(Progress)`
  .ant-progress-inner {
    font-weight: bold;
  }
`;
const Donated = styled.p`
  position: absolute;
  bottom: 4.2rem;
  color: ${({ theme }) => theme.primary} !important;
  left: 50%;
  bottom: 12%;
  font-size: 1.4rem;
  font-weight: bold;
  text-decoration: none !important;
  transform: translateX(-50%);
`;
