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
  remainingSeats?: number;
  soldOut?: boolean;
  isReservedByUser?: boolean;
};

export type ReservationHistory = {
  id: string;
  dateTime: string;
  username: string;
  concertName: string;
  action: "Reserve" | "Cancel";
};

export type ApiReservationHistory = {
  id: string;
  userId: string;
  username: string;
  concertId: string;
  concertName: string;
  action: "Reserve" | "Cancel";
  timestamp: string;
};

export type AdminSummary = {
  totalSeats: number;
  reserveCount: number;
  cancelCount: number;
};

export type ApiSuccessResponse = {
  success: boolean;
  message: string;
};
