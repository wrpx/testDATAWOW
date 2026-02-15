import { Concert, ReservationHistory } from "@/lib/types";

export const adminConcertsMock: Concert[] = [
  {
    id: "concert-1",
    name: "Concert Name 1",
    description:
      "Lorem ipsum dolor sit amet consectetur. Elit purus nam gravida porttitor nibh urna sit ornare a. Proin dolor morbi id ornare aenean non. Fusce dignissim turpis sed non est orci sed in. Blandit ut purus nunc sed donec commodo morbi diam scelerisque.",
    totalSeats: 500,
    reservedSeats: 120
  },
  {
    id: "concert-2",
    name: "Concert Name 2",
    description: "Lorem ipsum dolor sit amet consectetur. Elit purus nam gravida porttitor nibh urna sit ornare a.",
    totalSeats: 200,
    reservedSeats: 12
  }
];

export const userConcertsMock: Concert[] = [
  {
    id: "concert-1",
    name: "Concert Name",
    description:
      "Lorem ipsum dolor sit amet consectetur. Elit purus nam gravida porttitor nibh urna sit ornare a. Proin dolor morbi id ornare aenean non. Fusce dignissim turpis sed non est orci sed in. Blandit ut purus nunc sed donec commodo morbi diam scelerisque.",
    totalSeats: 500,
    reservedSeats: 499,
    isReservedByUser: true
  },
  {
    id: "concert-2",
    name: "Concert Name",
    description:
      "Lorem ipsum dolor sit amet consectetur. Elit purus nam gravida porttitor nibh urna sit ornare a. Proin dolor morbi id ornare aenean non. Fusce dignissim turpis sed non est orci sed in. Blandit ut purus nunc sed donec commodo morbi diam scelerisque.",
    totalSeats: 2000,
    reservedSeats: 1680,
    isReservedByUser: false
  }
];

export const adminHistoryMock: ReservationHistory[] = [
  {
    id: "history-1",
    dateTime: "12/09/2024 15:00:00",
    username: "Sara John",
    concertName: "The festival Int 2024",
    action: "Cancel"
  },
  {
    id: "history-2",
    dateTime: "12/09/2024 10:39:20",
    username: "Sara John",
    concertName: "The festival Int 2024",
    action: "Reserve"
  }
];
