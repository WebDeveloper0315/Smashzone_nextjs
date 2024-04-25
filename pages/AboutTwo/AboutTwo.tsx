'use client';

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
  Skeleton,
} from '@mantine/core';
import image from '../../public/img/badmintonplayer.jpg';
import { IconCheck } from '@tabler/icons-react';

const PRIMARY_COL_HEIGHT = rem(300);

  export default function AboutTwo() {

  const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - var(--mantine-spacing-md) / 2)`;

  return (
    <Container size="lg">
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md" mt={80}>
        <Grid gutter="md">
          <Image src={image.src} style={{borderRadius:'5px'}} alt='image' />
        </Grid>
        <Grid gutter="md">
          <List
            mt={30}
            ml={20}
            spacing="md"
            size="sm"
            icon={
              <ThemeIcon size={20} radius="xl" style={{backgroundColor:'green'}}>
                <IconCheck style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
              </ThemeIcon>
            }
          >
            <List.Item>
              <b>Lorem Ipsum </b> – The biggest combined badminton and table tennis centre in western Melbourne
            </List.Item>
            <List.Item>
              <b>Lorem Ipsum</b> – The biggest combined badminton and table tennis centre in western Melbourne
            </List.Item>
            <List.Item>
              <b>Lorem Ipsum</b> – The biggest combined badminton and table tennis centre in western Melbourne
            </List.Item>
            <List.Item>
              <b>Lorem Ipsum</b> – The biggest combined badminton and table tennis centre in western Melbourne
            </List.Item>
            <List.Item>
              <b>Lorem Ipsum</b> – The biggest combined badminton and table tennis centre in western Melbourne
            </List.Item>
            <List.Item>
              <b>Lorem Ipsum</b> – The biggest combined badminton and table tennis centre in western Melbourne
            </List.Item>
          </List>
        </Grid>
      </SimpleGrid>
    </Container>
  );
}
