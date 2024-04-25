"use client";
import {
  Box,
  Burger,
  Button,
  Container,
  Divider,
  Drawer,
  Group,
  Image,
  ScrollArea, rem,
  useMantineTheme
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import image from "../../../public/img/home/logo.jpeg";

import classes from "./HomeNavbar.module.css";

export default function HomeNavbar() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const theme = useMantineTheme();
  const handleBookNowClick = () => {
    window.location.href = "/calendarapp/calendar"; // Replace "/your-desired-link" with the actual link
  };

  return (
    <Box pb={0}>
      <header className={classes.header}>
        <Container size="xl">
          <Group justify="space-between" h="100%">
            <Image
              src={image.src}
              style={{ borderRadius: "5px" }}
              alt="image"
              className={classes.logo}
            />

            <Group visibleFrom="sm">
              <Button className={classes.logbtn} variant="default">
                LOG IN
              </Button>
              <Button
                className={classes.logbtn}
                variant="default"
                onClick={handleBookNowClick}
              >
                BOOK NOW
              </Button>
            </Group>

            <Burger
              opened={drawerOpened}
              onClick={toggleDrawer}
              className={classes.colorwh}
            />
          </Group>
        </Container>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        // title=""
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Divider my="sm" />

          <Group justify="center" grow pb="xl" px="md">
            <Button className={classes.logbtn} variant="default">
                LOG IN
              </Button>
              <Button
                className={classes.logbtn}
                variant="default"
                onClick={handleBookNowClick}
              >
                BOOK NOW
              </Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
