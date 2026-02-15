import type { ReactNode } from "react";

export type Role = "admin" | "user";

export type NavItem = {
  label: string;
  href: string;
  icon: ReactNode;
};

export type Concert = {
  id: string;
  name: string;
  description: string;
  totalSeats: number;
  reservedSeats: number;
  isReservedByUser?: boolean;
};

export type ReservationHistory = {
  id: string;
  dateTime: string;
  username: string;
  concertName: string;
  action: "Reserve" | "Cancel";
};
