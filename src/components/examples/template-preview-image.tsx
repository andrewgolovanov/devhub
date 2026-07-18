import type { ReactNode } from "react";
import Image from "next/image";

/**
 * Preview image with a caller-provided fallback.
 *
 * Prefer the light asset and fall back to dark only when a light variant is
 * unavailable. Images are assumed to be 16:9, enforced by `pnpm verify:images`.
 */
export function TemplatePreviewImage({
  lightUrl,
  darkUrl,
  alt,
  fallback,
  className,
  loading,
  preload,
  sizes = "100vw",
}: {
  lightUrl?: string;
  darkUrl?: string;
  alt: string;
  fallback: ReactNode;
  className?: string;
  loading?: "eager" | "lazy";
  preload?: boolean;
  sizes?: string;
}) {
  const chosen = lightUrl ?? darkUrl;

  if (!chosen) {
    return <>{fallback}</>;
  }

  return (
    <Image
      src={chosen}
      alt={alt}
      className={
        className ?? "absolute inset-0 h-full w-full object-cover object-center"
      }
      fill
      loading={preload ? "eager" : loading}
      preload={preload}
      sizes={sizes}
      quality={100}
    />
  );
}
