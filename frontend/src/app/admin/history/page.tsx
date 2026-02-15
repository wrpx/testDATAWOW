import { AdminHistoryTable } from "@/components/admin/adminHistoryTable";
import { HistoryIcon, HomeIcon } from "@/components/common/icons";
import { AppShell } from "@/components/layout/appShell";
import { NavItem } from "@/lib/types";

const navItems: NavItem[] = [
  { label: "Home", href: "/admin", icon: <HomeIcon className="h-7 w-7" /> },
  { label: "History", href: "/admin/history", icon: <HistoryIcon className="h-7 w-7" /> }
];

export default function AdminHistoryPage() {
  return (
    <AppShell
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
