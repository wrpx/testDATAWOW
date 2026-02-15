import { AppShell } from "@/components/layout/appShell";
import { UserHome } from "@/components/user/userHome";
import { NavItem } from "@/lib/types";

const navItems: NavItem[] = [];

export default function UserPage() {
  return (
    <AppShell
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
