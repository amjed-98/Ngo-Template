import type { FC } from 'react';
import styled from 'styled-components';
import { Flex, Text } from 'components/common';
import Incrementor from 'components/Incrementor';

const ImpactPart: FC<TImpactData> = ({ amount, name }) => (
  <ImpactSection>
    <Text color='#fff' lineHeight={0} fontSize={4.8} weight='bolder'>
      <Incrementor end={+amount} speed={-1} Wrapper='div' />
    </Text>
    <Text color='#fff' fontSize={2} weight='200'>
      {name}
    </Text>
  </ImpactSection>
);

const ImpactSection = styled(Flex)`
  @media (max-width: 768px) {
    p:first-child {
      font-size: 2.5rem;
    }

    p:last-child {
      font-size: 1rem;
    }
  }
`;

export default ImpactPart;
