import { adminHistoryMock } from "@/lib/mock-data";

export function AdminHistoryTable() {
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
            {adminHistoryMock.map((record) => (
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
