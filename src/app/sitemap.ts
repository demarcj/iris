import type { MetadataRoute } from 'next';
import { get_all_properties } from '@/_server';

export default async function sitemap() {
  const base_url = `https://irispattayaproperties.com`;
  const propteiea = (await get_all_properties()).properties;
  const xml = propteiea.map(property => (
      {
        url: `${base_url}/properties/${property.id}`,
        lastModified: property?.updated_at,
        changeFrequency: 'monthly',
        priority: 0.7,
      }
    )
  )
  return [
    {
      url: `${base_url}/contact_us`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.7,
    },
    {
      url: `${base_url}/login`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.7,
    },
    {
      url: `${base_url}/message`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.7,
    },
    {
      url: `${base_url}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.7,
    },
    {
      url: `${base_url}/properties`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.7,
    },
    {
      url: `${base_url}/form`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.7,
    },
    ...xml
  ]
}