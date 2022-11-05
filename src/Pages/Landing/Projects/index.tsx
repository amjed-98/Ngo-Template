import { type ReactElement } from 'react';
import styled from 'styled-components';
import { useProjects } from 'hooks';
import { Carousel } from 'components/common';
import ProjectCardSkeleton from 'components/Skeleton';
import Project from './Project';

export default function Projects(): ReactElement {
  const { isLoading, projects } = useProjects();

  if (isLoading) return <ProjectCardSkeleton number={3} width={25} height={37} />;

  return (
    <Section id='causes'>
      <Carousel Component={Project}>{projects}</Carousel>
    </Section>
  );
}

const Section = styled.section`
  padding: 4rem;
`;
