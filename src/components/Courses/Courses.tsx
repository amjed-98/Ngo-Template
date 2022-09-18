import { type ReactElement } from 'react'
import CourseCard from './CourseCard/CourseCard'
import { Box, Carousel, SectionTitle } from '../common'
import { useAppSelector, useFetch } from '../../hooks'
import { getCoursesURL } from '../../api/getApiServices'
import CourseCardSkeleton from '../Skeleton'
import { ICourse } from '../../types/interfaces'

function Courses(): ReactElement {
  const ongId = useAppSelector(({ ong }) => ong.ongId) || ''

  const {
    data: events = [], isLoading
  } = useFetch<ICourse[]>(getCoursesURL(ongId), ['courses'], ongId)

  return (
    <Box id="courses" px={4.1} mt={4}>
      <SectionTitle padding={0}>Courses</SectionTitle>
      {isLoading && <CourseCardSkeleton number={2} width={45} height={14} justify="center" />}

      <Carousel Component={CourseCard} slidesPerView={2}>
        {events}
      </Carousel>
    </Box>
  )
}

export default Courses
