"use client";

import { cn } from "@/lib/utils";
import {
  CalendarCheck2Icon,
  HomeIcon,
  LucideIcon,
  Settings2Icon,
  Users2Icon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavigationProps {
  id: number;
  name: string;
  href: string;
  icon: LucideIcon;
}

export const dashboardLinks: NavigationProps[] = [
  {
    id: 0,
    name: "Event Types",
    href: "/dashboard",
    icon: HomeIcon,
  },
  {
    id: 1,
    name: "Meetings",
    href: "/dashboard/meetings",
    icon: Users2Icon,
  },
  {
    id: 2,
    name: "Availablity",
    href: "/dashboard/availability",
    icon: CalendarCheck2Icon,
  },
  {
    id: 3,
    name: "Settings",
    href: "/dashboard/settings",
    icon: Settings2Icon,
  },
];

export const DashboardLinks = () => {
  const pathName = usePathname();

  return (
    <>
      {dashboardLinks.map((link) => (
        <Link
          key={link.id}
          href={link.href}
          className={cn(
            pathName === link.href
              ? "text-primary bg-primary/10"
              : "text-muted-foreground hover:text-foreground",
            "flex items-center gap-3 rounded-lg px-3 py-2 transition-all  hover:text-primary"
          )}
        >
          <link.icon className="size-5" />
          {link.name}
        </Link>
      ))}
    </>
  );
};
