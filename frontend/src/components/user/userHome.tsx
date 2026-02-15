"use client";

import { ConcertCard } from "@/components/common/concertCard";
import { Toast } from "@/components/common/toast";
import { useUserConcertsData } from "@/hooks/user/useUserConcertsData";
import { useUserReservationActions } from "@/hooks/user/useUserReservationActions";
import { useTimedToast } from "@/hooks/useTimedToast";

export function UserHome() {
  const { toast, showToast } = useTimedToast(2200);
  const { concerts, isLoading, errorMessage } = useUserConcertsData();
  const { actionLoadingId, toggleReserve } = useUserReservationActions(showToast);

  return (
    <section className="relative space-y-6">
      {toast && <Toast message={toast.message} tone={toast.tone} />}

      {isLoading && <p className="text-lg text-app-text">Loading concerts...</p>}
      {!isLoading && errorMessage && <p className="text-lg text-app-danger">{errorMessage}</p>}

      {!isLoading &&
        !errorMessage &&
        concerts.map((concert) => (
          <ConcertCard
            key={concert.id}
            concert={concert}
            actionLabel={
              actionLoadingId === concert.id
                ? "Processing..."
                : concert.isReservedByUser
                  ? "Cancel"
                  : "Reserve"
            }
            actionTone={concert.isReservedByUser ? "danger" : "primary"}
            actionDisabled={actionLoadingId === concert.id}
            onAction={(concertId) => toggleReserve(concertId, concerts)}
          />
        ))}

      {!isLoading && !errorMessage && concerts.length === 0 && (
        <p className="text-lg text-app-text">No concerts available</p>
      )}
    </section>
  );
}
