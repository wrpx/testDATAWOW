"use client";

import { ConcertCard } from "@/components/common/concertCard";
import { Toast } from "@/components/common/toast";
import { useUserConcertsData } from "@/hooks/user/useUserConcertsData";
import { useUserReservationActions } from "@/hooks/user/useUserReservationActions";
import { useTimedToast } from "@/hooks/useTimedToast";

export function UserHome() {
  const { toast, showToast } = useTimedToast(2200);
  const { concerts, userHistory, isLoading, errorMessage } = useUserConcertsData();
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

      {!isLoading && !errorMessage && (
        <section className="overflow-hidden rounded-lg border border-[#8A8A8A] bg-white">
          <div className="border-b border-[#D7D7D7] px-5 py-3">
            <h3 className="text-2xl font-semibold text-app-text">My Reservation History</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse">
              <thead>
                <tr>
                  <th className="history-head">Date time</th>
                  <th className="history-head">Concert name</th>
                  <th className="history-head">Action</th>
                </tr>
              </thead>
              <tbody>
                {userHistory.length === 0 && (
                  <tr>
                    <td className="history-cell" colSpan={3}>
                      No reservation history yet
                    </td>
                  </tr>
                )}
                {userHistory.map((record) => (
                  <tr key={record.id}>
                    <td className="history-cell">{record.dateTime}</td>
                    <td className="history-cell">{record.concertName}</td>
                    <td className="history-cell">{record.action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </section>
  );
}
