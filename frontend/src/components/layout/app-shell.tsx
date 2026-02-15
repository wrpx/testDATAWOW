import { ReactNode } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { NavItem } from "@/lib/types";

type AppShellProps = {
  roleTitle: string;
  navItems: NavItem[];
  activeHref: string;
  switchHref: string;
  switchLabel: string;
  children: ReactNode;
};

export function AppShell({
  roleTitle,
  navItems,
  activeHref,
  switchHref,
  switchLabel,
  children
}: AppShellProps) {
  return (
    <div className="min-h-screen bg-app-black">
      <div className="grid min-h-screen grid-cols-1 bg-app-canvas shadow-panel md:grid-cols-[220px_1fr]">
        <Sidebar
          roleTitle={roleTitle}
          navItems={navItems}
          activeHref={activeHref}
          switchHref={switchHref}
          switchLabel={switchLabel}
        />

        <main className="p-4 sm:p-6 md:p-8">{children}</main>
      </div>
    </div>
  );
}
