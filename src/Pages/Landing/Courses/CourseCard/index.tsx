import moment from 'moment';
import HtmlParser from 'html-react-parser';
import { CalendarIcon } from 'components/Icons';
import { Box, Card, Flex, Image, Link } from 'components/common';

function CourseCard({ imageURL, title, description, id, start_time }: TCourse) {
  const date = Number(moment(start_time).format('D'));

  return (
    <Card mode='row' smMode='column' my={0.5} p={1} maxWidth='45rem'>
      <Box height={14.5}>
        <CalendarIcon date={date} type='filled' size='4em' position='absolute' top={-1.23} right={1.5} />
        <Image src={imageURL} alt={title} width='800px' />
      </Box>
      <Flex direction='column' justify='space-between' p={1} textAlign='left'>
        <h2>{title?.slice(0, 23)}</h2>
        {HtmlParser(description?.slice(0, 100))}
        <Link to={`/courses/${id}`} align='flex-end' underlined size={1.3}>
          Read more
        </Link>
      </Flex>
    </Card>
  );
}

export default CourseCard;
