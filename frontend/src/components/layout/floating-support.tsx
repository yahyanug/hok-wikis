import Image from "next/image";
import Link from "next/link";

type FloatingSupportProps = {
  href: string;
};

export function FloatingSupport({ href }: FloatingSupportProps) {
  return (
    <div className="hok-floating-actions">
      <Link
        href="/support-us"
        className="hok-floating-support"
        aria-label="Support Us — dukung HOK Wiki"
      >
        <Image
          src="/images/support-us.png"
          alt="Support Us"
          width={150}
          height={150}
          sizes="(max-width: 640px) 76px, 150px"
          className="hok-floating-support__image"
          loading="eager"
        />
      </Link>
      <Link
        href="/feedback"
        className="hok-floating-support"
        aria-label="Help Us Improve — kirim masukan untuk HOK Wiki"
      >
        <Image
          src="/images/help-us-improve.png"
          alt="Help Us Improve"
          width={160}
          height={160}
          sizes="(max-width: 640px) 76px, 150px"
          className="hok-floating-support__image"
          loading="eager"
        />
      </Link>
    </div>
  );
}
