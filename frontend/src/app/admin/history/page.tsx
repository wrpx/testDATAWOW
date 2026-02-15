import { AdminHistoryTable } from "@/components/admin/admin-history-table";
import { AppShell } from "@/components/layout/app-shell";
import { NavItem } from "@/lib/types";

const navItems: NavItem[] = [
  { label: "Home", href: "/admin", icon: "⌂" },
  { label: "History", href: "/admin/history", icon: "◷" }
];

export default function AdminHistoryPage() {
  return (
    <AppShell
      pageTitle="Admin - History"
      roleTitle="Admin"
      navItems={navItems}
      activeHref="/admin/history"
      switchHref="/user"
      switchLabel="Switch to user"
    >
      <AdminHistoryTable />
    </AppShell>
  );
}
