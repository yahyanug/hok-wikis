"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Image from "next/image";
import { ThemeToggle } from "./theme-toggle";

const brand = {
  label: "HOK Wiki",
  href: "/dashboard",
};

const navigationItems = [
  { label: "Matchups", href: "/matchups" },
  { label: "Heroes", href: "/heroes" },
  { label: "Guides", href: "/guides" },
  { label: "News", href: "/news" },
  { label: "About", href: "/about" },
];

export function AppHeader() {
  const pathname = usePathname();

  return (
    <header className="hok-header">
      <div className="hok-header__inner">
        <Link href={brand.href} className="hok-header__brand">
          <Image
            src="/images/hok-logo.png"
            alt=""
            width={44}
            height={44}
            className="hok-header__logo"
          />
          <span>{brand.label}</span>
        </Link>

        <NavigationMenu
          viewport={false}
          className="hok-header__nav"
          aria-label="Navigasi utama"
        >
          <NavigationMenuList className="hok-header__list">
            {navigationItems.map((item) => {
              const isActive =
                pathname === item.href || pathname.startsWith(`${item.href}/`);

              return (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuLink
                    asChild
                    active={isActive}
                    className="hok-header__link"
                  >
                    <Link
                      href={item.href}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {item.label}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="hok-header__actions">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
