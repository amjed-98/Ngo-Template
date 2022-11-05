import { type FC } from 'react';
import RenderIf from 'components/RenderIf';
import { Box, Carousel, ErrorMsg, SectionTitle } from 'components/common';
import { useCourses } from 'hooks';
import CourseCardSkeleton from 'components/Skeleton';
import CourseCard from './CourseCard';

const Courses: FC = () => {
  const { courses, isLoading, isError } = useCourses();

  const formatCoursesArray = (coursesArr: TCourse[]) =>
    coursesArr.reduce((acc, cur, i) => {
      if (i % 2 === 0) {
        acc.push([cur]);
      } else {
        acc[acc.length - 1].push(cur);
      }

      return acc;
    }, [] as [course: TCourse, course?: TCourse][]);

  const formattedCourses = formatCoursesArray(courses);

  if (isError) return <ErrorMsg>Something went wrong!!</ErrorMsg>;

  return (
    <Box id='courses' px={4.1} mt={4}>
      <SectionTitle padding={0}>Courses</SectionTitle>

      <RenderIf if={isLoading}>
        <CourseCardSkeleton number={2} width={45} height={14} justify='center' direction='column' />
      </RenderIf>

      <Carousel Component={CourseCard} slidesPerView={1}>
        {formattedCourses}
      </Carousel>
    </Box>
  );
};

export default Courses;
