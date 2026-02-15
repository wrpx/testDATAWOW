import { AdminHome } from "@/components/admin/admin-home";
import { HistoryIcon, HomeIcon } from "@/components/common/icons";
import { AppShell } from "@/components/layout/app-shell";
import { NavItem } from "@/lib/types";

const navItems: NavItem[] = [
  { label: "Home", href: "/admin", icon: <HomeIcon className="h-7 w-7" /> },
  { label: "History", href: "/admin/history", icon: <HistoryIcon className="h-7 w-7" /> }
];

export default function AdminPage() {
  return (
    <AppShell
      roleTitle="Admin"
      navItems={navItems}
      activeHref="/admin"
      switchHref="/user"
      switchLabel="Switch to user"
    >
      <AdminHome />
    </AppShell>
  );
}
