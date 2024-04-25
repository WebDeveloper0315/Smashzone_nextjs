'use client';
import { Image, Text, Container, ThemeIcon, Title, SimpleGrid } from '@mantine/core';
// import IMAGES from './images';
import classes from './Features.module.css';
import { IconCheck } from '@tabler/icons-react';

const data = [
  {
    image: 'auditors',
    title: 'Dedicated Pro-shop',
    description: 'for all sporting needs',
  },
  {
    image: 'lawyers',
    title: 'Large area',
    description: 'for activities and functions',
  },
  {
    image: 'accountants',
    title: 'Ample parking',
    description: 'at our sports centre',
  },
];

export default function Features() {
  const items = data.map((item) => (
    <div className={classes.item} key={item.image}>
      <ThemeIcon variant="light" className={classes.itemIcon} size={60} radius="md">
        {/* <Image src={IMAGES[item.image]} /> */}
        <IconCheck size={25} color='green'/>
      </ThemeIcon>

      <div>
        <Text fw={700} fz="lg" className={classes.itemTitle}>
          {item.title}
        </Text>
        <Text c="dimmed">{item.description}</Text>
      </div>
    </div>
  ));

  return (
    <Container size="lg" className={classes.wrapper}>
      <SimpleGrid cols={{ base: 1, xs: 3 }} spacing={50} mt={30}>
        {items}
      </SimpleGrid>
    </Container>
  );
}