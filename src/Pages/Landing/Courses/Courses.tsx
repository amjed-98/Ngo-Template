import { type ReactElement } from 'react'
import { RenderIf } from 'components'
import { Box, Carousel, SectionTitle } from 'components/common'
import { useAppSelector, useFetch } from 'hooks'
import { getCoursesURL } from 'api/getApiServices'
import CourseCardSkeleton from 'components/Skeleton'
import { ICourse } from 'types/interfaces'
import CourseCard from './CourseCard'

function Courses(): ReactElement {
  const ongId = useAppSelector(({ ong }) => ong.ongId) || ''

  const {
    data: events = [], isLoading
  } = useFetch<ICourse[]>(getCoursesURL(ongId), ['courses'], ongId)

  return (
    <Box id="courses" px={4.1} mt={4}>
      <SectionTitle padding={0}>Courses</SectionTitle>

      <RenderIf if={isLoading}>
        <CourseCardSkeleton number={2} width={45} height={14} justify="center" />
      </RenderIf>

      <Carousel Component={CourseCard} slidesPerView={2}>
        {events.filter((event) => event.course)}
      </Carousel>
    </Box>
  )
}

export default Courses
