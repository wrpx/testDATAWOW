import { AdminHome } from "@/components/admin/admin-home";
import { AppShell } from "@/components/layout/app-shell";
import { NavItem } from "@/lib/types";

const navItems: NavItem[] = [
  { label: "Home", href: "/admin", icon: "⌂" },
  { label: "History", href: "/admin/history", icon: "◷" }
];

export default function AdminPage() {
  return (
    <AppShell
      pageTitle="Admin - Home"
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
