"use client";

import { useState } from "react";
import { ConcertCard } from "@/components/common/concert-card";
import { Toast } from "@/components/common/toast";
import { userConcertsMock } from "@/lib/mock-data";
import { Concert } from "@/lib/types";

export function UserHome() {
  const [concerts, setConcerts] = useState<Concert[]>(userConcertsMock);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    window.setTimeout(() => setToastMessage(null), 2200);
  };

  const toggleReserve = (concertId: string) => {
    setConcerts((prev) =>
      prev.map((concert) => {
        if (concert.id !== concertId) return concert;

        const isReserved = Boolean(concert.isReservedByUser);
        return {
          ...concert,
          isReservedByUser: !isReserved,
          reservedSeats: isReserved ? concert.reservedSeats - 1 : concert.reservedSeats + 1
        };
      })
    );

    const target = concerts.find((item) => item.id === concertId);
    if (target?.isReservedByUser) {
      showToast("Cancel reserve successfully");
    } else {
      showToast("Reserve successfully");
    }
  };

  return (
    <section className="relative space-y-6">
      {toastMessage && <Toast message={toastMessage} />}

      {concerts.map((concert) => (
        <ConcertCard
          key={concert.id}
          concert={concert}
          actionLabel={concert.isReservedByUser ? "Cancel" : "Reserve"}
          actionTone={concert.isReservedByUser ? "danger" : "primary"}
          onAction={toggleReserve}
        />
      ))}
    </section>
  );
}
