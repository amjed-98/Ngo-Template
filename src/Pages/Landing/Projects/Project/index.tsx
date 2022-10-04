import { type ReactElement } from 'react';
import styled from 'styled-components';
import { Text, Image, Flex, Link } from 'components/common';
import DonateForm from 'components/Forms/DonateForm';
import Modal from 'components/Modal';
import { useFormSubmit, useNgoConfig } from 'hooks';
import { getStartProjectDonationUrl } from 'api/postApiServices';
import { donationSchema } from 'validation/schemas';
import { type TypeOf } from 'yup';

type TFormSubmitData = TypeOf<typeof donationSchema>;

interface ProjectProps {
  imageURL: string;
  title: string;
  id: string;
}

function Project({ imageURL, title, id }: ProjectProps): ReactElement {
  const { ngoId } = useNgoConfig();
  const { submit, ...states } = useFormSubmit<TFormSubmitData, true>({
    url: getStartProjectDonationUrl(ngoId),
    redirectPath: 'causes',
  });

  const handleSubmit = (data: TFormSubmitData) => {
    const donationInfo = { ...data, ong_id: ngoId };

    submit(donationInfo);
  };

  return (
    <ProjectCard>
      <Image src={imageURL} alt='' />
      <Text fontSize={1.1} px={1} color='white'>
        {title}
      </Text>

      <ProjectFooter>
        <Link size={1} to={`causes/${id}`} underlined>
          Read more
        </Link>

        <Modal btnText='Donate' title={`Donate to ${title}`}>
          <DonateForm projectId={id} submitHandler={handleSubmit} states={states} />
        </Modal>
      </ProjectFooter>
    </ProjectCard>
  );
}

export default Project;

const ProjectCard = styled(Flex)`
  flex: 1;
  height: 50rem;
  border: 1px solid #ccc;
  overflow: hidden;
  flex-direction: column;
  justify-content: flex-end;
  align-items: stretch;
  text-align: left;

  img {
    position: absolute;
    z-index: -1;
    filter: brightness(0.5);
  }
`;

const ProjectFooter = styled(Flex)`
  padding: 1.2rem;
  @media (max-width: 768px) {
    button {
      font-size: 1rem;
      padding: 0.6rem 0.7rem;
    }
  }
`;
