import { AppShell } from "@/components/layout/app-shell";
import { UserHome } from "@/components/user/user-home";
import { NavItem } from "@/lib/types";

const navItems: NavItem[] = [];

export default function UserPage() {
  return (
    <AppShell
      pageTitle="User"
      roleTitle="User"
      navItems={navItems}
      activeHref="/user"
      switchHref="/admin"
      switchLabel="Switch to Admin"
    >
      <UserHome />
    </AppShell>
  );
}
