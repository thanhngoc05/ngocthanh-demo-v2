import Image from "next/image";
import Link from "next/link";

/**
 * NgocThanh brand logo.
 * Use horizontal variant for public header/footer/auth screens.
 * Use square icon variant for compact staff/sidebar spots.
 */
export function BrandLogo({
  href = "/",
  variant = "horizontal",
  className = "",
  priority = false,
  showText = false,
}) {
  const isIcon = variant === "icon";
  const width = isIcon ? 40 : 120;
  const height = 40;

  return (
    <Link href={href} className={`inline-flex items-center ${className}`}>
      <Image
        src={isIcon ? "/assets/brand/logo-icon.png" : "/assets/brand/logo-horizontal.png"}
        alt="NgocThanh"
        width={width}
        height={height}
        priority={priority}
        className={isIcon ? "rounded-xl" : ""}
      />
      {showText ? <span className="sr-only">NgocThanh</span> : null}
    </Link>
  );
}
