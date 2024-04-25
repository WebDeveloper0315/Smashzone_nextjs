import {
  Image,
  Container,
  Title,
  Button,
  Group,
  Text,
  List,
  ThemeIcon,
  rem,
  Grid,
  SimpleGrid,
} from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import image from '../../public/img/home.jpg';
import images from '../../public/img/badmintonplayer.jpg';

import classes from './About.module.css';

export default function About() {

  return (
    <Container size="lg">
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md" mt={70}>
        <Grid gutter="md" pr={20} pb={20}>
          <span className={classes.highlight}>WELCOME TO Company</span>
          <Title className={classes.title}>
            We understand the Importance of Sports and Fitness!
          </Title>
          <Text c="dimmed" mt="md">
            As we launch this year, amidst the pandemic, our vision is to serve the local community
            with the fun and experience associated with playing indoor sports family.
          </Text>

          <Text c="dimmed" mt="md">
            We began BTTC with one focus: to cater to social players, home makers, senior citizens,
            community groups, coaching academy, competitions and pennants for Badminton and Table
            Tennis.
          </Text>

          <Text c="dimmed" mt="md">
            Today, we are the biggest combined badminton and table tennis centre in western
            Melbourne. This is a testament to our commitment to building a strong, long-term
            relationship with the community as we encourage individuals to learn and play together
            while improving their physical and mental fitness levels.
          </Text>
          <Group mt={30}>
            <Button color='green' radius="xl" size="md" className={classes.control}>
              Read More
            </Button>
          </Group>
        </Grid>
        <Grid gutter="md">
          <Image src={image.src} style={{borderRadius:'5px'}} alt='image'/>
        </Grid>
      </SimpleGrid>
    </Container>
  );
}
