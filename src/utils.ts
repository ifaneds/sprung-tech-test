// Helper function to get image paths that work with Vite's base URL
// This ensures images load correctly both in development and production (GitHub Pages)
export function getImagePath(path: string): string {
  // Vite provides BASE_URL which includes the base path from vite.config.ts
  // Remove leading slash from the path and prepend BASE_URL
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${import.meta.env.BASE_URL}${cleanPath}`;
}

