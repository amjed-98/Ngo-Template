import { type ReactElement } from 'react';
import styled from 'styled-components';
import { Text, Image, Flex, Link } from 'components/common';
import Modal from 'components/Modal';
import ProjectDonateForm from 'components/Forms/ProjectDonateForm';

type Props = TProject;

function Project({ imageURL, title, id }: Props): ReactElement {
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
          <ProjectDonateForm projectId={id} />
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
