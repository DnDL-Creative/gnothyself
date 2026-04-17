/**
 * processShortcodes.ts
 * ────────────────────
 * Transforms VibeWriter shortcodes embedded in blog HTML content
 * into proper semantic HTML before html-react-parser renders them.
 *
 * Supported shortcodes:
 *   [[video:URL]]       (YouTube, Vimeo — or auto-detects social links)
 *   [[tweet:URL]]       (X/Twitter posts)
 *   [[instagram:URL]]   (Instagram posts/reels)
 *   [[tiktok:URL]]      (TikTok videos)
 *   [[image:URL|size=large|align=center|caption=text]]
 *   [[duo:URL1|URL2|caption=text]]
 *   [[trio:URL1|URL2|URL3|caption=text]]
 *   [[audio:URL]]
 */

/* ═══════════════════════════════════════════════════════════════════
   Helpers
   ═══════════════════════════════════════════════════════════════════ */

/** Extract a video embed URL from YouTube, Vimeo, or Cloudflare Stream links */
function getVideoEmbedUrl(url: string): string {
  if (url.includes("youtube.com") || url.includes("youtu.be")) {
    let videoId = "";
    if (url.includes("v=")) {
      videoId = url.split("v=")[1]?.split("&")[0] || "";
    } else if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1]?.split("?")[0] || "";
    } else if (url.includes("/embed/")) {
      return url;
    }
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  }
  if (url.includes("vimeo.com")) {
    const vimeoId = url.split("/").pop()?.split("?")[0] || "";
    return vimeoId ? `https://player.vimeo.com/video/${vimeoId}` : url;
  }
  // Cloudflare Stream — multiple URL formats:
  //   https://customer-XXXX.cloudflarestream.com/VIDEO_ID/iframe
  //   https://watch.cloudflarestream.com/VIDEO_ID
  //   https://iframe.videodelivery.net/VIDEO_ID
  if (url.includes("cloudflarestream.com") || url.includes("videodelivery.net")) {
    if (url.includes("/iframe") || url.includes("videodelivery.net")) {
      return url; // Already an embed-ready URL
    }
    // Extract video ID from watch or customer URLs
    const segments = url.split("/").filter(Boolean);
    const videoId = segments.find((s) => s.length === 32 || /^[a-f0-9]{32}$/.test(s)) || segments[segments.length - 1];
    return `https://iframe.videodelivery.net/${videoId}`;
  }
  // Bare Cloudflare Stream video ID (32-char hex)
  if (/^[a-f0-9]{32}$/i.test(url)) {
    return `https://iframe.videodelivery.net/${url}`;
  }
  return url;
}

/** Convert a Spotify URL to its embed variant */
function getSpotifyEmbedUrl(url: string): string {
  if (url.includes("/embed/")) return url;
  if (url.includes("open.spotify.com")) {
    return url.replace("open.spotify.com/", "open.spotify.com/embed/");
  }
  return url;
}

/** Parse pipe-separated params from a shortcode interior */
function parseParams(parts: string[]): Record<string, string> {
  const params: Record<string, string> = {};
  for (const part of parts) {
    const eq = part.indexOf("=");
    if (eq > 0) {
      params[part.slice(0, eq).trim()] = part.slice(eq + 1).trim();
    }
  }
  return params;
}

/* ═══════════════════════════════════════════════════════════════════
   Individual shortcode renderers
   ═══════════════════════════════════════════════════════════════════ */

function renderVideo(parts: string[]): string {
  const url = parts[0]?.trim();
  if (!url) return "";
  const params = parseParams(parts.slice(1));
  const size = params.size || "large";
  const align = params.align || "center";
  const embedUrl = getVideoEmbedUrl(url);
  const classes = `itg-media-video itg-size-${size} itg-align-${align}`;
  return `<div class="${classes}"><iframe src="${embedUrl}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen loading="lazy" title="Embedded video"></iframe></div>`;
}


function renderImage(parts: string[]): string {
  const url = parts[0]?.trim();
  if (!url) return "";

  // If the URL is a bare Cloudflare Stream video ID or Cloudflare URL, render as video instead
  if (/^[a-f0-9]{32}$/i.test(url) || url.includes("cloudflarestream.com") || url.includes("videodelivery.net")) {
    return renderVideo(parts);
  }
  const params = parseParams(parts.slice(1));
  const size = params.size || "large";
  const align = params.align || "center";
  const shape = params.shape || "";
  const caption = params.caption || "";

  const classes = [
    "itg-media-image",
    `itg-size-${size}`,
    `itg-align-${align}`,
    shape ? `itg-shape-${shape}` : "",
  ].filter(Boolean).join(" ");

  const captionHtml = caption
    ? `<figcaption>${caption}</figcaption>`
    : "";

  return `<figure class="${classes}"><img src="${url}" alt="${caption || "Blog image"}" loading="lazy" />${captionHtml}</figure>`;
}

function renderGallery(type: "duo" | "trio", parts: string[]): string {
  // Separate URLs from params
  const urls: string[] = [];
  const paramParts: string[] = [];
  for (const p of parts) {
    if (p.includes("=")) {
      paramParts.push(p);
    } else {
      urls.push(p.trim());
    }
  }
  const params = parseParams(paramParts);
  const caption = params.caption || "";

  const imgs = urls
    .filter(Boolean)
    .map((u) => `<img src="${u}" alt="${caption || "Gallery image"}" loading="lazy" />`)
    .join("\n");

  const captionHtml = caption
    ? `<figcaption>${caption}</figcaption>`
    : "";

  return `<figure class="itg-media-gallery itg-gallery-${type}">${imgs}${captionHtml}</figure>`;
}

function renderCarousel(parts: string[]): string {
  const urls: string[] = [];
  const paramParts: string[] = [];
  for (const p of parts) {
    if (p.includes("=")) {
      paramParts.push(p);
    } else {
      urls.push(p.trim());
    }
  }
  const params = parseParams(paramParts);
  const caption = params.caption || "";

  const slides = urls
    .filter(Boolean)
    .map((u, i) => `<div class="itg-carousel-slide${i === 0 ? " itg-slide-active" : ""}"><img src="${u}" alt="${caption || `Slide ${i + 1}`}" loading="lazy" /></div>`)
    .join("\n");

  const dots = urls
    .filter(Boolean)
    .map((_, i) => `<span class="itg-carousel-dot${i === 0 ? " itg-dot-active" : ""}"></span>`)
    .join("");

  const captionHtml = caption ? `<figcaption>${caption}</figcaption>` : "";

  return `<figure class="itg-media-carousel"><div class="itg-carousel-track">${slides}</div><div class="itg-carousel-controls"><button class="itg-carousel-prev" aria-label="Previous">‹</button><div class="itg-carousel-dots">${dots}</div><button class="itg-carousel-next" aria-label="Next">›</button></div>${captionHtml}</figure>`;
}

function renderAudio(parts: string[]): string {
  const url = parts[0]?.trim();
  if (!url) return "";
  const params = parseParams(parts.slice(1));
  const size = params.size || "large";
  const align = params.align || "center";
  const classes = `itg-media-audio itg-size-${size} itg-align-${align}`;

  if (url.includes("spotify.com")) {
    const embedUrl = getSpotifyEmbedUrl(url);
    return `<div class="${classes}"><iframe style="border-radius:12px" src="${embedUrl}" width="100%" height="152" frameBorder="0" allowfullscreen allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" title="Spotify embed"></iframe></div>`;
  }
  // Emit a hydration placeholder — AudioHydrator will mount TechnicolorPlayer here
  return `<div class="${classes}" data-audio-hydrate data-audio-src="${url}"></div>`;
}

/* ═══════════════════════════════════════════════════════════════════
   Social Embeds
   ═══════════════════════════════════════════════════════════════════ */

function renderTweet(url: string): string {
  const trimmed = url.trim();
  return `<div class="itg-embed-tweet"><blockquote class="twitter-tweet"><a href="${trimmed}"></a></blockquote></div>`;
}

function renderInstagram(url: string): string {
  const trimmed = url.trim();
  return `<div class="itg-embed-instagram"><blockquote class="instagram-media" data-instgrm-permalink="${trimmed}" data-instgrm-version="14"></blockquote></div>`;
}

function renderTikTok(url: string): string {
  const trimmed = url.trim();
  const videoId = trimmed.split("/video/")[1]?.split("?")[0] || "";
  return `<div class="itg-embed-tiktok"><blockquote class="tiktok-embed" cite="${trimmed}" data-video-id="${videoId}"><a href="${trimmed}"></a></blockquote></div>`;
}

/* ═══════════════════════════════════════════════════════════════════
   Main processor
   ═══════════════════════════════════════════════════════════════════ */

/**
 * Scans raw HTML content for `[[type:...]]` shortcodes and replaces
 * them with renderable HTML. Unknown shortcode types are left as-is.
 */
export function processShortcodes(html: string): string {
  if (!html) return html;

  // Pre-process: the Lexical editor wraps content in <p> tags which can split
  // long shortcodes across multiple paragraphs. First, strip any HTML tags that
  // ended up INSIDE shortcode brackets, then unwrap from surrounding <p> tags.

  // Step 1: find shortcode regions and strip inner HTML tags / newlines
  let processed = html.replace(
    /(\[\[\w+:)([\s\S]*?)(\]\])/g,
    (_m, open, body, close) => {
      const clean = body.replace(/<\/?[^>]+>/g, "").replace(/\n/g, "");
      return open + clean + close;
    }
  );

  // Step 2: unwrap shortcodes from surrounding <p> tags
  processed = processed.replace(/<p>\s*(\[\[\w+:.*?\]\])\s*<\/p>/gs, '$1');

  // Match [[type:content]] — non-greedy, supports multi-line
  let result = processed.replace(/\[\[(\w+):(.*?)\]\]/gs, (_match, type: string, body: string) => {
    const parts = body.split("|");

    switch (type.toLowerCase()) {
      case "video":
        return renderVideo(parts);
      case "image":
        return renderImage(parts);
      case "carousel":
        return renderCarousel(parts);
      case "duo":
        return renderGallery("duo", parts);
      case "trio":
        return renderGallery("trio", parts);
      case "audio":
        return renderAudio(parts);
      case "tweet":
        return renderTweet(parts[0]);
      case "instagram":
        return renderInstagram(parts[0]);
      case "tiktok":
        return renderTikTok(parts[0]);
      default:
        return _match; // Leave unknown shortcodes untouched
    }
  });

  // Auto-detect bare Spotify URLs and embed them
  result = result.replace(
    /<p>\s*(https:\/\/open\.spotify\.com\/[^\s<]+)\s*<\/p>/gi,
    (_m, url) => renderAudio([url])
  );

  return result;
}
