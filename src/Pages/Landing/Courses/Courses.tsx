import { type ReactElement } from 'react'
import { RenderIf } from 'components'
import { Box, Carousel, SectionTitle } from 'components/common'
import { useFetch, useNgoConfig } from 'hooks'
import { getCoursesURL } from 'api/getApiServices'
import CourseCardSkeleton from 'components/Skeleton'
import { ICourse } from 'types/interfaces'
import CourseCard from './CourseCard'

function Courses(): ReactElement {
  const { ngoId } = useNgoConfig()

  const {
    data: events = [], isLoading
  } = useFetch<ICourse[]>(getCoursesURL(ngoId), ['courses'], ngoId)

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
