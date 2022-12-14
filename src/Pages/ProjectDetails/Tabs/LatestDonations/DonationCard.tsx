import moment from 'moment';
import { type FC } from 'react';
import styled from 'styled-components';
import { Text } from 'components/common';

interface IProps {
  latestDonation: ILatestDonation;
}
const formatDate = (date: string) => moment(date).format('MM Do YYYY');

const DonationCard: FC<IProps> = ({ latestDonation }) => (
  <Section key={latestDonation.id}>
    <Flex>
      <Text fontSize={1.2}>
        {latestDonation.anonymous ? 'anonymous' : `${latestDonation.User.firstName} ${latestDonation.User.lastName}`}
      </Text>
      <Text textAlign='right'>${latestDonation.amount}</Text>
    </Flex>

    <Text fontSize={0.7} lineHeight={0} textAlign='left' color='#777777' mt={-1.5}>
      {formatDate(latestDonation.createdAt)}
    </Text>

    <Text mt={1}>{latestDonation.text}</Text>
  </Section>
);

export default DonationCard;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 3rem;
  border-radius: 15px;
  text-align: left;
  border: 1px solid #777777;
  width: 80%;
  margin-inline: 3rem;
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;
