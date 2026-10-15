import Image from "next/image";
import Link from "next/link";

import { FooterReleaseInfo } from "./app-footer-release-info";

export function AppFooter() {
  return (
    <footer className="hok-footer">
      <div className="hok-footer__inner">
        <div className="hok-footer__left flex-col! items-center! gap-2! text-center">
          <Link href="/dashboard" className="hok-footer__brand">
            <Image
              src="/images/hok-logo.png"
              alt=""
              width={44}
              height={44}
              className="hok-footer__logo size-11!"
            />
            <span>HOK WIKI</span>
          </Link>

          <p className="hok-footer__tagline text-center">
            <span>Sword Art Online x Flowborn - Inspired design style</span>
          </p>
        </div>

        <div className="hok-footer__right">
          <p className="hok-footer__info">
            <span>
              Not affiliated with or endorsed by Honor of Kings or TiMi Studio
              Group.
            </span>
            <br />
            <span>
              Some Artwork sourced from HOK Camp. • All Artwork assets belong to
              their respective owners.
            </span>
            <br />
            <span>© 2026 HOK Wiki • Independent Fan-Made Project 🩵</span>
          </p>
          <FooterReleaseInfo />
        </div>
      </div>
    </footer>
  );
}
