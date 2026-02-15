import Link from "next/link";
import { LogoutIcon, SwitchIcon } from "@/components/common/icons";
import { NavItem } from "@/lib/types";

type SidebarProps = {
  roleTitle: string;
  navItems: NavItem[];
  activeHref: string;
  switchHref: string;
  switchLabel: string;
};

export function Sidebar({ roleTitle, navItems, activeHref, switchHref, switchLabel }: SidebarProps) {
  return (
    <aside className="flex h-full w-full flex-col border-b border-app-border bg-app-panel md:border-b-0 md:border-r">
      <div className="p-4 md:p-6">
        <h2 className="text-4xl font-bold tracking-tight text-black sm:text-5xl">{roleTitle}</h2>
      </div>

      <nav className="flex-1 px-3 pb-2 md:pb-0">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = item.href === activeHref;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-lg font-medium text-app-text sm:text-xl ${
                    isActive ? "bg-app-navActive" : "hover:bg-slate-100"
                  }`}
                >
                  <span className="flex h-7 w-7 items-center justify-center text-app-text">
                    {item.icon}
                  </span>
                  <span className="text-[1em]">{item.label}</span>
                </Link>
              </li>
            );
          })}
          <li>
            <Link
              href={switchHref}
              className="flex items-center gap-3 rounded-md px-3 py-2.5 text-lg font-medium text-app-text hover:bg-slate-100 hover:text-app-primary sm:text-xl"
            >
              <SwitchIcon className="h-7 w-7" />
              <span>{switchLabel}</span>
            </Link>
          </li>
        </ul>
      </nav>

      <div className="p-4 md:p-6">
        <Link
          href="/"
          className="flex items-center gap-3 text-lg font-medium text-app-text hover:text-app-danger sm:text-xl"
        >
          <LogoutIcon className="h-7 w-7" />
          <span>Logout</span>
        </Link>
      </div>
    </aside>
  );
}
