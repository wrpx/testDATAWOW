import Link from "next/link";
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
                  <span className="w-5 text-base leading-none">{item.icon}</span>
                  <span className="text-[1em]">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        <Link
          href={switchHref}
          className="mt-6 flex items-center gap-3 px-3 py-2.5 text-lg font-medium text-app-text hover:text-app-primary sm:text-xl"
        >
          <span className="w-5 text-base leading-none">↺</span>
          <span>{switchLabel}</span>
        </Link>
      </nav>

      <div className="p-4 md:p-6">
        <button
          type="button"
          className="flex items-center gap-3 text-lg font-medium text-app-text hover:text-app-danger sm:text-xl"
        >
          <span className="w-5 text-base leading-none">⇥</span>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
