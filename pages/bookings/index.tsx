import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { SimpleGrid, Title } from "@mantine/core";
import axios from "axios";
import HeaderMenu from "pages/Header/HeaderMenu";
import classes from "./bookings.module.css";

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
  bookings,
}: {
  bookings: Bookings[];
  email: string;
  subscription: Subscription;
}) {
  const rows = bookings.map((booking) => {
    // Format the time using the toLocaleTimeString() method
    const formattedStartTime = new Date(booking.start).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const formattedEndTime = new Date(booking.end).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    // Format the day using the toLocaleDateString() method
    const formattedDay = new Date(booking.start).toLocaleDateString(["en-AU"]);

    // Combine the start time, end time, and day
    const displayText = `${formattedStartTime} - ${formattedEndTime}, ${formattedDay}`;

    return (
      <>
        <div className={classes.gridCell} style={{ background: "#e6e6e6" }}>
          {displayText}
        </div>
        <div className={classes.gridCell} style={{ background: "#e6e6e6" }}>
          {booking.resourceId}
        </div>
        <div
          className={classes.gridCell}
          style={{ background: "#e6e6e6", cursor: "pointer" }}
        >
          Download
        </div>
        <div
          className={classes.gridCell}
          style={{ background: "red", color: "white", cursor: "pointer" }}
        >
          Cancel
        </div>
      </>
    );
  });

  return (
    <div style={{ background: "black", minHeight: "100vh", padding: "20px" }}>
      <HeaderMenu alwaysBlack={true} alwaysSticky={true} />
      <Title
        style={{
          fontSize: "36px",
          color: "#fff",
          marginBottom: "30px",
          fontFamily: '"Poppins", sans-serif',
        }}
      >
        Bookings
      </Title>
      <SimpleGrid cols={4}>
        <div
          className={classes.gridCell}
          style={{ background: "#cccccc", fontWeight: "bold" }}
        >
          Date time
        </div>
        <div
          className={classes.gridCell}
          style={{ background: "#cccccc", fontWeight: "bold" }}
        >
          Court number
        </div>
        <div
          className={classes.gridCell}
          style={{ background: "#cccccc", fontWeight: "bold" }}
        >
          Invoice
        </div>
        <div
          className={classes.gridCell}
          style={{ background: "#cccccc", fontWeight: "bold" }}
        ></div>
        {rows}
      </SimpleGrid>
    </div>
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
