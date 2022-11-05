import { Progress } from 'antd';
import styled, { useTheme } from 'styled-components';
import { Modal, ProjectDonateForm } from 'components';
import { Button, Card, Flex, Text } from 'components/common';

type Props = {
  project: SnakeToCamelCase<TProject>;
};

export function ProjectCard({ project }: Props) {
  const { id, title, donated = 0, amount = 1 } = project;
  const { primary } = useTheme();

  const donationProgress = +((donated / amount) * 100).toFixed();
  const donateBtnText = donationProgress >= 100 ? 'Filled!' : 'Donate';

  return (
    <Card mode='column' p={2.5} maxWidth='400px' smMode='column' m='1rem'>
      <Title title={title}>{title.slice(0, 15)}</Title>
      <ProgressBar>
        <Progress percent={donationProgress} strokeColor={primary} />
        <ProgressPercents percent={donationProgress}>%{donationProgress}</ProgressPercents>
      </ProgressBar>
      <Text weight='bold'>
        Goal <br />${amount}
      </Text>
      <Flex gap={1}>
        <Button px={1.8} py={0.8}>
          Share
        </Button>
        <Modal btnText={donateBtnText}>
          <ProjectDonateForm projectId={id} />
        </Modal>
      </Flex>
    </Card>
  );
}

const ProgressBar = styled.div`
  position: relative;
  margin-top: 1.5rem;
`;

const ProgressPercents = styled.span<{ percent: number }>`
  position: absolute;
  top: -60%;
  left: ${({ percent }) => `${percent}%`};
  transform: translate(-50%, -50%);
  font-size: 0.9rem;
  font-weight: bold;
  color: white;
  background: ${({ theme }) => theme.primary};
  padding: 0.1rem 0.6rem;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;
