import Image from "next/image";

type FloatingSupportProps = {
  href: string;
};

export function FloatingSupport({ href }: FloatingSupportProps) {
  return (
    <a
      href={href}
      className="hok-floating-support"
      aria-label="Support Us — dukung HOK Wiki"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Image
        src="/images/support-us.png"
        alt="Support Us"
        width={150}
        height={150}
        sizes="(max-width: 640px) 76px, 110px"
        className="hok-floating-support__image"
      />
    </a>
  );
}
