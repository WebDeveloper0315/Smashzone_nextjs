import { useUser } from "@auth0/nextjs-auth0/client";
import { Carousel } from "@mantine/carousel";
import {
  Box,
  Button,
  Container,
  Divider,
  Group,
  SimpleGrid,
  Text,
  Title,
} from "@mantine/core";
import { useRouter } from "next/router";
import { subscribe } from "pages/api/payment";
import ServiceSvg from "./ServiceSvg";
import ShuttleCockSvg from "./ShuttlecockSvg";
import Svg1 from "./Svg1";
import Svg2 from "./Svg2";
import Svg3 from "./Svg3";

import classes from "./ComeSmashWithUs.module.css";

export default function ComeSmashWithUs() {
  const router = useRouter();
  const { user, isLoading, error } = useUser();

  return (
    <div className={classes.bgblack}>
      <Container size="xl">
        <div className={classes.sectionsecond}>
          <Title
            style={{
              textAlign: "center",
              fontSize: "56px",
              color: "#fff",
              marginBottom: "30px",
              fontFamily: '"Poppins", sans-serif',
            }}
          >
            COME SMASH WITH US
          </Title>
          <SimpleGrid cols={{ base: 1, lg: 3 }}>
            <div className={classes.mainbx}>
              <div className={classes.toptext}>
                <Box
                  display="flex"
                  style={{
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 0,
                  }}
                >
                  <Svg1 />
                  <br />
                  <Title style={{ fontSize: "24px" }}>MEMBERSHIP</Title>
                  <br />
                </Box>
                <Text size="3rem" fw={700} display="block" flex="1 1 auto">
                  $60
                  <Text size="md" span>
                    /YEAR
                  </Text>
                </Text>
                <br />
                PERMANENT BOOK
                <br />
                CHEAPER RAT
              </div>
              <div>
                <Button
                  className={classes.bottext}
                  onClick={async () => {
                    if (!user?.email)
                      return router.push(
                        "/api/auth/login?returnTo=/calendarapp/calendar"
                      );
                    const url = await subscribe({
                      lineItems: [
                        {
                          price: "price_1OhO6PCUEvfGIxZxNe6ggAIS",
                          quantity: 1,
                        },
                      ],
                      email: user?.email as string,
                    });
                    router.push(url as string);
                  }}
                >
                  JOIN NOW
                </Button>
              </div>
            </div>
            <div className={classes.mainbx2}>
              <div className={classes.toptext2}>
                <Box
                  display="flex"
                  style={{
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 0,
                  }}
                >
                  <Svg2 />
                  <br />
                  <Title style={{ fontSize: "24px" }}>
                    12 BADMINTON COURTS
                  </Title>
                  <br />
                </Box>
                <Title style={{ fontSize: "20px" }}>PEAK</Title>
                <Group justify="center">
                  <Text size={"lg"}>$24 MEMBER</Text>
                  <Divider color="black" orientation="vertical" />
                  <Text size={"lg"}>$26 CASUAL</Text>
                </Group>
                <br />
                <Title style={{ fontSize: "20px" }}>NON-PEAK</Title>
                <Group justify="center">
                  <Text size={"lg"}>$24 MEMBER</Text>
                  <Divider color="black" orientation="vertical" />
                  <Text size={"lg"}>$26 CASUAL</Text>
                </Group>
                <br />
              </div>
              <div>
                <Button
                  component="a"
                  href="/calendarapp/calendar"
                  className={classes.bottext2}
                >
                  BOOK ONLINE
                </Button>
              </div>
            </div>
            <div className={classes.mainbx3}>
              <div className={classes.toptext3}>
                <Box
                  display="flex"
                  style={{
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 0,
                  }}
                >
                  <Svg3 />
                  <br />
                  <Title style={{ fontSize: "24px", color: "#fff" }}>
                    STORE
                  </Title>
                  <br />
                </Box>
                <Text style={{ color: "#fff" }}>
                  RACKETS, SHUTTLECOCK
                  <br />
                  TUBE, RESTRINGS
                  <br />
                  CHEAPER RAT
                </Text>
                <Carousel
                  withIndicators={false}
                  height={200}
                  slideGap="md"
                  align="start"
                  controlSize={30}
                  loop
                  styles={{
                    control: {
                      color: "white",
                      backgroundColor: "transparent",
                      border: "none",
                      boxShadow: "none"
                    },
                  }}
                >
                  <Carousel.Slide
                    display="flex"
                    style={{ alignItems: "center", justifyContent: "center" }}
                  >
                    <Box>
                      <Svg2 fill="white" />
                      <Text style={{ fontSize: "16px", color: "white" }}>
                        RACKETS
                      </Text>
                    </Box>
                  </Carousel.Slide>
                  <Carousel.Slide
                    display="flex"
                    style={{ alignItems: "center", justifyContent: "center" }}
                  >
                    <Box>
                      <ShuttleCockSvg fill="white" />
                      <Text style={{ fontSize: "16px", color: "white" }}>
                        SHUTTLECOCK TUBES
                      </Text>
                    </Box>
                  </Carousel.Slide>
                  <Carousel.Slide
                    display="flex"
                    style={{ alignItems: "center", justifyContent: "center" }}
                  >
                    <Box>
                      <ServiceSvg fill="white" />
                      <Text style={{ fontSize: "16px", color: "white" }}>
                        RACKET RESTRINGS
                      </Text>
                    </Box>
                  </Carousel.Slide>
                </Carousel>
              </div>
              <div>
                <Button className={classes.bottext3}>VIEW STORE</Button>
              </div>
            </div>
          </SimpleGrid>
        </div>
      </Container>
    </div>
  );
}
