"use client";

import { useAdminHistoryQuery } from "@/hooks/admin/useAdminHistoryQuery";

export function AdminHistoryTable() {
  const { history, isLoading, errorMessage } = useAdminHistoryQuery();

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
            {isLoading && (
              <tr>
                <td className="history-cell" colSpan={4}>
                  Loading history...
                </td>
              </tr>
            )}
            {!isLoading && errorMessage && (
              <tr>
                <td className="history-cell text-app-danger" colSpan={4}>
                  {errorMessage}
                </td>
              </tr>
            )}
            {!isLoading && !errorMessage && history.length === 0 && (
              <tr>
                <td className="history-cell" colSpan={4}>
                  No reservation history yet
                </td>
              </tr>
            )}
            {!isLoading &&
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
