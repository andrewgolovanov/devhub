import type { ReactNode } from "react";

import {
  GTM_CONTAINER_ID,
  ONETRUST_DOMAIN_SCRIPT_ID,
  resolveOneTrustEnv,
} from "@/lib/onetrust";

const GTM_HEAD_SNIPPET =
  "(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':" +
  "new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0]," +
  "j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=" +
  "'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);" +
  `})(window,document,'script','dataLayer','${GTM_CONTAINER_ID}');`;

// On www.databricks.com a consent change takes effect on the next page load;
// this SPA has none, so reload when consent actually changes. The databricks
// onetrust.js defines OptanonWrapper (OneTrust's init + consent-change
// callback) and deletes opted-out cookies inside it, so chain it — never
// replace it — and let it run first. Reloading is safe in both directions:
// the post-reload OptanonWrapper init re-runs the cookie deletion. The
// OnetrustActiveGroups snapshot guard keeps SDK-internal re-fires (geo
// resolution, implied-consent recording) from reloading without a real
// user-driven change.
const CONSENT_CHANGE_SNIPPET =
  "(function(){" +
  "var previous=window.OptanonWrapper;" +
  "var initialGroups=null;" +
  "var registered=false;" +
  "window.OptanonWrapper=function(){" +
  "if(typeof previous==='function')previous();" +
  "if(initialGroups===null)initialGroups=window.OnetrustActiveGroups||'';" +
  "if(registered||!window.OneTrust||typeof window.OneTrust.OnConsentChanged!=='function')return;" +
  "registered=true;" +
  "window.OneTrust.OnConsentChanged(function(){" +
  "if((window.OnetrustActiveGroups||'')!==initialGroups)window.location.reload();" +
  "});" +
  "};" +
  "})();";

/**
 * OneTrust cookie consent + Google Tag Manager, copied from the
 * www.databricks.com install. Rendered as the first children of <body> as
 * plain blocking tags — not next/script — because the DOM order is the legal
 * contract: the OneTrust AutoBlocker must execute before the GTM snippet so
 * it can gate the cookies GTM drops, and the <noscript> iframe must sit
 * immediately after the opening <body> tag. The scripts stay in <body> in
 * source order; React hoists only the stylesheet <link> into <head>, where
 * the databricks.com install puts it too. Renders nothing when no consent
 * variant applies (local dev/build); GTM never loads without OneTrust.
 *
 * The consent-change script must come after onetrust.js (it chains that
 * script's OptanonWrapper) — see CONSENT_CHANGE_SNIPPET above.
 */
export function ConsentTags(): ReactNode {
  const variant = resolveOneTrustEnv();
  if (!variant) {
    return null;
  }

  const isTest = variant === "test";

  return (
    <>
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_CONTAINER_ID}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        />
      </noscript>
      <script
        type="text/javascript"
        src={`https://www.databricks.com/sites/default/files/${isTest ? "onetrust-test" : "onetrust"}/DB_OtAutoBlock.js?v=1`}
      />
      <script
        src="https://cdn.cookielaw.org/scripttemplates/otSDKStub.js"
        data-document-language="true"
        type="text/javascript"
        charSet="UTF-8"
        data-domain-script={
          isTest
            ? `${ONETRUST_DOMAIN_SCRIPT_ID}-test`
            : ONETRUST_DOMAIN_SCRIPT_ID
        }
      />
      <script
        type="text/javascript"
        src="https://www.databricks.com/wp-content/plugins/databricks/js/onetrust.js?ver=1.0.0"
        id="db-onetrust-script"
      />
      <script
        id="db-onetrust-consent-change"
        dangerouslySetInnerHTML={{ __html: CONSENT_CHANGE_SNIPPET }}
      />
      <link
        rel="stylesheet"
        id="db-onetrust-style"
        href="https://www.databricks.com/wp-content/uploads/db_onetrust.css"
        media="all"
      />
      <script
        id="db-gtm"
        dangerouslySetInnerHTML={{ __html: GTM_HEAD_SNIPPET }}
      />
    </>
  );
}
