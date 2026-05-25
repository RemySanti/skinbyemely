/**
 * Navigation utilities to handle external links without triggering popup blockers
 */

/**
 * Opens an external URL in a new tab in a way that doesn't trigger popup blockers
 * This works by using window.open with the noopener flag immediately in response to user interaction
 */
export function openExternalLink(url: string): void {
  const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
  
  // Fallback if popup blocker still blocks it
  if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
    // If blocked, navigate in the same window
    window.location.href = url;
  }
}

/**
 * Creates an onClick handler for external links that bypasses popup blockers
 * Use this instead of <a href target="_blank"> to avoid popup blocker issues
 */
export function createExternalLinkHandler(url: string) {
  return (e: React.MouseEvent) => {
    e.preventDefault();
    openExternalLink(url);
  };
}
