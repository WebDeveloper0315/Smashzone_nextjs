"use client";
import cx from "clsx";
import { Title, Text, Container, Button, Overlay } from "@mantine/core";
import classes from "./BottomSection.module.css";
import { useRouter } from "next/router";

export default function BottomSection() {
  const router = useRouter();
  return (
    <div className={classes.wrapper}>
      <Overlay color="#000" opacity={0.65} zIndex={1} />

      <div className={classes.inner}>
        <Title className={classes.title}>Join the game!</Title>

        <Container size={640}>
          <Text size="lg" className={classes.description}>
            When you hire a court or become a member, you know you’re getting
            highly qualified professionals who have the expertise and experience
            to make sure you get the best of everything
          </Text>
        </Container>

        <div className={classes.controls}>
          <Button
            color="green"
            className={classes.control}
            size="lg"
            onClick={() => {
              router.push("/calendarapp/calendar");
            }}
          >
            Book Now
          </Button>
          {/* <Button className={cx(classes.control, classes.secondaryControl)} size="lg">
            Live demo
          </Button> */}
        </div>
      </div>
    </div>
  );
}
