"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import { ThemeToggle } from "./theme-toggle";

const mainItems = [
  // { label: "News", href: "/news" },
  { label: "Matchups", href: "/matchups" },
  { label: "Draft Simulator", href: "/draft-simulator" },
];

const resourceItems = [
  { label: "Heroes", href: "/heroes" },
  { label: "Items", href: "/items" },
  { label: "Spells", href: "/spells" },
  { label: "Arcana", href: "/arcana" },
];

const additionalItems = [{ label: "About", href: "/about" }];

export function AppHeader() {
  const pathname = usePathname();

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  const isResourceActive = resourceItems.some((item) => isActive(item.href));

  function renderLink(item: { label: string; href: string }) {
    const active = isActive(item.href);

    return (
      <NavigationMenuItem key={item.href}>
        <NavigationMenuLink
          asChild
          active={active}
          className="hok-header__link"
        >
          <Link href={item.href} aria-current={active ? "page" : undefined}>
            {item.label}
          </Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
    );
  }

  return (
    <header className="hok-header">
      <div className="hok-header__inner">
        <Link href="/dashboard" className="hok-header__brand">
          <span className="hok-header__logo-mark" aria-hidden="true">
            <Image
              src="/images/hok-logo.png"
              alt=""
              width={44}
              height={44}
              className="hok-header__logo"
            />
          </span>

          <span>HOK Wiki</span>
        </Link>

        <NavigationMenu
          viewport={false}
          className="hok-header__nav"
          aria-label="Navigasi utama"
        >
          <NavigationMenuList className="hok-header__list">
            {mainItems.map(renderLink)}

            <NavigationMenuItem className="hok-header__resource-item">
              <NavigationMenuTrigger
                className="hok-header__link hok-header__resource-trigger"
                data-active={isResourceActive ? "true" : undefined}
              >
                Game Resources
              </NavigationMenuTrigger>

              <NavigationMenuContent className="hok-header__resource-content">
                <ul
                  className="hok-header__resource-list"
                  aria-label="Game Resources"
                >
                  {resourceItems.map((item) => {
                    const active = isActive(item.href);

                    return (
                      <li key={item.href}>
                        <NavigationMenuLink
                          asChild
                          active={active}
                          className="hok-header__resource-link"
                        >
                          <Link
                            href={item.href}
                            aria-current={active ? "page" : undefined}
                          >
                            {item.label}
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    );
                  })}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {additionalItems.map(renderLink)}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="hok-header__actions">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
