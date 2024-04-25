"use client";
import { useUser } from "@auth0/nextjs-auth0/client";
import {
  Box,
  Burger,
  Button,
  Center,
  Collapse,
  Divider,
  Drawer,
  Group,
  ScrollArea,
  UnstyledButton,
  rem,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import {
  IconBuildingStore,
  IconChevronDown,
  IconHome2,
  IconInfoCircle,
  IconPhone,
  IconUsersGroup,
} from "@tabler/icons-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import classes from "./HeaderMenu.module.css";

const CHANGE_NAVBAR_COLOR_OFFSET = 0;

export default function HeaderMenu(props) {
  const { alwaysBlack = false, alwaysSticky = true } = props;
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const router = useRouter();
  const [logoutOpened, { toggle: toggleLogout }] = useDisclosure(false);
  const theme = useMantineTheme();

  const { user, checkSession, isLoading, error } = useUser();
  const [open, setOpen] = useState(false);
  const [offset, setOffset] = useState(0);
  const matches = useMediaQuery("(max-width: 1023px)");

  useEffect(() => {
    const onScroll = () => setOffset(window.scrollY);
    // Clean up
    window.removeEventListener("scroll", onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLoginClick = () => {
    router.push("/api/auth/login?returnTo=/calendarapp/calendar");
  };

  const openLogout = () => {
    setOpen(true);
  };
  const handleLogoutClick = () => {
    console.log("execute");
    router.push("/api/auth/logout");
    localStorage.removeItem("badminton-bookings");
    localStorage.removeItem("badminton-events");
  };

  const handleBookingClick = () => {
    router.push("/bookings");
  };
  const handleProfileClick = () => {
    router.push("/profile");
  };

  const changeNavbarColorCondition =
    alwaysBlack ||
    (offset >= CHANGE_NAVBAR_COLOR_OFFSET && matches) ||
    (offset > CHANGE_NAVBAR_COLOR_OFFSET && !matches);

  return (
    <>
      <header
        className={classes.header}
        style={{
          position: alwaysSticky ? "sticky" : "fixed",
          backgroundColor: changeNavbarColorCondition ? "black" : "transparent",
        }}
      >
        <Group justify="space-between" h="100%">
          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            color="white"
            size="xl"
          />

          <Group>
            <Button
              component="a"
              href="/calendarapp/calendar"
              size="md"
              radius="xs"
              type="button"
              styles={() => ({
                root: {
                  backgroundColor: "transparent",
                  height: "55px",
                  borderWidth: "3px",
                  borderStyle: "solid",
                  borderColor: changeNavbarColorCondition ? "white" : "black",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  color: changeNavbarColorCondition ? "white" : "black",
                  transition: "all 0.5s ease-in-out",
                },
              })}
              className={classes.bookNowBtn}
            >
              Book Now +
            </Button>
            {user && (
              <span style={{ cursor: "pointer" }} onClick={toggleLogout}>
                {user.name}
              </span>
            )}
            <Collapse
              style={{
                position: "absolute",
                top: "60px",
                right: "10px",
                zIndex: "10000",
              }}
              in={logoutOpened}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <Button onClick={handleProfileClick}>Profile</Button>

                <Button onClick={handleBookingClick}>Your Bookings</Button>

                <Button onClick={handleLogoutClick}>Logout</Button>
              </div>
            </Collapse>
          </Group>
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        padding="md"
        zIndex={1000000}
        size={"md"}
        styles={{
          root: {
            fontFamily: "Garet",
          },
          header: {
            backgroundColor: "#ededed",
          },
        }}
      >
        <ScrollArea
          h={`calc(100vh - ${rem(80)})`}
          mx="-md"
          styles={{ root: { backgroundColor: "#ededed" } }}
        >
          <Button
            justify="start"
            size="xl"
            leftSection={<IconHome2 size={20} />}
            component="a"
            href="/"
            fullWidth
            styles={{
              root: {
                fontWeight: "lighter",
                backgroundColor: "transparent",
                color: "black",
                marginLeft: 30,
              },
            }}
          >
            HOME
          </Button>
          <Divider my="sm" color="white" mt={0} mb={0} />
          <Button
            justify="start"
            size="xl"
            leftSection={<IconPhone size={20} />}
            component="a"
            href="#"
            fullWidth
            styles={{
              root: {
                fontWeight: "lighter",
                backgroundColor: "transparent",
                color: "black",
                marginLeft: 30,
              },
            }}
          >
            CONTACT
          </Button>
          <Divider my="sm" color="white" mt={0} mb={0} />
          <Button
            justify="start"
            size="xl"
            leftSection={<IconInfoCircle size={20} />}
            component="a"
            href="#"
            fullWidth
            styles={{
              root: {
                fontWeight: "lighter",
                backgroundColor: "transparent",
                color: "black",
                marginLeft: 30,
              },
            }}
          >
            ABOUT
          </Button>
          <Divider my="sm" color="white" mb={0} mt={0} />
          <Button
            justify="start"
            size="xl"
            leftSection={<IconBuildingStore size={20} />}
            component="a"
            href="#"
            fullWidth
            styles={{
              root: {
                fontWeight: "lighter",
                backgroundColor: "transparent",
                color: "black",
                marginLeft: 30,
              },
            }}
          >
            STORE
          </Button>
          <Divider my="sm" color="white" mt={0} mb={0} />
          <Button
            justify="start"
            size="xl"
            leftSection={<IconUsersGroup size={20} />}
            component="a"
            href="#"
            fullWidth
            styles={{
              root: {
                fontWeight: "lighter",
                backgroundColor: "transparent",
                color: "black",
                marginLeft: 30,
              },
            }}
          >
            MEMBERSHIP
          </Button>
          <Divider my="sm" color="white" mt={0} mb={0} />
          <Box
            style={{
              padding: "20px 52px",
              margin: "10px auto",
              fontWeight: "lighter",
            }}
          >
            <h1 style={{ marginBottom: "10px" }}>Our Location</h1>
            <p style={{ margin: 0 }}>6/45 Bunnet Street</p>
            <p style={{ margin: 0 }}>Sunshine North</p>
            <p style={{ margin: 0 }}>Melbourne</p>
          </Box>

          {user?.email && (
            <>
              <Divider my="sm" color="white" mt={0} mb={0} />
              <UnstyledButton className={classes.link} onClick={toggleLogout}>
                <Center inline>
                  <Box component="span" mr={5}>
                    {user?.name || ""}
                  </Box>
                  <IconChevronDown
                    style={{ width: rem(16), height: rem(16) }}
                    color={theme.colors.blue[6]}
                  />
                </Center>
              </UnstyledButton>
              <Divider my="sm" color="white" m={0} />
            </>
          )}
          <Collapse in={logoutOpened}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <Button onClick={handleProfileClick}>Profile</Button>
              <Button onClick={handleBookingClick}>Your Bookings</Button>
              <Button onClick={handleLogoutClick}>Logout</Button>
            </div>
          </Collapse>
        </ScrollArea>
      </Drawer>
    </>
  );
}
