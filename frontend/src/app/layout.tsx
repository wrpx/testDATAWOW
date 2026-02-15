import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Concert Reservation",
  description: "Frontend assignment scaffold for concert reservation system"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
