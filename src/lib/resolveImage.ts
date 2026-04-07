// resolveImage.ts
// Ensures image URLs coming from the database are always absolute.
// Relative paths like /images/carrot.jpg only work on localhost (public/ folder),
// not on Vercel. This function converts those to a safe fallback.

const FALLBACK = 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800';

export function resolveImage(url?: string | null): string {
  if (!url) return FALLBACK;
  // If it's a relative path (starts with /) it won't work on Vercel
  if (url.startsWith('/')) return FALLBACK;
  // If it doesn't look like a valid URL, return fallback
  if (!url.startsWith('http')) return FALLBACK;
  return url;
}
