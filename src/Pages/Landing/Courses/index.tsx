import { type ReactElement } from 'react'
import { RenderIf } from 'components'
import { Box, Carousel, SectionTitle } from 'components/common'
import { useCourses } from 'hooks'
import CourseCardSkeleton from 'components/Skeleton'
import { ICourse } from 'types/interfaces'
import CourseCard from './CourseCard'

function Courses(): ReactElement {
  const {
    courses, isLoading, isError
  } = useCourses()

  const formattedCourses: [course: ICourse, course?: ICourse][] = courses.reduce((acc, cur, i) => {
    if (i % 2 === 0) {
      acc.push([cur])
    } else {
      acc[acc.length - 1].push(cur)
    }

    return acc
  }, [] as [course: ICourse, course?: ICourse][])

  if (isError) return <></>

  return (
    <Box id="courses" px={4.1} mt={4}>
      <SectionTitle padding={0}>Courses</SectionTitle>

      <RenderIf if={isLoading}>
        <CourseCardSkeleton number={2} width={45} height={14} justify="center" />
      </RenderIf>

      <Carousel Component={CourseCard} slidesPerView={1}>
        {formattedCourses}
      </Carousel>
    </Box>
  )
}

export default Courses
