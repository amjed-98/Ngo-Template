import { Progress } from 'antd';
import { type TypeOf } from 'yup';
import styled, { useTheme } from 'styled-components';
import { Modal, DonateForm } from 'components';
import { getStartProjectDonationUrl } from 'api/postApiServices';
import { Button, Card, Flex, Text } from 'components/common';
import { useNgoConfig, useFormSubmit } from 'hooks';

import { donationSchema } from 'validation/schemas';

type TFormSubmitData = TypeOf<typeof donationSchema>;

interface IProps {
  project: {
    id: string;
    title: string;
    donated: number;
    amount: number;
  };
}

export function ProjectCard({ project }: IProps) {
  const { id, title, donated = 0, amount = 1 } = project;
  const { ngoId } = useNgoConfig();
  const { primary } = useTheme();

  const { submit, ...states } = useFormSubmit<TFormSubmitData, true>({
    url: getStartProjectDonationUrl(ngoId),
    redirectPath: 'causes',
  });

  const handleSubmit = (values: TFormSubmitData) => {
    const donationInfo = { ...values, project_id: id, ong_id: ngoId };

    submit(donationInfo);
  };

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
          <DonateForm submitHandler={handleSubmit} projectId={id} states={states} />
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
