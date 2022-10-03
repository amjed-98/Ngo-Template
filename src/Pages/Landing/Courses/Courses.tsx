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

  const courses: [course: ICourse, course?: ICourse][] = events.reduce((acc, cur, i) => {
    if (!cur.course) return acc

    if (i % 2 === 0) {
      acc.push([cur])
    } else {
      acc[acc.length - 1].push(cur)
    }

    return acc
  }, [] as [course: ICourse, course?: ICourse][])

  return (
    <Box id="courses" px={4.1} mt={4}>
      <SectionTitle padding={0}>Courses</SectionTitle>

      <RenderIf if={isLoading}>
        <CourseCardSkeleton number={2} width={45} height={14} justify="center" />
      </RenderIf>

      <Carousel Component={CourseCard} slidesPerView={1}>
        {courses}
      </Carousel>
    </Box>
  )
}

export default Courses
