import { getSiteBannerConfig } from "@/lib/site-banner-server";

export function SiteBanner() {
  const banner = getSiteBannerConfig();

  if (!banner) {
    return null;
  }

  return (
    <div
      aria-label="Site announcement"
      className="devhub-site-banner"
      data-banner-id={banner.id}
      style={{
        backgroundColor: banner.backgroundColor,
        color: banner.textColor,
      }}
    >
      <div dangerouslySetInnerHTML={{ __html: banner.content }} />
    </div>
  );
}
