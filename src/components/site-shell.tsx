import React from "react";

/**
 * SiteShell is a transparent pass-through after the Dark Systems Glass
 * Editorial migration. The site-wide chrome (Nav, Cursor, Footer) now lives
 * in `src/app/layout.tsx`, so existing pages that still import `SiteShell`
 * keep working without rewrites.
 */
export function SiteShell({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
