import Image from "next/image";
import Link from "next/link";

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
            <span>
              © 2026 HOK Wiki <span aria-hidden="true">•</span> Sword Art Online
              x Flowborn inspired theme style
            </span>
          </p>
        </div>

        <p className="hok-footer__info">
          <span>Independent Fan-Made Project</span>
          <br />
          <span>
            Not affiliated with or endorsed by Honor of Kings or TiMi Studio
            Group.
          </span>
          <br />
          <span>
            Artwork is AI-generated or sourced from HOK Camp. • All Artwork
            assets belong to their respective owners.
          </span>
        </p>
      </div>
    </footer>
  );
}
