'use client';
import { SimpleGrid, Card, Image, Text, Container, AspectRatio } from '@mantine/core';
import classes from './SportCourt.module.css';

const mockdata = [
  {
    address:'13, Duerdin St, Clayton 3168 Call: (03) 000000000',
    title: 'BC Noble Park',
    image:'https://bttc.com.au/wp-content/uploads/2020/11/clayton.jpg',
  },
  {
    title: 'BC Noble Park',
    image:'https://bttc.com.au/wp-content/uploads/2020/11/noble.jpg',
    address:'13, Duerdin St, Clayton 3168 Call: (03) 000000000',
  },
  {
    title: 'BC Noble Park',
    image:'https://bttc.com.au/wp-content/uploads/2020/11/hallam.jpg',
    address:'13, Duerdin St, Clayton 3168 Call: (03) 000000000',
  },
  {
    title: 'BC Noble Park',
    image:'https://bttc.com.au/wp-content/uploads/2020/11/triguna.jpg',
    address:'13, Duerdin St, Clayton 3168 Call: (03) 000000000',
  },
];

export default function SportCourt() {
  const cards = mockdata.map((article) => (
    <Card key={article.title} p="md" radius="md" component="a" href="#" className={classes.card} >
      <AspectRatio ratio={1920 / 1080}>
        <Image src={article.image} alt='image'/>
      </AspectRatio>
      <Text c="dimmed" size="xs" tt="uppercase" fw={700} mt="md"> 
        {/* {article.date} */}
      </Text>
      <Text className={classes.title} mt={5}>
        {article.title}
      </Text>
      <Text className={classes.title} mt={5} style={{color:'GrayText', fontSize:'12px'}}>
        {article.address}
      </Text>
    </Card>
  ));

  return (
    <Container size="lg">
      <SimpleGrid cols={{ base: 1, sm: 4 }} mt={20}>{cards}</SimpleGrid>
    </Container>
  );
}