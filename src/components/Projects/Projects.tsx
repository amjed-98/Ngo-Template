import { type ReactElement } from 'react'
import styled from 'styled-components'
import { getProjectsURL } from '../../api/getApiServices'
import { useAppSelector, useFetch } from '../../hooks'
import { IProject } from '../../types/interfaces'
import { Carousel } from '../common'
import ProjectCardSkeleton from '../Skeleton'
import { Project } from './Project/Project'

export default function Projects(): ReactElement {
  const ongId = useAppSelector(({ ong }) => ong.ongId) || ''

  const {
    data: projects = [], isLoading
  } = useFetch<IProject[]>(getProjectsURL(ongId), ['projects'], ongId)

  if (isLoading) return <ProjectCardSkeleton number={3} width={25} height={37} />

  return (
    <Section id="causes">
      <Carousel Component={Project}>
        {projects}
      </Carousel>
    </Section>
  )
}

const Section = styled.section`
  padding: 4rem;
  `
