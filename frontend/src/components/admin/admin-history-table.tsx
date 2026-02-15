"use client";

import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/api-client";
import { queryKeys } from "@/lib/query-keys";
import { ApiReservationHistory, ReservationHistory } from "@/lib/types";

function formatDateTime(value: string): string {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;

  const date = parsed.toLocaleDateString("en-GB");
  const time = parsed.toLocaleTimeString("en-GB", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });

  return `${date} ${time}`;
}

export function AdminHistoryTable() {
  const historyQuery = useQuery({
    queryKey: queryKeys.adminHistory,
    queryFn: () =>
      apiRequest<ApiReservationHistory[]>({
        path: "/admin/reservations/history"
      }),
    staleTime: 10_000,
    select: (payload): ReservationHistory[] =>
      payload.map((item) => ({
        id: item.id,
        dateTime: formatDateTime(item.timestamp),
        username: item.username,
        concertName: item.concertName,
        action: item.action
      }))
  });

  const history = historyQuery.data ?? [];
  const errorMessage = historyQuery.error instanceof Error ? historyQuery.error.message : null;

  return (
    <section className="overflow-hidden rounded-lg border border-[#8A8A8A] bg-white">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse">
          <thead>
            <tr>
              <th className="history-head">Date time</th>
              <th className="history-head">Username</th>
              <th className="history-head">Concert name</th>
              <th className="history-head">Action</th>
            </tr>
          </thead>
          <tbody>
            {historyQuery.isLoading && (
              <tr>
                <td className="history-cell" colSpan={4}>
                  Loading history...
                </td>
              </tr>
            )}
            {!historyQuery.isLoading && errorMessage && (
              <tr>
                <td className="history-cell text-app-danger" colSpan={4}>
                  {errorMessage}
                </td>
              </tr>
            )}
            {!historyQuery.isLoading && !errorMessage && history.length === 0 && (
              <tr>
                <td className="history-cell" colSpan={4}>
                  No reservation history yet
                </td>
              </tr>
            )}
            {!historyQuery.isLoading &&
              !errorMessage &&
              history.map((record) => (
                <tr key={record.id}>
                  <td className="history-cell">{record.dateTime}</td>
                  <td className="history-cell">{record.username}</td>
                  <td className="history-cell">{record.concertName}</td>
                  <td className="history-cell">{record.action}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
