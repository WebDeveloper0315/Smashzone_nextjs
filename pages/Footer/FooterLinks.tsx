"use client";
import { Text, Container, ActionIcon, Group, rem } from "@mantine/core";
import {
  IconBrandTwitter,
  IconBrandYoutube,
  IconBrandInstagram,
} from "@tabler/icons-react";
import classes from "./FooterLinks.module.css";
import dayjs from "dayjs";

const data = [
  {
    title: "Opening Hours",
    links: [
      {
        label: "Mon – Fri: 10:00am to 11.00pm Sat – Sun: 7.00am to 11pm",
        link: "#",
      },
    ],
  },
  {
    title: "Useful Links",
    links: [
      { label: "Covid Safe Plan", link: "#" },
      { label: "Badminton", link: "#" },
      { label: "Coaching", link: "#" },
      { label: "Contact Us", link: "#" },
      { label: "Book", link: "#" },
    ],
  },
  {
    title: "Contact",
    links: [
      {
        label:
          "Meeting Time:  Mon – Fri: 10:00 am to 11.00 pm Sat – Sun: 07.00 am to 11.00 pm",
        link: "#",
      },
      { label: "Address:  6/4 Infinity Dr Truganina VIC 3029", link: "#" },
      { label: "Phone:  000 000 000", link: "#" },
      { label: "Email:  info@.com.au", link: "#" },
    ],
  },
];

export default function FooterLinks() {
  const currentYear = dayjs().get("year");
  const groups = data.map((group) => {
    const links = group.links.map((link, index) => (
      <Text<"a">
        key={index}
        className={classes.link}
        component="a"
        href={link.link}
        onClick={(event) => event.preventDefault()}
      >
        {link.label}
      </Text>
    ));

    return (
      <div className={classes.wrapper} key={group.title}>
        <Text className={classes.title}>{group.title}</Text>
        {links}
      </div>
    );
  });

  return (
    <footer className={classes.footer}>
      <Container size="lg" className={classes.inner}>
        <div className={classes.groups}>{groups}</div>
      </Container>

      <Container size="lg" className={classes.afterFooter}>
        <Group
          style={{
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Text c="dimmed" size="sm">
            © {currentYear} Sunshine. All rights reserved.
          </Text>
          <img
            src="/img/sunshine-badminton.png"
            alt="sunshine-badminton"
            className={classes.logo}
          />
        </Group>

        <Group
          gap={0}
          className={classes.social}
          justify="flex-end"
          wrap="nowrap"
        >
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandTwitter
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandYoutube
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandInstagram
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          </ActionIcon>
        </Group>
      </Container>
    </footer>
  );
}
