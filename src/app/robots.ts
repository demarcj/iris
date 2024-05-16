import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const base_url = `https://irispattayaproperties.com`;
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${base_url}/sitemap.xml`,
    host: base_url
  }
}