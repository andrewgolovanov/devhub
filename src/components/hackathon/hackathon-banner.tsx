import { getHackathonBannerConfig } from "@/lib/hackathon-banner-server";

export function HackathonBanner() {
  const banner = getHackathonBannerConfig();

  if (!banner) {
    return null;
  }

  return (
    <div
      aria-label="Hackathon announcement"
      className="devhub-hackathon-banner"
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
