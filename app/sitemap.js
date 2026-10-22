export const dynamic = 'force-static';
import { getAllEvents } from '../lib/events';
const SITE_URL = 'https://ticket.jjyu.co.kr';
export default function sitemap() {
  const now = new Date();
  return [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: 'daily', priority: 1 },
    ...getAllEvents().map((e) => ({
      url: `${SITE_URL}/${e.slug}/`,
      lastModified: e.updatedAt ? new Date(e.updatedAt) : now,
      changeFrequency: 'daily',
      priority: 0.8,
    })),
  ];
}
