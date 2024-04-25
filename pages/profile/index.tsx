import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Group,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { IconArrowRight } from "@tabler/icons-react";
import axios from "axios";
import HeaderMenu from "pages/Header/HeaderMenu";
import classes from "./profile.module.css";

export interface Bookings {
  id: string;
  start: string;
  end: string;
  email: string;
  resourceId: string;
  isCancelled: boolean;
  hasPaid: boolean;
}
export interface Subscription {
  monthly: boolean;
  yearly: boolean;
}

export default function Bookings({
  email,
  subscription,
}: {
  email: string;
  subscription: Subscription;
}) {
  console.log(subscription);
  return (
    <Container
      fluid
      style={{
        background: "black",
        minHeight: "100vh",
        alignItems: "center",
      }}
    >
      <HeaderMenu alwaysBlack={true} alwaysSticky={true} />
      <Group style={{ marginTop: "20px" }}>
        <Stack>
          <Title
            style={{
              fontSize: "36px",
              color: "#fff",
              marginBottom: "30px",
              fontFamily: '"Poppins", sans-serif',
            }}
          >
            Profile
          </Title>
          <SimpleGrid
            cols={3}
            spacing="xs"
            verticalSpacing="xs"
            style={{ color: "white", fontSize: "30px" }}
          >
            <div style={{ fontWeight: "bold" }}>Membership</div>
            <div style={{ width: "max-content" }}>
              {subscription?.monthly || subscription?.yearly
                ? subscription.monthly
                  ? "Monthly"
                  : "Yearly"
                : "Non member"}
            </div>
            <Stack style={{ justifyContent: "center" }}>
              {subscription?.yearly ? (
                <Button
                  style={{
                    background: "#ff3131",
                    color: "black",
                    width: "100px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  Cancel
                </Button>
              ) : (
                <Button
                  style={{
                    background: "#e5e900",
                    color: "black",
                    width: "100px",
                  }}
                >
                  Upgrade
                </Button>
              )}
            </Stack>
            {subscription?.monthly ? <Button>Cancel</Button> : null}
            <div style={{ width: "max-content", fontWeight: "bold" }}>
              Email
            </div>
            <div
              style={{
                width: "max-content",
                fontSize: "20px",
                display: "flex",
                alignItems: "center",
              }}
            >
              {email}
            </div>
            <Stack style={{ justifyContent: "center" }}>
              <Button
                style={{
                  display: "block",
                  background: "#ededed",
                  color: "black",
                  maxWidth: "100px",
                }}
              >
                Edit
              </Button>
            </Stack>
            <div style={{ fontWeight: "bold", width: "max-content" }}>
              Phone
            </div>
            <div></div>
            <Stack style={{ justifyContent: "center" }}>
              <Button
                style={{
                  display: "block",
                  background: "#ededed",
                  color: "black",
                  maxWidth: "100px",
                }}
              >
                Edit
              </Button>
            </Stack>
          </SimpleGrid>
        </Stack>
        <Container
          style={{
            background: "rgb(229, 233, 0)",
            flexGrow: 1,
            maxWidth: "400px",
            paddingTop: "10px",
            paddingBottom: "20px",
            paddingLeft: "20px",
            paddingRight: "20px",
            marginLeft: 0
          }}
        >
          <Title style={{ fontWeight: "normal", fontSize: "30px" }}>
            Exclusive Offer!
          </Title>
          <br />
          <Text style={{ fontSize: "26px" }}>
            Unlock special discounts and perks by joining our ShuttleClub
            membership!
            <br />
            <br />
            Sign up today to elevate your badminton experience!
          </Text>
          <Center>
            <Button
              className={classes.startFreeBtn}
              justify="space-between"
              rightSection={
                <Box
                  display="flex"
                  style={{
                    backgroundColor: "#13072E",
                    height: "50px",
                    width: "50px",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <IconArrowRight size={17} color="white" />
                </Box>
              }
              styles={() => ({
                root: {
                  marginTop: "40px",
                  backgroundColor: "white",
                  height: "60px",
                  width: "265px",
                  borderWidth: "3px",
                  borderStyle: "solid",
                  borderColor: "black",
                  fontWeight: "bold",
                  cursor: "pointer",
                  color: "black",
                  marginBottom: "22px",
                  justifyContent: "space-between",
                  padding: 5,
                },
                label: {
                  marginLeft: "20px",
                  fontSize: "18px",
                },
              })}
            >
              Start free today
            </Button>
          </Center>
        </Container>
      </Group>
    </Container>
  );
}

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    const session = await getSession(ctx.req, ctx.res);
    try {
      axios.defaults.baseURL = `${process.env.NEXT_PUBLIC_FRONTEND_URL}`;
      const { data }: { data: { bookings: Bookings[] } } = await axios.get(
        `/api/badminton/${session?.user.email}`
      );
      const { data: subscribeData }: { data: Subscription } = await axios.get(
        `/api/subscription/${session?.user.email}`
      );
      return {
        props: {
          bookings: data.bookings,
          email: session?.user.email,
          subscription: subscribeData,
        },
      };
    } catch (error) {
      console.error("Error fetching data:", error);

      return {
        props: {
          bookings: [],
          email: session?.user.email,
          subscription: { monthly: false, yearly: false },
        },
      };
    }
  },
});
