import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import timeGridPlugin from "@fullcalendar/timegrid";
import { ChangeEventHandler, useEffect, useRef, useState } from "react";
import FooterLinks from "../Footer/FooterLinks";
import HeaderMenu from "../Header/HeaderMenu";

import {
  Badge,
  Box,
  Button,
  Chip,
  Container,
  Grid,
  Input,
  Modal,
  Select,
  Slider,
  Switch,
  Text,
  TextInput,
} from "@mantine/core";
// import '@fullcalendar/common/main.css';
// import '@fullcalendar/daygrid/main.css';
// import '@fullcalendar/timegrid/main.css';
// import '@fullcalendar/resource-timeline/main.css';
import { getSession } from "@auth0/nextjs-auth0";
import { useUser } from "@auth0/nextjs-auth0/client";
import { DateSelectArg, EventClickArg } from "@fullcalendar/core";
import { List } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import {
  IconArrowRight,
  IconShoppingBag,
  IconTrash,
} from "@tabler/icons-react";
import axios from "axios";
import dayjs from "dayjs";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { LineItems, checkout } from "pages/api/checkout";
import { Subscription } from "pages/bookings";
import { toast } from "react-toastify";

import classes from "./calendar.module.css";

export function isDateBetween(
  startDate: string,
  checkDate: string,
  endDate: string
) {
  // Parse the dates to ensure they are valid Date objects
  const newstartDate = new Date(startDate);
  const newcheckDate = new Date(checkDate);
  const newEndDate = new Date(endDate);
  // Check if checkDate is between startDate and endDate
  return newstartDate <= newcheckDate && newcheckDate < newEndDate;
}

export interface BookingDate {
  date: string;
  time: string;
  court: string;
  endDate: string;
  startDate: string;
  price: number;
  id: string;
}
interface Events {
  start: string;
  resourceId: string;
  end: string;
  title: string;
  isCancelled?: boolean;
  id: string;
  hasPaid?: boolean;
}
export const resources = [
  { id: "A", title: "Court 1" },
  { id: "B", title: "Court 2" },
  { id: "C", title: "Court 3" },
  { id: "D", title: "Court 4" },
  { id: "E", title: "Court 5" },
  { id: "F", title: "Court 6" },
  { id: "G", title: "Court 7" },
  { id: "H", title: "Court 8" },
  { id: "I", title: "Court 9" },
  { id: "J", title: "Court 10" },
  { id: "K", title: "Court 11" },
  { id: "L", title: "Court 12" },

  // Add more resources as needed
];

// Max 3 hour, can increase
const duration = [
  { value: 0.5, label: "0.5" },
  { value: 1, label: "1" },
  { value: 1.5, label: "1.5" },
  { value: 2, label: "2" },
  { value: 2.5, label: "2.5" },
  { value: 3, label: "3" },
];

const validateEvents = (
  events: Events[],
  tempEvents: Events[],
  bookings: BookingDate[]
): { events: Events[]; bookings: BookingDate[]; total: number } => {
  let total = 0;
  const newTemp = tempEvents.filter((el) => {
    const currentUTC = Date.UTC(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate()
    );
    const secondDate = new Date(el.start);
    const secondUTC = Date.UTC(
      secondDate.getFullYear(),
      secondDate.getMonth(),
      secondDate.getDate()
    );
    // Compare the UTC dates
    const isSecondDateLess = secondUTC < currentUTC;
    return (
      !events.some((event) => {
        const present =
          event.resourceId === el.resourceId &&
          isDateBetween(event.start, el.start, event.end);

        present && el && total++;
        return present;
      }) && !isSecondDateLess
    );
  });
  const newBookings = bookings.filter((el) => {
    const currentUTC = Date.UTC(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate()
    );
    const secondDate = new Date(el.startDate);
    const secondUTC = Date.UTC(
      secondDate.getFullYear(),
      secondDate.getMonth(),
      secondDate.getDate()
    );
    // Compare the UTC dates
    const isSecondDateLess = secondUTC < currentUTC;
    return (
      !events.some(
        (event) =>
          event.resourceId === el.court &&
          isDateBetween(event.start, el.startDate, event.end)
      ) && !isSecondDateLess
    );
  });
  return { events: newTemp, bookings: newBookings, total };
};
function Calendar({
  events: backendEvents,
  isAdmin: isAdministratorLoggedIn,
}: {
  events: Events[];
  isAdmin: boolean;
}) {
  const { user, isLoading, error } = useUser();

  const isAdmin = isAdministratorLoggedIn || user?.nickname === "admin";

  const params = useSearchParams();
  const router = useRouter();
  useEffect(() => {
    if (params.get("success") === "false") {
      toast.error("Payment cancelled");
      router.push("/calendarapp/calendar");
    }
    if (params.get("success") === "true") {
      toast.success("Payment successful");
      router.push("/calendarapp/calendar");
    }
  }, [params, router]);

  const [tempEvents, setTempEvents] = useState<Events[]>([]);
  const [events, setEvents] = useState<Events[]>(backendEvents);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [currentEditBookingDate, setCurrentEditBookingDate] = useState(dayjs());

  const manualBookingForm = useForm({ initialValues: { hasPaid: false } });
  const editBookingForm = useForm({});
  const [
    manualBookingModalOpened,
    { open: openManualBookingModal, close: closeManualBookingModal },
  ] = useDisclosure(false);
  const [
    editBookingModalOpened,
    { open: openEditBookingModal, close: closeEditBookingModal },
  ] = useDisclosure(false);

  const calendarRef = useRef<FullCalendar>(null);

  const [bookingDates, setBookingDates] = useState<BookingDate[]>([]);

  const handleEventClick = (info: EventClickArg) => {
    const isTempBooking = tempEvents.some((el) => el.id == info.event.id);
    console.log(isTempBooking);

    if (isTempBooking) {
      handleBookingDeleteByCourtId(info.event.id);
      return;
    }

    if (info.event._def.title === "Booked") {
      const bookingDuration = +dayjs(info.el.fcSeg.end).diff(
        info.el.fcSeg.start,
        "hour"
      );
      openEditBookingModal();
      editBookingForm.setFieldValue(
        "startDate",
        dayjs(info.el.fcSeg.start).toDate()
      );
      editBookingForm.setFieldValue("duration", bookingDuration);
      editBookingForm.setFieldValue(
        "id",
        info.el.fcSeg.eventRange.def.extendedProps["_id"]
      );
    }
  };

  useEffect(() => {
    if (user) {
      (async () => {
        const { data: subscribeData }: { data: Subscription } = await axios.get(
          `/api/subscription/${user.email}`
        );
        (subscribeData.monthly || subscribeData.yearly) &&
          setIsSubscribed(true);
      })();
    }
  }, [user]);
  useEffect(() => {
    const local = localStorage.getItem("badminton-bookings");
    const localEvents = localStorage.getItem("badminton-events");
    if (typeof local === "string") {
      setBookingDates(JSON.parse(local));
    }
    if (typeof localEvents === "string") {
      setTempEvents(JSON.parse(localEvents));
      const {
        events: newEvents,
        bookings,
        total,
      } = validateEvents(
        events,
        JSON.parse(localEvents),
        JSON.parse(local as string)
      );
      if (total > 0) {
        toast.warning(
          `Your ${total} bookings were removed because they were already booked 😢`
        );
      }
      setTempEvents(newEvents);
      localStorage.setItem("badminton-bookings", JSON.stringify(bookings));
      localStorage.setItem("badminton-events", JSON.stringify(newEvents));
      setBookingDates(bookings);
    }
  }, [events]);

  const generateUID = () => {
    return (
      "uid-" +
      Date.now().toString(36) +
      "-" +
      Math.random().toString(36).substr(2)
    );
  };

  const handleDateClick = (info: DateClickArg) => {
    if (isAdmin) return null;
    const id = info.resource?._resource.id;
    const filteredEvents = [
      ...events.filter((el) => el.resourceId === id),
      ...tempEvents.filter((el) => el.resourceId === id),
    ];
    const isBooking = filteredEvents.some((el) =>
      isDateBetween(el.start, info.dateStr, el.end)
    );
    if (isBooking) return;

    const formattedDate = new Intl.DateTimeFormat("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
      weekday: "long",
    }).format(new Date(info.date));
    const { type } = info.view;
    const startTime = new Date(new Date(info.dateStr).getTime());
    let endTime: Date | undefined = undefined;
    if (type === "resourceTimelineDay") {
      endTime = new Date(new Date(info.dateStr).getTime() + 1800000);
    }
    if (type === "resourceTimelineWeek") {
      endTime = new Date(new Date(info.dateStr).getTime() + 3600000);
    }
    const bookingSlice = bookingDates.slice();

    const uid = generateUID();

    const newTempEvents = [
      ...tempEvents,
      {
        id: uid,
        start: startTime.toISOString(),
        end: endTime?.toISOString() ?? "",
        resourceId: id as string,
        title: "",
        backgroundColor: "grey",
      },
    ];
    setTempEvents(newTempEvents);
    let price: number;
    if (isSubscribed) {
      price = 14;
    } else {
      if (new Date(startTime.toLocaleString()).getHours() >= 17) {
        price = 18;
      } else {
        price = 16;
      }
    }
    bookingSlice.push({
      date: formattedDate,
      startDate: startTime.toISOString(),
      endDate: endTime?.toISOString() ?? "",
      time: `${startTime.toLocaleTimeString()}-${endTime?.toLocaleTimeString()}`,
      court: id as string,
      id: uid,
      price,
    });
    localStorage.setItem("badminton-bookings", JSON.stringify(bookingSlice));
    localStorage.setItem("badminton-events", JSON.stringify(newTempEvents));
    setBookingDates(bookingSlice);
    // !isBooking && open();
  };

  const handleSelectDates = (info: DateSelectArg) => {};

  const calendarOptions = {
    plugins: [
      dayGridPlugin,
      timeGridPlugin,
      resourceTimelinePlugin,
      interactionPlugin,
    ],
    initialView: "resourceTimelineDay",
    headerToolbar: {
      right: "prev,next today",
      left: "title",
      center: "",
      // right: "resourceTimelineDay",
    },
    editable: true,
    selectable: true,
    updateSize: true,
    eventResizableFromStart: true,
    events: [...events, ...tempEvents],
    resources: resources,
    buttonText: {
      today: "Today",
      resourceTimelineDay: "Day",
      resourceTimelineWeek: "Week",
      resourceTimelineMonth: "Month",
    },
    buttonIcons: {
      prev: "chevron-left",
      next: "chevron-right",
    },
    eventClick: handleEventClick,
    dateClick: handleDateClick,
    // Other options as needed
  };

  const handleBookingDelete = (index: number) => {
    const bookingSlice = bookingDates.filter((el, i) => i !== index);
    const toDeleteDate = bookingDates.find((el, i) => i === index);
    const newTempEvents = tempEvents.filter(
      (el) =>
        toDeleteDate?.court !== el.resourceId &&
        toDeleteDate?.startDate !== el.start
    );
    setTempEvents(newTempEvents);
    localStorage.setItem("badminton-bookings", JSON.stringify(bookingSlice));
    localStorage.setItem("badminton-events", JSON.stringify(newTempEvents));
    setBookingDates(bookingSlice);
  };
  const handleBookingDeleteByCourtId = (id: string) => {
    const bookingSlice = bookingDates.filter((el, i) => id !== el.id);
    const toDeleteDate = bookingDates.find((el, i) => el.id === id);
    const newTempEvents = tempEvents.filter(
      (el) => !(toDeleteDate?.id == el.id)
    );

    setTempEvents(newTempEvents);
    localStorage.setItem("badminton-bookings", JSON.stringify(bookingSlice));
    localStorage.setItem("badminton-events", JSON.stringify(newTempEvents));
    setBookingDates(bookingSlice);
  };
  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      console.log("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      console.log(
        "Order canceled -- continue to shop around and checkout when you’re ready."
      );
    }
  }, []);
  const handleDateChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    try {
      router.push(`?date=${e.target.value}`);
      if (calendarRef.current) {
        const isoDate = new Date(e.target?.value || "").toISOString();
        const calendarApi = calendarRef.current.getApi();
        calendarApi.gotoDate(isoDate);
      }
    } catch (error) {
      console.log("Invalid Date");
    }
  };

  useEffect(() => {
    const intervalFunction = async () => {
      try {
        const { data }: { data: { bookings: Events[] } } = await axios.get(
          `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/bookings`
        );
        const events = data.bookings
          ? data.bookings
              .map((el) => ({
                ...el,
                title: "Booked",
              }))
              .filter((booking) => !booking.isCancelled)
          : [];

        const {
          events: newEvents,
          bookings,
          total,
        } = validateEvents(events, tempEvents, bookingDates);
        localStorage.setItem("badminton-events", JSON.stringify(newEvents));
        localStorage.setItem("badminton-bookings", JSON.stringify(bookings));
        if (total > 0) {
          toast.warning(
            `Your ${total} bookings were removed because they were already booked 😢`
          );
        }
        setTempEvents(newEvents);
        setBookingDates(bookings);
        setEvents(events);
      } catch (error) {
        console.error("Error fetching data:", error);

        return {
          props: {
            events: [],
          },
        };
      }
    };
    const intervalId = setInterval(intervalFunction, 1000 * 6);

    return () => clearInterval(intervalId);
  }, [tempEvents, bookingDates]);

  const handleNormalPrices = (): number => {
    const result = bookingDates.reduce((acc, cur) => {
      if (new Date(new Date(cur.startDate).toLocaleString()).getHours() >= 17) {
        return acc + 18;
      }
      return acc + 16;
    }, 0);
    return result;
  };
  const generateLineItems = (): LineItems[] => {
    if (bookingDates.length === 0) {
      return [];
    }
    if (isSubscribed) {
      return [
        {
          price: "price_1OjCNmCUEvfGIxZxlXf8AxUb",
          quantity: bookingDates.length,
        },
      ];
    }

    const finalLineItems = bookingDates.reduce((acc: LineItems[], cur) => {
      let newAcc: LineItems[];
      if (new Date(new Date(cur.startDate).toLocaleString()).getHours() >= 17) {
        const nightExists = acc.some(
          (el) => el.price === "price_1ObZxZCUEvfGIxZxAW4ngW7F"
        );
        if (nightExists) {
          newAcc = acc.map((el) => {
            if (el.price === "price_1ObZxZCUEvfGIxZxAW4ngW7F") {
              return { ...el, quantity: ++el.quantity };
            }
            return el;
          });
        } else {
          // To incorporate already present day prices.
          newAcc = [
            ...acc,
            { price: "price_1ObZxZCUEvfGIxZxAW4ngW7F", quantity: 1 },
          ];
        }
      } else {
        const dayExists = acc.some(
          (el) => el.price === "price_1OjCatCUEvfGIxZxtTzuJJwY"
        );
        if (dayExists) {
          newAcc = acc.map((el) => {
            if (el.price === "price_1OjCatCUEvfGIxZxtTzuJJwY") {
              return { ...el, quantity: ++el.quantity };
            }
            return el;
          });
        } else {
          newAcc = [
            ...acc,
            { price: "price_1OjCatCUEvfGIxZxtTzuJJwY", quantity: 1 },
          ];
        }
      }
      return newAcc;
    }, []);
    return finalLineItems;
  };
  return (
    <div>
      <HeaderMenu />
      <Container size="lg" pt={70}>
        <Grid pt={30} pb={40} className={classes.grid}>
          {!isAdmin && (
            <Grid.Col span={{ base: 12, lg: 3 }}>
              <Input
                type="date"
                defaultValue={
                  router.query.date || new Date().toISOString().split("T").at(0)
                }
                onChange={(e) => {
                  // router.push(`?date=${e.target.value}`);
                  handleDateChange(e);
                }}
              />
              <div>
                <List className={classes.list}>
                  {bookingDates.map((el, i) => (
                    <List.Item className={classes.borderbox} key={i}>
                      <div className={classes.inlinetext}>
                        <Badge size="lg" mr={10} bg={"green"}>
                          {el.date}
                        </Badge>
                        <Text size="md" mr={10}>
                          {isSubscribed
                            ? "$14.00"
                            : new Date(
                                new Date(el.startDate).toLocaleString()
                              ).getHours() >= 17
                            ? "$18.00"
                            : "$16.00"}
                        </Text>
                        <IconTrash
                          color="red"
                          onClick={handleBookingDelete.bind(null, i)}
                          size={20}
                          style={{ float: "right" }}
                        />
                      </div>
                      <Text mt={15}>
                        {el.time}, {el.court}
                      </Text>
                    </List.Item>
                  ))}
                </List>
              </div>
              <Button
                onClick={() => {
                  setBookingDates([]);
                  setTempEvents([]);
                  localStorage.removeItem("badminton-bookings");
                  localStorage.removeItem("badminton-events");
                }}
                mt={15}
                disabled={!bookingDates.length}
                style={{ textAlign: "center" }}
              >
                <Text style={{ cursor: "pointer" }}>
                  Clear Cart and Start Again
                </Text>
              </Button>
              <div style={{ textAlign: "center", marginTop: "10px" }}>
                <Button
                  color="green"
                  onClick={() => {
                    if (user) {
                      localStorage.removeItem("badminton-bookings");
                      localStorage.removeItem("badminton-events");
                      checkout({
                        lineItems: generateLineItems(),
                        email: user?.email || "",
                        bookingDates: JSON.stringify(bookingDates),
                      });
                    }
                    // handleCheckout();
                    !user && router.push("/api/auth/login");
                  }}
                  disabled={!bookingDates.length}
                >
                  <IconShoppingBag size={20} />
                  Checkout Now ({bookingDates.length}
                  )
                  <IconArrowRight />
                </Button>
              </div>
            </Grid.Col>
          )}
          <Grid.Col span={{ base: 12, lg: 9 }}>
            <FullCalendar
              {...calendarOptions}
              ref={calendarRef}
              initialDate={
                router.query?.date
                  ? new Date(router.query?.date as string)
                  : new Date()
              }
            />
          </Grid.Col>
          {isAdmin && (
            <Grid.Col span={{ base: 12, lg: 9 }}>
              <Button onClick={openManualBookingModal}>
                + Add a new booking
              </Button>
            </Grid.Col>
          )}
        </Grid>
      </Container>
      <FooterLinks />
      <Modal
        opened={manualBookingModalOpened}
        onClose={closeManualBookingModal}
        title="Add a new booking"
        radius={0}
        transitionProps={{ transition: "fade", duration: 200 }}
        withinPortal
      >
        <form
          className={classes.manualBookingForm}
          onSubmit={manualBookingForm.onSubmit(async (values) => {
            await axios.put("/api/bookings", values);
            router.reload();
          })}
        >
          <TextInput
            type="email"
            required
            label="Booked by"
            {...manualBookingForm.getInputProps("bookedBy")}
          />
          <DateTimePicker
            required
            label="Date"
            minDate={new Date()}
            {...manualBookingForm.getInputProps("startDate")}
          />
          <Box display={manualBookingForm.values.startDate ? "block" : "none"}>
            <Text size="sm" style={{ fontWeight: "bold" }}>
              Duration
            </Text>
            <Slider
              className={classes.duration}
              marks={duration}
              step={0.5}
              w="100%"
              min={0.5}
              max={3}
              label={(val) => val}
              {...manualBookingForm.getInputProps("duration")}
            />
          </Box>
          <Select
            required
            label="Court"
            data={resources.map(({ id, title }) => ({
              value: id,
              label: title,
            }))}
            clearable
            allowDeselect={false}
            searchable
            {...manualBookingForm.getInputProps("court")}
          />
          <div className={classes.timeRange}>
            {/* <TimeInput
              step={1800}
              required
              display={manualBookingForm.values.startDate ? "block" : "none"}
              label="Start time"
              placeholder="Pick start time"
              {...manualBookingForm.getInputProps("startTime")}
              style={{ width: "100%", flex: "1 1 auto" }}
            /> */}
            {/* <TimeInput
              required
              display={manualBookingForm.values.startDate ? "block" : "none"}
              label="End time"
              {...manualBookingForm.getInputProps("endTime")}
              minTime={dayjs(manualBookingForm.values.startTime).format(
                "HH:mm"
              )}
              style={{ width: "100%", flex: "1 1 auto" }}
            /> */}
          </div>
          <Chip
            mt={10}
            size="md"
            display={manualBookingForm.values.startDate ? "block" : "none"}
            {...manualBookingForm.getInputProps("hasPaid")}
          >
            {manualBookingForm.values.hasPaid ? "Paid" : "Unpaid"}
          </Chip>
          <Button type="submit" mt={10} disabled={!manualBookingForm.isValid()}>
            Add
          </Button>
        </form>
      </Modal>
      <Modal
        opened={editBookingModalOpened}
        onClose={closeEditBookingModal}
        title={`Edit the booking ${currentEditBookingDate.format(
          "DD-MM-YYYY HH:mm"
        )}`}
        radius={0}
        transitionProps={{ transition: "fade", duration: 200 }}
        withinPortal
      >
        <form
          className={classes.manualBookingForm}
          onSubmit={editBookingForm.onSubmit(async (values) => {
            const { id, ...data } = values;
            await axios.patch(`/api/bookings/${values.id}`, data);
            router.reload();
          })}
        >
          <DateTimePicker
            label="Date"
            minDate={new Date()}
            {...editBookingForm.getInputProps("startDate")}
          />
          <Box>
            <Text size="sm" style={{ fontWeight: "bold" }}>
              Duration
            </Text>
            <Slider
              className={classes.duration}
              marks={duration}
              step={0.5}
              w="100%"
              min={0.5}
              max={3}
              label={(val) => val}
              {...editBookingForm.getInputProps("duration")}
            />
          </Box>
          <div className={classes.timeRange}>
            {/* <TimeInput
              display={editBookingForm.values.startDate ? "block" : "none"}
              label="Start time"
              placeholder="Pick start time"
              {...editBookingForm.getInputProps("startTime")}
              style={{ width: "100%", flex: "1 1 auto" }}
            />
            <TimeInput
              display={editBookingForm.values.startDate ? "block" : "none"}
              label="End time"
              {...editBookingForm.getInputProps("endTime")}
              minTime={dayjs(editBookingForm.values.startTime).format("HH:mm")}
              style={{ width: "100%", flex: "1 1 auto" }}
            /> */}
          </div>

          <Switch
            size="md"
            label="Cancel?"
            color="red"
            {...editBookingForm.getInputProps("cancel")}
          />

          <Button type="submit" mt={10} disabled={!editBookingForm.isValid()}>
            Update
          </Button>
        </form>
      </Modal>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  try {
    const user = getSession(ctx.req, ctx.res);
    axios.defaults.baseURL = `${process.env.NEXT_PUBLIC_FRONTEND_URL}`;

    const { data } = await axios.get("/api/bookings");
    const events = data.bookings
      ? data.bookings
          .map((el: Events) => ({
            ...el,
            title: "Booked",
          }))
          .filter((booking: Events) => !booking.isCancelled)
      : [];

    return {
      props: {
        events,
        isAdmin: user?.nickname === "admin",
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);

    return {
      props: {
        events: [],
      },
    };
  }
}

export default Calendar;
