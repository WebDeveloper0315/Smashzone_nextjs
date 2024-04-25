import { Box, Button } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons-react";
import Link from "next/link";
import { FaFacebook, FaInstagram } from "react-icons/fa";

import classes from "./HeroSection.module.css";

export default function HeroSection() {
  return (
    <>
      <div className={classes.backgroundContainer}>
        <div className={classes.shuttleCockLogo}>
          <img
            src="/img/home-middle.gif"
            // fill
            className={classes.backgroundImage2}
            alt="Background 2"
          />
          <img
            src="/img/shuttlecock.gif"
            className={classes.backgroundImage3}
            alt="Background 3"
          />
        </div>
        <div className={classes.textOverlay}>
          <img
            src="/img/sunshine-badminton.png"
            className={classes.logoImage}
            alt="sunshine-badminton"
          />
          <p>Kick off your adventure with </p>
          <p>3 months free membership!</p>
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
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 50,
          right: 20,
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        <Link
          className={classes.socialLink}
          href="https://facebook.com"
          passHref
          style={{ color: "black" }}
        >
          <FaFacebook size={50} cursor="pointer" />
        </Link>
        <Link
          className={classes.socialLink}
          href="https://instagram.com"
          passHref
          style={{ color: "black" }}
        >
          <FaInstagram size={50} cursor="pointer" />
        </Link>
      </div>
    </>
  );
}
