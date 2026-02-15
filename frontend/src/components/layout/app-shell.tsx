import { ReactNode } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { NavItem } from "@/lib/types";

type AppShellProps = {
  pageTitle: string;
  roleTitle: string;
  navItems: NavItem[];
  activeHref: string;
  switchHref: string;
  switchLabel: string;
  children: ReactNode;
};

export function AppShell({
  pageTitle,
  roleTitle,
  navItems,
  activeHref,
  switchHref,
  switchLabel,
  children
}: AppShellProps) {
  return (
    <div className="min-h-screen bg-app-black p-2 sm:p-4 md:p-6">
      <div className="mx-auto max-w-[1400px]">
        <header className="h-12 sm:h-14">
          <h1 className="text-xl font-semibold text-white sm:text-2xl">{pageTitle}</h1>
        </header>

        <div className="grid min-h-[calc(100vh-96px)] grid-cols-1 bg-app-canvas shadow-panel md:grid-cols-[220px_1fr]">
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
    </div>
  );
}
